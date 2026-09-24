const API_BASE = import.meta.env.VITE_API_URL || '/api';

const mockUser = {
  name: 'Dr. Elena Vance',
  email: 'e.vance@neuro-research.org',
  role: 'Researcher'
};

const mockHistory = [
  { id: 'REC-2024-001', date: '2026-09-22', file: 'sample_01.png', category: 'Reversal', confidence: 97.2, status: 'Completed' },
  { id: 'REC-2024-002', date: '2026-09-21', file: 'sample_02.png', category: 'Normal', confidence: 99.1, status: 'Completed' },
  { id: 'REC-2024-003', date: '2026-09-20', file: 'sample_03.png', category: 'Corrected', confidence: 91.5, status: 'Completed' },
  { id: 'REC-2024-004', date: '2026-09-19', file: 'sample_04.png', category: 'Normal', confidence: 98.4, status: 'Completed' },
  { id: 'REC-2024-005', date: '2026-09-18', file: 'sample_05.png', category: 'Reversal', confidence: 89.2, status: 'Completed' },
];

const mockPrediction = {
  id: 'REC-2024-001',
  category: 'Reversal',
  confidence: 97.2,
  probabilities: [
    { label: 'Reversal', value: 97.2 },
    { label: 'Corrected', value: 2.1 },
    { label: 'Normal', value: 0.7 },
  ],
  metrics: {
    ascenderRatio: 1.82,
    strokeVariation: '1.4 px',
    symmetryIndex: '88.4%',
  },
  filename: 'specimen_001.png'
};

function delay(ms = 300) {
  return new Promise(r => setTimeout(r, ms));
}

export function getAuthHeaders() {
  const token = localStorage.getItem('proto_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// POST /register
export async function register(data) {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      return await res.json();
    }
  } catch (err) {
    // Backend offline, fallback to mock
  }
  await delay(400);
  const user = { ...mockUser, email: data.email, name: data.name || mockUser.name };
  localStorage.setItem('proto_user', JSON.stringify(user));
  localStorage.setItem('proto_token', 'proto_jwt_' + Date.now());
  return { success: true, user, token: 'proto_jwt_' + Date.now() };
}

// POST /login
export async function login(credentials) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      return await res.json();
    }
  } catch (err) {
    // Backend offline, fallback to mock
  }
  await delay(300);
  const user = { ...mockUser, email: credentials.email || mockUser.email };
  localStorage.setItem('proto_user', JSON.stringify(user));
  localStorage.setItem('proto_token', 'proto_jwt_' + Date.now());
  return { success: true, user, token: 'proto_jwt_' + Date.now() };
}

// POST /predict (multipart/form-data)
export async function predict(file) {
  try {
    const formData = new FormData();
    if (file) formData.append('file', file);

    const res = await fetch(`${API_BASE}/predict`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      return await res.json();
    }
  } catch (err) {
    // Backend offline, fallback to mock
  }
  await delay(1200);
  return {
    success: true,
    result: {
      ...mockPrediction,
      id: 'REC-' + Math.floor(1000 + Math.random() * 9000),
      filename: file?.name || mockPrediction.filename
    }
  };
}

// GET /history
export async function getHistory() {
  try {
    const res = await fetch(`${API_BASE}/history`, {
      headers: getAuthHeaders(),
    });
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      return await res.json();
    }
  } catch (err) {
    // Backend offline, fallback to mock
  }
  await delay(150);
  return { success: true, data: mockHistory };
}

export { mockHistory, mockPrediction, mockUser };
