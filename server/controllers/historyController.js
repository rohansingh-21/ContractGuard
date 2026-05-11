const { supabase } = require('../services/supabase')

const getHistory = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false })

    if (error) return res.status(500).json({ message: 'Could not fetch history' })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getHistory }
