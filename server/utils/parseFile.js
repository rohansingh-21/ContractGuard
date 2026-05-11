const fs = require('fs')
const path = require('path')
const pdfParse = require('pdf-parse')

const parseFile = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase()

  if (ext === '.txt') {
    return fs.readFileSync(filePath, 'utf-8')
  }

  if (ext === '.pdf') {
    const buffer = fs.readFileSync(filePath)
    const data = await pdfParse(buffer)
    return data.text
  }

  throw new Error('Unsupported file type. Only PDF and TXT allowed.')
}

module.exports = { parseFile }
