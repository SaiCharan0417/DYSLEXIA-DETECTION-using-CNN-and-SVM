from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import joblib
import numpy as np
from PIL import Image
import os
import uuid

from dotenv import load_dotenv
from supabase import create_client

from preprocessing import preprocess_image



load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str

# --------------------------------
# Create FastAPI application
# --------------------------------

app = FastAPI(
    title="Dyslexia Detection API",
    description="Handwriting-based dyslexia detection using CNN and SVM",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------
# Load trained models
# --------------------------------

print("Loading CNN feature extractor...")

feature_extractor = tf.keras.models.load_model(
    "model/cnn_feature_extractor.keras"
)

print("CNN feature extractor loaded.")


print("Loading SVM model...")

svm_model = joblib.load(
    "model/svm_model1.pkl"
)

print("SVM model loaded.")


# --------------------------------
# Class mapping
# --------------------------------

CLASS_NAMES = {
    0: "Normal",
    1: "Reversal",
    2: "Corrected"
}


# --------------------------------
# Upload directory
# --------------------------------

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


# --------------------------------
# Root endpoint
# --------------------------------

@app.get("/")
def home():

    return {
        "message": "Dyslexia Detection API is running"
    }


# --------------------------------
# User Registration
# --------------------------------

@app.post("/register")
def register(user: RegisterRequest):

    try:
        # Check if email already exists
        existing = (
            supabase
            .table("users")
            .select("*")
            .eq("email", user.email)
            .execute()
        )

        if existing.data:
            return {
                "success": False,
                "error": "Email already registered"
            }

        # Create new user
        response = (
            supabase
            .table("users")
            .insert({
                "name": user.name,
                "email": user.email,
                "password": user.password
            })
            .execute()
        )

        if not response.data:
            return {
                "success": False,
                "error": "User registration failed"
            }

        created_user = response.data[0]

        return {
            "success": True,
            "user": {
                "id": created_user["id"],
                "name": created_user["name"],
                "email": created_user["email"]
            }
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }


# --------------------------------
# User Login
# --------------------------------

@app.post("/login")
def login(user: LoginRequest):

    try:
        response = (
            supabase
            .table("users")
            .select("*")
            .eq("email", user.email)
            .eq("password", user.password)
            .execute()
        )

        if not response.data:
            return {
                "success": False,
                "error": "Invalid email or password"
            }

        found_user = response.data[0]

        return {
            "success": True,
            "user": {
                "id": found_user["id"],
                "name": found_user["name"],
                "email": found_user["email"]
            }
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }

# --------------------------------
# Prediction endpoint
# --------------------------------

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    # Check file type
    allowed_extensions = {
        ".jpg",
        ".jpeg",
        ".png"
    }

    extension = os.path.splitext(
        file.filename
    )[1].lower()

    if extension not in allowed_extensions:

        return {
            "success": False,
            "error": "Only JPG, JPEG and PNG images are allowed."
        }


    # Create unique filename
    filename = f"{uuid.uuid4()}{extension}"

    file_path = os.path.join(
        UPLOAD_DIR,
        filename
    )


    # Save uploaded image
    contents = await file.read()

    with open(file_path, "wb") as f:
        f.write(contents)


    try:

        # -----------------------------
        # Preprocess image
        # -----------------------------

        image = preprocess_image(
            file_path
        )


        # -----------------------------
        # CNN feature extraction
        # -----------------------------

        features = feature_extractor.predict(
            image,
            verbose=0
        )


        # -----------------------------
        # SVM prediction
        # -----------------------------

        prediction = svm_model.predict(features)

        decision_scores = svm_model.decision_function(features)

        print("SVM prediction:", prediction)
        print("SVM decision scores:", decision_scores)

        # Convert SVM decision scores into relative score percentages
        scores = np.asarray(decision_scores[0], dtype=np.float64)

        exp_scores = np.exp(scores - np.max(scores))
        probabilities = exp_scores / exp_scores.sum()

        normal_score = float(probabilities[0] * 100)
        reversal_score = float(probabilities[1] * 100)
        corrected_score = float(probabilities[2] * 100)

        model_confidence = float(
            probabilities[int(prediction[0])] * 100
        )

        predicted_class = int(
            prediction[0]
        )


        class_name = CLASS_NAMES.get(
            predicted_class,
            "Unknown"
        )


        # -----------------------------
        # Return result
        # -----------------------------

        # Save prediction to Supabase
        supabase.table("predictions").insert({
            "filename": file.filename,
            "prediction": predicted_class,
            "class_name": class_name
        }).execute()

        return {
            "success": True,
            "filename": file.filename,
            "prediction": predicted_class,
            "class_name": class_name,
            "confidence": round(model_confidence, 2),
            "probabilities": {
        "Normal": round(normal_score, 2),
        "Reversal": round(reversal_score, 2),
        "Corrected": round(corrected_score, 2)
    }
}


    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }


    finally:

        # Delete temporary uploaded image
        if os.path.exists(file_path):

            os.remove(file_path)


@app.get("/history")
def get_history():
    try:
        response = (
            supabase
            .table("predictions")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        history = []

        for row in response.data:
            history.append({
                "id": row["id"],
                "date": row["created_at"],
                "file": row["filename"],
                "category": row["class_name"],
                "status": "Completed"
            })

        return {
            "success": True,
            "data": history
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }