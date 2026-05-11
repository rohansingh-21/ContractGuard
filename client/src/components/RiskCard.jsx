export default function RiskCard({ color, title, items }) {
  if (!items || items.length === 0) return null

  return (
    <div>
      <h3 className="section-header">{title} ({items.length})</h3>
      {items.map((item, i) => (
        <div key={i} className={`risk-card ${color}`}>
          <p className="clause">"{item.clause}"</p>
          <p>{item.reason || item.note}</p>
          {item.severity && <p><strong>Severity: {item.severity}/10</strong></p>}
        </div>
      ))}
    </div>
  )
}
