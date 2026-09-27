from PIL import Image
import numpy as np



IMG_SIZE = (32, 32)


def preprocess_image(image_path):
    """
    Preprocess a handwriting image in the same way
    as the original CNN training pipeline.
    """

    # Open image and convert to grayscale
    im = Image.open(image_path).convert("L")

    # Convert to numpy array
    a = np.array(im)

    # Normalize background
    border = np.concatenate([
        a[0, :],
        a[-1, :],
        a[:, 0],
        a[:, -1]
    ])

    if border.mean() > 127:
        a = 255 - a

    # Find foreground pixels
    ys, xs = np.where(a > 10)

    # If no foreground is found
    if len(xs) == 0:
        raise ValueError("No handwriting/foreground detected in image.")

    # Crop to foreground
    x0, x1 = xs.min(), xs.max()
    y0, y1 = ys.min(), ys.max()

    cropped = a[y0:y1 + 1, x0:x1 + 1]

    # Pad to square
    h, w = cropped.shape
    size = max(h, w)

    square = np.zeros((size, size), dtype=np.uint8)

    y_offset = (size - h) // 2
    x_offset = (size - w) // 2

    square[
        y_offset:y_offset + h,
        x_offset:x_offset + w
    ] = cropped

    # Resize to 32 x 32
    resized = Image.fromarray(square).resize(
        IMG_SIZE,
        Image.Resampling.LANCZOS
    )

    # Convert to float32
    image_array = np.array(resized).astype(np.float32)

    # Normalize exactly like CNN training
    image_array = image_array / 255.0

    # Add channel dimension
    image_array = image_array.reshape(1, 32, 32, 1)

    return image_array


if __name__ == "__main__":
    image = preprocess_image("uploads/test.jpeg")

    print("Preprocessed shape:", image.shape)
    print("Data type:", image.dtype)
    print("Minimum:", image.min())
    print("Maximum:", image.max())