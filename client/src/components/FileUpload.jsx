import { useRef, useState } from 'react'

export default function FileUpload({ onUpload, loading }) {
  const [file, setFile] = useState(null)
  const inputRef = useRef()

  const handleDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  const handleChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0])
  }

  const handleSubmit = () => {
    if (file) onUpload(file)
  }

  return (
    <div>
      <div
        className="upload-box"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
      >
        <p>Drag & drop a PDF or TXT file here, or click to browse</p>
        {file && <p className="file-name">{file.name}</p>}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.txt"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>
      <button className="btn" onClick={handleSubmit} disabled={!file || loading}>
        {loading ? 'Analyzing...' : 'Analyze Document'}
      </button>
    </div>
  )
}
