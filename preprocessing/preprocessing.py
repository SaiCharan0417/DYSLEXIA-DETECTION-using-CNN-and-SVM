"""Preprocessing pipeline for the Kaggle Dyslexia Handwriting Dataset.

Classes:
    0 = Normal
    1 = Reversal
    2 = Corrected

Pipeline follows the preprocessing described in the CNN-SVM paper:
foreground/background normalization -> crop foreground -> resize to 32x32.
Additionally, this script removes exact duplicate images, removes the small
set of images whose exact pixels occur under more than one class, balances
classes by deterministic undersampling, and creates a clean 70/15/15 split.

Run:
    python preprocessing.py "Dyslexia Handwriting Dataset — Kaggle(1).zip"

Output:
    dyslexia_preprocessed/train.npz
    dyslexia_preprocessed/val.npz
    dyslexia_preprocessed/test.npz
    dyslexia_preprocessed/dataset_report.json
"""

from __future__ import annotations
import collections, hashlib, io, json, os, random, sys, zipfile
from pathlib import Path
import numpy as np
from PIL import Image

CLASSES = ("Normal", "Reversal", "Corrected")
LABELS = {"Normal": 0, "Reversal": 1, "Corrected": 2}
SIZE = (32, 32)
SEED = 42


def preprocess_image(data: bytes, size=SIZE) -> np.ndarray:
    """Convert an image to black background/white handwriting, crop, resize."""
    image = Image.open(io.BytesIO(data)).convert("L")
    a = np.asarray(image, dtype=np.uint8)

    # Make the background black. The supplied dataset is already mostly in
    # this format, but this keeps the function robust for white backgrounds.
    border = np.concatenate((a[0], a[-1], a[:, 0], a[:, -1]))
    if float(border.mean()) > 127:
        a = 255 - a

    # Crop away empty borders while retaining antialiased handwriting pixels.
    mask = a > 10
    if mask.any():
        ys, xs = np.where(mask)
        a = a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]

    # Pad to a square before resizing so the character is not distorted.
    h, w = a.shape
    side = max(h, w)
    canvas = np.zeros((side, side), dtype=np.uint8)
    y0, x0 = (side - h) // 2, (side - w) // 2
    canvas[y0:y0 + h, x0:x0 + w] = a

    return np.asarray(
        Image.fromarray(canvas, mode="L").resize(size, Image.Resampling.LANCZOS),
        dtype=np.uint8,
    )


def discover_images(z: zipfile.ZipFile):
    """Return image paths grouped by exact pixel hash."""
    by_hash = collections.defaultdict(list)
    for name in z.namelist():
        if not name.lower().endswith((".png", ".jpg", ".jpeg")):
            continue
        parts = name.split("/")
        if len(parts) < 4 or parts[1] not in ("Train", "Test") or parts[2] not in CLASSES:
            continue
        digest = hashlib.md5(z.read(name)).hexdigest()
        by_hash[digest].append(name)
    return by_hash


def make_clean_selection(by_hash, seed=SEED):
    """Deduplicate, remove cross-class conflicts, then balance classes."""
    cross_class = {
        h for h, paths in by_hash.items()
        if len({p.split("/")[2] for p in paths}) > 1
    }

    canonical = {c: {} for c in CLASSES}
    for digest, paths in by_hash.items():
        if digest in cross_class:
            continue
        cls = paths[0].split("/")[2]
        canonical[cls][digest] = paths[0]

    counts = {c: len(canonical[c]) for c in CLASSES}
    target = min(counts.values())
    rng = random.Random(seed)
    selected = []
    for cls in CLASSES:
        hashes = list(canonical[cls])
        rng.shuffle(hashes)
        selected.extend((cls, digest, canonical[cls][digest]) for digest in hashes[:target])

    # Rebuild a clean stratified split. The source zip contains duplicate
    # pixels across its original Train/Test folders, so using those folders
    # directly can leak identical samples into evaluation.
    by_class = collections.defaultdict(list)
    for item in selected:
        by_class[item[0]].append(item)

    splits = {"train": [], "val": [], "test": []}
    for cls, items in by_class.items():
        rng.shuffle(items)
        n = len(items)
        n_train = round(n * 0.70)
        n_val = round(n * 0.15)
        splits["train"].extend(items[:n_train])
        splits["val"].extend(items[n_train:n_train + n_val])
        splits["test"].extend(items[n_train + n_val:])
    return splits, counts, len(cross_class)


def process_zip(zip_path: str, output_dir: str = "dyslexia_preprocessed"):
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    rng = random.Random(SEED)

    with zipfile.ZipFile(r"C:\Users\MEGHANA\Downloads\Dyslexia Handwriting Dataset — Kaggle.zip") as z:
        by_hash = discover_images(z)
        splits, unique_counts, cross_class_count = make_clean_selection(by_hash)

        report = {
            "source_png_files": sum(map(len, by_hash.values())),
            "unique_pixel_images": len(by_hash),
            "exact_duplicate_files_removed": sum(max(0, len(v) - 1) for v in by_hash.values()),
            "cross_class_duplicate_hashes_removed": cross_class_count,
            "unique_by_class_before_balance": unique_counts,
            "balanced_images_per_class": min(unique_counts.values()),
            "classes": LABELS,
            "image_size": list(SIZE),
            "split": {"train": 0.70, "validation": 0.15, "test": 0.15},
            "seed": SEED,
        }

        for split_name in ("train", "val", "test"):
            items = splits[split_name]
            X = np.empty((len(items), SIZE[1], SIZE[0]), dtype=np.uint8)
            y = np.empty(len(items), dtype=np.int8)
            for i, (cls, _digest, filename) in enumerate(items):
                X[i] = preprocess_image(z.read(filename))
                y[i] = LABELS[cls]
            np.savez_compressed(Path(output_dir) / f"{split_name}.npz", X=X, y=y)
            report[split_name] = {
                "images": len(items),
                "class_counts": {
                    cls: sum(1 for item in items if item[0] == cls) for cls in CLASSES
                },
            }
            print(f"Saved {split_name}: X={X.shape}, y={y.shape}")

    with open(Path(output_dir) / "dataset_report.json", "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    zip_file = sys.argv[1] if len(sys.argv) > 1 else "Dyslexia Handwriting Dataset — Kaggle(1).zip"
    process_zip(zip_file)
