import tensorflow as tf
import joblib
import numpy as np

from preprocessing import preprocess_image


# -----------------------------
# 1. Load CNN feature extractor
# -----------------------------
print("Loading CNN feature extractor...")

feature_extractor = tf.keras.models.load_model(
    "model/cnn_feature_extractor.keras"
)

print("CNN feature extractor loaded.")


# -----------------------------
# 2. Load SVM model
# -----------------------------
print("Loading SVM model...")

svm_model = joblib.load(
    "model/svm_model1.pkl"
)

print("SVM model loaded.")


# -----------------------------
# 3. Preprocess test image
# -----------------------------
print("Preprocessing image...")

image = preprocess_image(
    "uploads/test.jpeg"
)

print("Image shape:", image.shape)


# -----------------------------
# 4. Extract CNN features
# -----------------------------
print("Extracting CNN features...")

features = feature_extractor.predict(
    image,
    verbose=0
)

print("Feature shape:", features.shape)


# -----------------------------
# 5. SVM prediction
# -----------------------------
print("Running SVM prediction...")

prediction = svm_model.predict(features)

predicted_class = int(prediction[0])


# -----------------------------
# 6. Class mapping
# -----------------------------
class_names = {
    0: "Normal",
    1: "Reversal",
    2: "Corrected"
}

class_name = class_names.get(
    predicted_class,
    "Unknown"
)


# -----------------------------
# 7. Display result
# -----------------------------
print()
print("==============================")
print("       PREDICTION RESULT")
print("==============================")
print("Predicted class:", predicted_class)
print("Class name:", class_name)
print("==============================")