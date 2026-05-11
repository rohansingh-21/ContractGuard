export default function HistoryTable({ data, onSelect }) {
  if (!data || data.length === 0) {
    return <p className="message">No documents analyzed yet.</p>
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Document</th>
            <th>Risk Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} onClick={() => onSelect(item)}>
              <td>{item.file_name}</td>
              <td>{item.risk_score}/10</td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
