const fs = require('fs')
const { parseFile } = require('../utils/parseFile')
const { analyzeDocument: analyzeWithGemini } = require('../services/gemini')
const { supabase } = require('../services/supabase')

const analyzeDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    const text = await parseFile(req.file.path)
    const analysis = await analyzeWithGemini(text)

    // Save to Supabase
    await supabase.from('analyses').insert([{
      user_id: req.userId,
      file_name: req.file.originalname,
      risk_score: analysis.risk_score,
      red_flags: analysis.red_flags,
      watch_out: analysis.watch_out,
      safe_clauses: analysis.safe_clauses,
      summary: analysis.plain_english_summary
    }])

    // Clean up uploaded file
    fs.unlinkSync(req.file.path)

    res.json({ analysis, documentText: text })
  } catch (err) {
    console.error('Analyze error:', err)
    res.status(500).json({ message: 'Analysis failed: ' + err.message })
  }
}

module.exports = { analyzeDocument }
