const path = require('path');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

const isGitHubPagesOrigin = (origin) => /^https:\/\/[a-z0-9-]+\.github\.io$/i.test(origin);

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [FRONTEND_ORIGIN].filter(Boolean);
    if (process.env.NODE_ENV === 'development') {
      allowedOrigins.push(
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost',
        'http://127.0.0.1'
      );
    }

    if (!origin || allowedOrigins.includes(origin) || isGitHubPagesOrigin(origin)) {
      return callback(null, true);
    }

    callback(new Error('Origine non autorisée'));
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes. Réessayez dans une heure.' }
});

app.use(express.json({ limit: '1mb' }));
app.use('/api', cors(corsOptions), apiLimiter);

app.post('/api/chat', async (req, res) => {
  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Le champ "messages" doit être un tableau non vide.' });
  }

  const invalidMessage = messages.find(
    (message) =>
      !message ||
      typeof message !== 'object' ||
      !['system', 'user', 'assistant'].includes(message.role) ||
      typeof message.content !== 'string' ||
      message.content.trim().length === 0 ||
      message.content.length > 3000
  );

  if (invalidMessage) {
    return res.status(400).json({ error: 'Le tableau "messages" contient un message invalide.' });
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Clé API xAI non configurée sur le serveur.' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages,
        temperature: 0.3,
        max_tokens: 600
      })
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const errorMessage = data?.error?.message || data?.error || `Erreur externe ${response.status}`;
      return res.status(response.status).json({ error: errorMessage });
    }

    const answer =
      data?.output_text?.trim() ||
      data?.choices?.[0]?.text?.trim() ||
      data?.choices?.[0]?.message?.content?.trim() ||
      (Array.isArray(data?.output) ? data.output.join(' ').trim() : null);

    if (!answer) {
      return res.status(502).json({ error: 'Réponse invalide reçue du service xAI.' });
    }

    res.json({ answer });
  } catch (error) {
    console.error('Échec de l\'appel xAI :', error?.message || error);
    res.status(500).json({ error: 'Erreur interne du serveur. Veuillez réessayer plus tard.' });
  }
});

app.use(express.static(path.join(__dirname, '..')));

app.use((err, req, res, next) => {
  if (err.message === 'Origine non autorisée') {
    return res.status(403).json({ error: 'Origine non autorisée par CORS.' });
  }

  console.error('Middleware d\'erreur :', err);
  res.status(500).json({ error: 'Erreur interne du serveur.' });
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
