const { askAboutDocument } = require('../services/gemini')

const ask = async (req, res) => {
  try {
    const { question, documentText } = req.body
    if (!question || !documentText) {
      return res.status(400).json({ message: 'Question and document text required' })
    }
    const answer = await askAboutDocument(question, documentText)
    res.json({ answer })
  } catch (err) {
    res.status(500).json({ message: 'Could not get answer' })
  }
}

module.exports = { ask }
