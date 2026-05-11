const API = import.meta.env.VITE_API_URL

const getToken = () => localStorage.getItem('token')

export const signupUser = async (email, password) => {
  const res = await fetch(`${API}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

export const loginUser = async (email, password) => {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

export const analyzeDocument = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API}/api/analyze`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData
  })
  return res.json()
}

export const getHistory = async () => {
  const res = await fetch(`${API}/api/history`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  })
  return res.json()
}

export const askQuestion = async (question, documentText) => {
  const res = await fetch(`${API}/api/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ question, documentText })
  })
  return res.json()
}
