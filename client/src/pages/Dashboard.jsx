import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HistoryTable from '../components/HistoryTable.jsx'
import { getHistory } from '../services/api'

export default function Dashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getHistory()
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [])

  const handleSelect = (item) => {
    navigate('/results', {
      state: {
        analysis: {
          risk_score: item.risk_score,
          plain_english_summary: item.summary,
          red_flags: item.red_flags,
          watch_out: item.watch_out,
          safe_clauses: item.safe_clauses,
          top_3_negotiate: []
        },
        documentText: ''
      }
    })
  }

  return (
    <div className="page">
      <h1 style={{ marginBottom: 16 }}>Your Document History</h1>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <HistoryTable data={data} onSelect={handleSelect} />
      )}
    </div>
  )
}
