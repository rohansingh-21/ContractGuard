export default function ClauseList({ items }) {
  if (!items || items.length === 0) return null

  return (
    <div className="negotiate-list">
      <h3 className="section-header">Top Things to Negotiate</h3>
      <ol>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </div>
  )
}
