from fastapi import FastAPI, File, UploadFile, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import tensorflow as tf
import joblib
import numpy as np

import os
import uuid

from dotenv import load_dotenv
from supabase import create_client

from preprocessing import preprocess_image


# ==========================================================
# CONFIGURATION
# ==========================================================

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

os.makedirs(UPLOAD_DIR, exist_ok=True)


# ==========================================================
# SUPABASE
# ==========================================================

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError(
        "SUPABASE_URL and SUPABASE_KEY must be set in your .env file."
    )

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)

print("Connected to Supabase successfully.")


# ==========================================================
# REQUEST MODELS
# ==========================================================

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


# ==========================================================
# FASTAPI APPLICATION
# ==========================================================

app = FastAPI(
    title="Dyslexia Detection API",
    description="Handwriting-based dyslexia detection using CNN and SVM",
    version="2.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# LOAD TRAINED MODELS
# ==========================================================

print("Loading CNN feature extractor...")

feature_extractor_path = os.path.join(
    MODEL_DIR,
    "cnn_feature_extractor.keras"
)

feature_extractor = tf.keras.models.load_model(
    feature_extractor_path
)

print("CNN feature extractor loaded.")


print("Loading SVM model...")

svm_model_path = os.path.join(
    MODEL_DIR,
    "svm_model1.pkl"
)

svm_model = joblib.load(
    svm_model_path
)

print("SVM model loaded.")


# ==========================================================
# CLASS MAPPING
# ==========================================================

CLASS_NAMES = {
    0: "Normal",
    1: "Reversal",
    2: "Corrected"
}


# ==========================================================
# ROOT ENDPOINT
# ==========================================================

@app.get("/")
def home():
    return {
        "status": "online",
        "message": "DyslexiaLens - Dyslexia Detection API is running",
        "models": {
            "feature_extractor": "CNN-ResNet Bottleneck (128-D)",
            "classifier": "LinearSVC + StandardScaler"
        }
    }


# ==========================================================
# USER REGISTRATION
# ==========================================================

@app.post("/register")
def register(user: RegisterRequest):

    try:
        email = user.email.strip().lower()

        # Check whether user already exists
        existing = (
            supabase
            .table("users")
            .select("id")
            .eq("email", email)
            .execute()
        )

        if existing.data:
            return {
                "success": False,
                "error": "Email already registered. Please sign in."
            }

        # Create user in Supabase
        response = (
            supabase
            .table("users")
            .insert({
                "name": user.name.strip(),
                "email": email,
                "password": user.password
            })
            .execute()
        )

        if not response.data:
            return {
                "success": False,
                "error": "Registration failed."
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

        print("Registration error:", e)

        return {
            "success": False,
            "error": str(e)
        }


# ==========================================================
# USER LOGIN
# ==========================================================

@app.post("/login")
def login(user: LoginRequest):

    try:
        email = user.email.strip().lower()

        response = (
            supabase
            .table("users")
            .select("id, name, email, password")
            .eq("email", email)
            .execute()
        )

        if not response.data:
            return {
                "success": False,
                "error": "No account found with this email address."
            }

        found_user = response.data[0]

        if found_user["password"] != user.password:
            return {
                "success": False,
                "error": "Incorrect password. Please try again."
            }

        # Simple prototype token
        token = f"session_{uuid.uuid4()}"

        return {
            "success": True,
            "user": {
                "id": found_user["id"],
                "name": found_user["name"],
                "email": found_user["email"]
            },
            "token": token
        }

    except Exception as e:

        print("Login error:", e)

        return {
            "success": False,
            "error": str(e)
        }


# ==========================================================
# PREDICTION
# ==========================================================

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    user_id: int = Form(None)
):

    allowed_extensions = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    }

    extension = os.path.splitext(
        file.filename
    )[1].lower()

    if extension not in allowed_extensions:
        return {
            "success": False,
            "error": "Only JPG, JPEG, PNG and WebP images are allowed."
        }

    temporary_filename = (
        f"{uuid.uuid4()}{extension}"
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        temporary_filename
    )

    try:

        # --------------------------------------------------
        # Save uploaded image temporarily
        # --------------------------------------------------

        contents = await file.read()

        with open(file_path, "wb") as f:
            f.write(contents)


        # --------------------------------------------------
        # Preprocess
        # --------------------------------------------------

        image = preprocess_image(
            file_path
        )


        # --------------------------------------------------
        # CNN feature extraction
        # --------------------------------------------------

        features = feature_extractor.predict(
            image,
            verbose=0
        )


        # --------------------------------------------------
        # SVM prediction
        # --------------------------------------------------

        prediction = svm_model.predict(
            features
        )

        decision_scores = svm_model.decision_function(
            features
        )


        # --------------------------------------------------
        # Convert scores to probabilities
        # --------------------------------------------------

        scores = np.asarray(
            decision_scores[0],
            dtype=np.float64
        )

        exp_scores = np.exp(
            scores - np.max(scores)
        )

        probabilities = (
            exp_scores /
            exp_scores.sum()
        )


        normal_score = float(
            probabilities[0] * 100
        )

        reversal_score = float(
            probabilities[1] * 100
        )

        corrected_score = float(
            probabilities[2] * 100
        )


        predicted_class = int(
            prediction[0]
        )

        model_confidence = float(
            probabilities[predicted_class] * 100
        )

        class_name = CLASS_NAMES.get(
            predicted_class,
            "Unknown"
        )


        # --------------------------------------------------
        # Save prediction to Supabase
        # --------------------------------------------------

        insert_data = {
            "filename": file.filename,
            "prediction": predicted_class,
            "class_name": class_name
        }

        if user_id is not None:
            insert_data["user_id"] = user_id


        # IMPORTANT:
        # predictions.id is BIGINT in your existing
        # Supabase database, so we let Supabase generate it.
        #
        # confidence will be added to the database separately.
        #


        response = (
            supabase
            .table("predictions")
            .insert(insert_data)
            .execute()
        )


        # Get generated database ID
        database_id = None

        if response.data:
            database_id = response.data[0].get("id")


        # --------------------------------------------------
        # Return prediction to frontend
        # --------------------------------------------------

        return {
            "success": True,
            "id": database_id,
            "filename": file.filename,
            "prediction": predicted_class,
            "category": class_name,
            "class_name": class_name,
            "confidence": round(
                model_confidence,
                2
            ),
            "probabilities": {
                "Normal": round(
                    normal_score,
                    2
                ),
                "Reversal": round(
                    reversal_score,
                    2
                ),
                "Corrected": round(
                    corrected_score,
                    2
                )
            }
        }


    except Exception as e:

        print("Prediction error:", e)

        return {
            "success": False,
            "error": str(e)
        }


    finally:

        # Remove temporary uploaded image
        if os.path.exists(file_path):

            try:
                os.remove(file_path)

            except Exception:
                pass


