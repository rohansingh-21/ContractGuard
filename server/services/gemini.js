const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Try multiple models as fallback
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite']

const callWithRetry = async (prompt, retries = 3) => {
  for (const modelName of MODELS) {
    for (let i = 0; i < retries; i++) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        const result = await model.generateContent(prompt)
        console.log(`Success with model: ${modelName}`)
        return result.response.text()
      } catch (err) {
        console.log(`Attempt ${i + 1} with ${modelName} failed: ${err.message}`)
        if (i < retries - 1) await new Promise(r => setTimeout(r, 2000))
      }
    }
  }
  throw new Error('All Gemini models failed after retries. Please try again later.')
}

const analyzeDocument = async (documentText) => {
  const prompt = `
You are a legal document risk analyzer.
Analyze the contract text below and return ONLY a JSON object.
No explanation, no markdown, just pure JSON.

Return this exact structure:
{
  "risk_score": <number 1-10>,
  "plain_english_summary": "<2-3 sentence summary of what this document is>",
  "red_flags": [
    {
      "clause": "<exact problematic text from document>",
      "reason": "<why this is dangerous in simple words>",
      "severity": <1-10>
    }
  ],
  "watch_out": [
    {
      "clause": "<text from document>",
      "reason": "<why to be careful>"
    }
  ],
  "safe_clauses": [
    {
      "clause": "<text>",
      "note": "<why this is fine>"
    }
  ],
  "top_3_negotiate": [
    "<thing 1 to negotiate>",
    "<thing 2 to negotiate>",
    "<thing 3 to negotiate>"
  ]
}

Document to analyze:
${documentText}
`

  const text = await callWithRetry(prompt)
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  return JSON.parse(cleaned)
}

const askAboutDocument = async (question, documentText) => {
  const prompt = `
You are a legal document assistant. A user uploaded a contract and has a follow-up question.
Answer in plain, simple English. Keep it under 200 words.

Document:
${documentText}

Question: ${question}
`

  return await callWithRetry(prompt)
}

module.exports = { analyzeDocument, askAboutDocument }
