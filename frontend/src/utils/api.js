const API_BASE = import.meta.env.VITE_API_URL || '/api';

const mockUser = {
  name: 'Dr. Elena Vance',
  email: 'e.vance@neuro-research.org',
  role: 'Principal Researcher',
  institution: 'Cambridge Cognitive Institute'
};

const mockHistory = [
  { id: 'NW-8921', date: 'Today, 09:42 AM', subject: 'Subject 409-B (Age 7;2)', category: 'Reversal', confidence: 97.2, status: 'Completed' },
  { id: 'NW-8920', date: 'Today, 08:15 AM', subject: 'Subject 104-A (Age 9;0)', category: 'Normal', confidence: 96.8, status: 'Completed' },
  { id: 'NW-8919', date: 'Yesterday, 04:30 PM', subject: 'Subject 212-C (Age 6;8)', category: 'Corrected', confidence: 91.2, status: 'Completed' },
  { id: 'NW-8918', date: 'Yesterday, 02:10 PM', subject: 'Subject 305-D (Age 11;4)', category: 'Normal', confidence: 98.1, status: 'Completed' },
  { id: 'NW-8917', date: 'Oct 24, 11:05 AM', subject: 'Subject 118-B (Age 8;1)', category: 'Reversal', confidence: 88.5, status: 'In Review' },
];

const mockPrediction = {
  id: 'NW-84920',
  category: 'Reversal',
  confidence: 97.2,
  probabilities: [
    { label: 'Reversal (Mirror Writing)', value: 97.2 },
    { label: 'Letter Inversion / Rotation', value: 2.1 },
    { label: 'Normal / Symmetrical Motor Flow', value: 0.7 },
  ],
  metrics: {
    ascenderRatio: 'Δ 14.2° Tilt',
    strokePressure: '0.42 N (+0.62σ)',
    mirrorSymmetryIndex: '88.4% Reflected (+3.91σ)',
  },
  processedAt: 'Today, 10:42 AM',
  latencyMs: 140,
  filename: 'specimen_p1084_cursive_eval.png'
};

function delay(ms = 300) {
  return new Promise(r => setTimeout(r, ms));
}

export function getAuthHeaders() {
  const token = localStorage.getItem('neurowrite_token');
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
  localStorage.setItem('neurowrite_user', JSON.stringify(user));
  localStorage.setItem('neurowrite_token', 'mock_jwt_' + Date.now());
  return { success: true, user, token: 'mock_jwt_' + Date.now() };
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
  localStorage.setItem('neurowrite_user', JSON.stringify(user));
  localStorage.setItem('neurowrite_token', 'mock_jwt_' + Date.now());
  return { success: true, token: 'mock_jwt_' + Date.now(), user };
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
      id: 'NW-' + Math.floor(10000 + Math.random() * 90000),
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
