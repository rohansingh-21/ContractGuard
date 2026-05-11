# ContractGuard — AI Document Risk Analyzer

A full-stack web app where users upload contracts, T&Cs, job offers, or legal documents and get instant AI-powered risk analysis with color-coded flags, plain English summaries, risk scores, and a dashboard of past analyses.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **AI:** Google Gemini API
- **Database:** Supabase (PostgreSQL)
- **Auth:** Custom JWT + bcrypt
- **File Handling:** Multer + pdf-parse

## Setup

### 1. Server
```bash
cd server
npm install
# Edit .env with your API keys
npm run dev
```

### 2. Client
```bash
cd client
npm install
npm run dev
```

### 3. Supabase Tables

Create these two tables in your Supabase project:

**users:**
- id (uuid, primary key, auto)
- email (text, unique)
- password (text)
- created_at (timestamp, auto)

**analyses:**
- id (uuid, primary key, auto)
- user_id (uuid)
- file_name (text)
- risk_score (float8)
- red_flags (jsonb)
- watch_out (jsonb)
- safe_clauses (jsonb)
- summary (text)
- created_at (timestamp, auto)

## Features

- PDF and TXT file upload with text extraction
- AI-powered risk analysis with Gemini
- Red/Yellow/Green clause categorization
- Risk score (1-10)
- Document Q&A chat
- JWT authentication from scratch
- Personal analysis dashboard