# ==========================================================
# HISTORY
# ==========================================================

@app.get("/history")
def get_history(
    user_id: int = None
):

    try:

        if user_id is None:
            return {
                "success": True,
                "data": []
            }


        response = (
            supabase
            .table("predictions")
            .select("*")
            .eq("user_id", user_id)
            .order(
                "created_at",
                desc=True
            )
            .execute()
        )


        history = []


        for row in response.data:

            history.append({
                "id": row.get("id"),
                "date": row.get("created_at"),
                "file": row.get("filename"),
                "category": row.get("class_name"),
                "confidence": row.get(
                    "confidence",
                    0
                ),
                "status": "Completed"
            })


        return {
            "success": True,
            "data": history
        }


    except Exception as e:

        print("History error:", e)

        return {
            "success": False,
            "error": str(e),
            "data": []
        }


# ==========================================================
# OPTIONAL FRONTEND MOUNT
# ==========================================================

FRONTEND_DIR = os.path.abspath(
    os.path.join(
        BASE_DIR,
        "..",
        "frontend"
    )
)


if os.path.exists(FRONTEND_DIR):

    from fastapi.staticfiles import StaticFiles

    app.mount(
        "/app",
        StaticFiles(
            directory=FRONTEND_DIR,
            html=True
        ),
        name="frontend"
    )


# ==========================================================
# RUN SERVER
# ==========================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000
    )