export default function RiskScore({ score }) {
  const level = score <= 3 ? 'low' : score <= 6 ? 'medium' : 'high'
  const label = score <= 3 ? 'Low Risk' : score <= 6 ? 'Medium Risk' : 'High Risk'

  return (
    <div className="risk-score-container">
      <div className={`risk-score-circle ${level}`}>{score}/10</div>
      <p style={{ marginTop: 8, fontWeight: 'bold' }}>{label}</p>
    </div>
  )
}
