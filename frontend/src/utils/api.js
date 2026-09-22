const API_BASE = '/api';

// ponytail: mock responses only. Replace fetch bodies when FastAPI is ready.

const mockUser = { name: 'Dr. Elena Vance', email: 'e.vance@neuro-research.org', role: 'Researcher' };

const mockHistory = [
  { id: 'NW-8921', date: 'Today, 09:42 AM', subject: 'Subject 409-B (Age 7;2)', category: 'Reversal', confidence: 92.4, status: 'Completed' },
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
    { label: 'Baseline Dysgraphia / Motor Tremor', value: 0.7 },
  ],
  metrics: {
    ascenderRatio: 1.82,
    strokeWidthVariation: '1.4 px',
    mirrorSymmetryIndex: '88.4%',
  },
  processedAt: 'Today, 10:42 AM',
  latencyMs: 240,
};

function delay(ms = 600) {
  return new Promise(r => setTimeout(r, ms));
}

export async function register(data) {
  await delay();
  // POST /register → mock
  return { success: true, user: { ...mockUser, email: data.email } };
}

export async function login(data) {
  await delay();
  // POST /login → mock
  return { success: true, token: 'mock-jwt-token', user: mockUser };
}

export async function predict(file) {
  await delay(2000);
  // POST /predict → mock
  return { success: true, result: mockPrediction };
}

export async function getHistory() {
  await delay();
  // GET /history → mock
  return { success: true, data: mockHistory };
}

export { mockHistory, mockPrediction };