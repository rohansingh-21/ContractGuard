import { useLocation, useNavigate } from 'react-router-dom'
import RiskScore from '../components/RiskScore.jsx'
import RiskCard from '../components/RiskCard.jsx'
import ClauseList from '../components/ClauseList.jsx'
import AskQuestion from '../components/AskQuestion.jsx'

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state || !state.analysis) {
    return (
      <div className="page">
        <p className="message">No analysis data. Please upload a document first.</p>
        <button className="btn" onClick={() => navigate('/')}>Go to Upload</button>
      </div>
    )
  }

  const { analysis, documentText } = state
  const { risk_score, plain_english_summary, red_flags, watch_out, safe_clauses, top_3_negotiate } = analysis

  return (
    <div className="page">
      <h1 style={{ marginBottom: 16 }}>Analysis Results</h1>

      <RiskScore score={risk_score} />

      <div className="summary-box">
        <strong>Summary:</strong> {plain_english_summary}
      </div>

      <RiskCard color="red" title="Red Flags - Dangerous" items={red_flags} />
      <RiskCard color="yellow" title="Watch Out - Be Careful" items={watch_out} />
      <RiskCard color="green" title="Safe Clauses" items={safe_clauses} />
      <ClauseList items={top_3_negotiate} />
      <AskQuestion documentText={documentText} />

      <div style={{ marginTop: 24 }}>
        <button className="btn-outline btn" onClick={() => navigate('/')}>Analyze Another</button>
      </div>
    </div>
  )
}
