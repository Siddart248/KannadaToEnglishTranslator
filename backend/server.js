const express = require('express');
const cors = require('cors');
const translate = require('google-translate-api-x');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/translate', async (req, res) => {
  try {
    const { text, from = 'kn', to = 'en' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required for translation' });
    }

    const response = await translate(text, { from, to });
    
    res.json({
      original: text,
      translated: response.text,
      from: response.from.language.iso
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
