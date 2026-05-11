import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FileUpload from '../components/FileUpload.jsx'
import { analyzeDocument } from '../services/api'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleUpload = async (file) => {
    setLoading(true)
    setError('')
    try {
      const data = await analyzeDocument(file)
      if (data.message) {
        setError(data.message)
      } else {
        navigate('/results', { state: data })
      }
    } catch {
      setError('Upload failed. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="page">
      <h1 style={{ marginBottom: 8 }}>Analyze Your Document</h1>
      <p style={{ marginBottom: 24, color: '#666', fontSize: 14 }}>
        Upload a contract, T&C, or legal document to get instant AI risk analysis.
      </p>
      <FileUpload onUpload={handleUpload} loading={loading} />
      {error && <p style={{ color: '#f44336', marginTop: 12 }}>{error}</p>}
      {loading && <div className="loading">AI is analyzing your document...</div>}
    </div>
  )
}
