require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Hugging Face API token (stored in .env)
const hfToken = process.env.HF_API_KEY;

// Use Helsinki-NLP model for English-to-Spanish translation
const modelName = 'Helsinki-NLP/opus-mt-en-es';

// Translation endpoint
app.post('/translate', async (req, res) => {
  const { text } = req.body;

  // Validate input
  if (!text) {
    return res.status(400).json({ error: 'Missing required field: text' });
  }

  try {
    console.log('Translating:', text); // Debug log

    // Call Hugging Face API
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${modelName}`,
      { inputs: text }, // Helsinki-NLP expects 'inputs' as the text field
      {
        headers: {
          'Authorization': `Bearer ${hfToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract translated text
    const translatedText = response.data[0].translation_text;
    res.json({ translatedText });
  } catch (error) {
    // Detailed error handling
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      console.error('Server Error:', error.message);
      res.status(500).json({ error: 'Translation failed' });
    }
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});