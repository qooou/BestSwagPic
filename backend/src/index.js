import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  applyRateLimiting,
  applyLooseCORSPolicy,
  applyBodyParsing,
  applyLogging,
  applyErrorCatching
} from './api-middleware.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPath = path.join(__dirname, '..', 'public');
const imagesPath = path.join(publicPath, 'images');
const VOTE_FILE = path.join(publicPath, 'vote.json');
const SECRET_FILE = path.join(publicPath, 'secret.json');

const app = express();
const port = 53706;

applyRateLimiting(app);
applyLooseCORSPolicy(app);
applyBodyParsing(app);
applyLogging(app);

const voteData = await fs.readFile(VOTE_FILE, 'utf-8');
const votes = JSON.parse(voteData);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is working!',
    endpoints: [
      '/api/images',
      '/api/descriptions',
      '/api/vote'
    ]
  });
});

app.get('/api/images', async (req, res) => {
  try {
    const files = await fs.readdir(imagesPath);

    return res.status(200).send({
      files: files
    })
  } catch (e) {
    res.status(400);
    throw Error(e);
  }
});

app.get('/api/descriptions', async (req, res) => {
  try {

    const secretData = await fs.readFile(SECRET_FILE, 'utf-8');
    const secret = JSON.parse(secretData);

    return res.status(200).send(secret);

  } catch (e) {
    res.status(400);
    throw Error(e);
  }
});

app.get('/api/vote', async (req, res) => {
  try {
    return res.status(200).send(votes);
  } catch (e) {
    res.status(400);
    throw Error(e);
  }
});

app.post('/api/vote', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.stats(400).json({ error: "Name is required" });
  }

  try {
    votes[name] += 1;
    res.status(200).json(votes);
  } catch (e) {
    res.status(500);
    throw Error(e);
  }
});

app.listen(port, () => {
  console.log(`My API has been opened on localhost:${port}`);
});


applyErrorCatching(app);
