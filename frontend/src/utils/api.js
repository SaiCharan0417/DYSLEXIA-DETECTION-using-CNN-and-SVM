const API_BASE =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export function getAuthHeaders() {
  const token = localStorage.getItem("neurowrite_token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

// Login
export async function login(credentials) {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail || data?.error || "Login failed");
  }

  return data;
}

// Register
export async function register(userData) {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail || data?.error || "Registration failed");
  }

  return data;
}

// Prediction
export async function predict(file) {
  if (!file) {
    throw new Error("No image file selected");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail || data?.error || "Prediction failed");
  }

  return data;
}

// History
export async function getHistory() {
  const response = await fetch(`${API_BASE}/history`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail || data?.error || "Failed to load history");
  }

  return data;
}