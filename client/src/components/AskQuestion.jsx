import { useState } from 'react'
import { askQuestion } from '../services/api'

export default function AskQuestion({ documentText }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim()) return
    setLoading(true)
    try {
      const data = await askQuestion(question, documentText)
      setAnswer(data.answer)
    } catch {
      setAnswer('Failed to get answer.')
    }
    setLoading(false)
  }

  return (
    <div style={{ marginTop: 24 }}>
      <h3 className="section-header">Ask a Question About This Document</h3>
      <div className="ask-box">
        <input
          type="text"
          placeholder="e.g. Can they terminate without notice?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button className="btn" onClick={handleAsk} disabled={loading}>
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </div>
      {answer && <div className="ask-answer">{answer}</div>}
    </div>
  )
}
