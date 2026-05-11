const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { supabase } = require('../services/supabase')

const signup = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) return res.status(400).json({ message: 'Email already registered' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const { data: user, error } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword }])
      .select()
      .single()

    if (error) return res.status(500).json({ message: 'Could not create account' })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (!user) return res.status(400).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Wrong password' })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { signup, login }
