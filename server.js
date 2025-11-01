require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(cors()); app.use(bodyParser.json({ limit: '1mb' }));
const OPENAI_KEY = process.env.OPENAI_KEY || process.env.OPENAI_API_KEY || '';
app.post('/vee-ai', async (req, res) => {
  try {
    const { message } = req.body;
    if(!message) return res.status(400).json({ error: 'no message' });
    const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: 'You are Vee Assistant, helpful in Arabic and English.' }, { role: 'user', content: message }],
      max_tokens: 800
    }, { headers: { Authorization: 'Bearer ' + OPENAI_KEY, 'Content-Type': 'application/json' } });
    const reply = resp.data.choices && resp.data.choices[0] && resp.data.choices[0].message ? resp.data.choices[0].message.content : 'لا توجد استجابة';
    res.json({ reply });
  } catch (err) { console.error(err && err.toString()); res.status(500).json({ error: 'AI request failed', detail: err && err.toString() }); }
});
const port = process.env.PORT || 3000; app.listen(port, ()=> console.log('Vee AI bridge listening on port '+port));
