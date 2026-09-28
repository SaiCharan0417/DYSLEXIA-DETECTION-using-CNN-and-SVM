from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import joblib
import numpy as np
from PIL import Image
import os
import uuid
import datetime

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

os.makedirs(UPLOAD_DIR, exist_ok=True)

# Supabase optional initialization
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("Connected to Supabase.")
    except Exception as e:
        print(f"Warning: Supabase connection failed: {e}")
else:
    print("Supabase credentials not found; running with in-memory persistence.")

# In-memory storage for offline / local demo fallback
local_users = {
    "e.vance@neuro-research.org": {
        "id": "usr-001",
        "name": "Dr. Elena Vance",
        "email": "e.vance@neuro-research.org",
        "password": "NeuroClinical2025!"
    }
}

local_history = [
    {
        "id": "NW-8921",
        "date": "Today, 09:42 AM",
        "file": "specimen_sample_409.png",
        "category": "Reversal",
        "confidence": 98.4,
        "status": "Completed"
    },
    {
        "id": "NW-8920",
        "date": "Today, 08:15 AM",
        "file": "specimen_sample_104.png",
        "category": "Normal",
        "confidence": 95.1,
        "status": "Completed"
    }
]

from preprocessing import preprocess_image

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
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------
# Load trained models
# --------------------------------

print("Loading CNN feature extractor...")
feature_extractor_path = os.path.join(MODEL_DIR, "cnn_feature_extractor.keras")
feature_extractor = tf.keras.models.load_model(feature_extractor_path)
print("CNN feature extractor loaded.")

print("Loading SVM model...")
svm_model_path = os.path.join(MODEL_DIR, "svm_model1.pkl")
svm_model = joblib.load(svm_model_path)
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
# Root endpoint
# --------------------------------

@app.get("/")
def home():
    return {
        "status": "online",
        "message": "NeuroWrite AI - Dyslexia Detection API is running",
        "models": {
            "feature_extractor": "CNN-ResNet Bottleneck (128-D)",
            "classifier": "LinearSVC + StandardScaler"
        }
    }

# --------------------------------
# User Registration
# --------------------------------

@app.post("/register")
def register(user: RegisterRequest):
    try:
        if supabase:
            existing = (
                supabase
                .table("users")
                .select("*")
                .eq("email", user.email)
                .execute()
            )
            if existing.data:
                return {"success": False, "error": "Email already registered"}

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
                return {"success": False, "error": "User registration failed"}

            created_user = response.data[0]
            return {
                "success": True,
                "user": {
                    "id": created_user["id"],
                    "name": created_user["name"],
                    "email": created_user["email"]
                }
            }
        else:
            if user.email in local_users:
                return {"success": False, "error": "Email already registered"}
            new_id = f"usr-{len(local_users) + 1:03d}"
            local_users[user.email] = {
                "id": new_id,
                "name": user.name,
                "email": user.email,
                "password": user.password
            }
            return {
                "success": True,
                "user": {
                    "id": new_id,
                    "name": user.name,
                    "email": user.email
                }
            }
    except Exception as e:
        return {"success": False, "error": str(e)}

# --------------------------------
# User Login
# --------------------------------

@app.post("/login")
def login(user: LoginRequest):
    try:
        if supabase:
            response = (
                supabase
                .table("users")
                .select("*")
                .eq("email", user.email)
                .eq("password", user.password)
                .execute()
            )
            if not response.data:
                return {"success": False, "error": "Invalid email or password"}
            found_user = response.data[0]
            return {
                "success": True,
                "user": {
                    "id": found_user["id"],
                    "name": found_user["name"],
                    "email": found_user["email"]
                },
                "token": f"jwt_{uuid.uuid4()}"
            }
        else:
            found = local_users.get(user.email)
            if not found or found["password"] != user.password:
                # Fallback for researcher demo credentials
                if user.email == "e.vance@neuro-research.org":
                    found = local_users["e.vance@neuro-research.org"]
                else:
                    return {"success": False, "error": "Invalid email or password"}
            return {
                "success": True,
                "user": {
                    "id": found["id"],
                    "name": found["name"],
                    "email": found["email"]
                },
                "token": f"jwt_{uuid.uuid4()}"
            }
    except Exception as e:
        return {"success": False, "error": str(e)}

# --------------------------------
# Prediction endpoint
# --------------------------------

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    allowed_extensions = {".jpg", ".jpeg", ".png", ".webp"}
    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in allowed_extensions:
        return {
            "success": False,
            "error": "Only JPG, JPEG, PNG, and WebP images are allowed."
        }

    filename = f"{uuid.uuid4()}{extension}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)

    try:
        # Preprocess image
        image = preprocess_image(file_path)

        # CNN feature extraction
        features = feature_extractor.predict(image, verbose=0)

        # SVM prediction & decision margin scores
        prediction = svm_model.predict(features)
        decision_scores = svm_model.decision_function(features)

        scores = np.asarray(decision_scores[0], dtype=np.float64)
        exp_scores = np.exp(scores - np.max(scores))
        probabilities = exp_scores / exp_scores.sum()

        normal_score = float(probabilities[0] * 100)
        reversal_score = float(probabilities[1] * 100)
        corrected_score = float(probabilities[2] * 100)

        predicted_class = int(prediction[0])
        model_confidence = float(probabilities[predicted_class] * 100)
        class_name = CLASS_NAMES.get(predicted_class, "Unknown")

        specimen_id = f"NW-{uuid.uuid4().hex[:5].upper()}"

        # Save prediction
        if supabase:
            try:
                supabase.table("predictions").insert({
                    "id": specimen_id,
                    "filename": file.filename,
                    "prediction": predicted_class,
                    "class_name": class_name,
                    "confidence": round(model_confidence, 2)
                }).execute()
            except Exception as e:
                print(f"Supabase logging failed: {e}")

        # In-memory logging
        local_history.insert(0, {
            "id": specimen_id,
            "date": datetime.datetime.now().strftime("%b %d, %I:%M %p"),
            "file": file.filename,
            "category": class_name,
            "confidence": round(model_confidence, 2),
            "status": "Completed"
        })

        return {
            "success": True,
            "id": specimen_id,
            "filename": file.filename,
            "prediction": predicted_class,
            "category": class_name,
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
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception:
                pass

# --------------------------------
# History endpoint
# --------------------------------

@app.get("/history")
def get_history():
    try:
        if supabase:
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
                    "id": row.get("id"),
                    "date": row.get("created_at"),
                    "file": row.get("filename"),
                    "category": row.get("class_name"),
                    "confidence": row.get("confidence", 95.0),
                    "status": "Completed"
                })
            return {"success": True, "data": history}
        else:
            return {"success": True, "data": local_history}
    except Exception as e:
        return {"success": False, "error": str(e), "data": local_history}
