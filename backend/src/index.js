import express from 'express';
import fs from 'fs/promises';

const path = "public/images/";
import {
  applyRateLimiting,
  applyLooseCORSPolicy,
  applyBodyParsing,
  applyLogging,
  applyErrorCatching
} from './api-middleware.js'

const VOTE_FILE = "vote.json";
const SECRET_FILE = "secret.json";

const app = express();
const port = 53706;

applyRateLimiting(app);
applyLooseCORSPolicy(app);
applyBodyParsing(app);
applyLogging(app);

app.get('/api/images', async (req, res) => {
  try {
    const files = await fs.readdir(path);

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

    const voteData = await fs.readFile(VOTE_FILE, 'utf-8');
    const votes = JSON.parse(voteData);

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
    const voteData = await fs.readFile(VOTE_FILE, 'utf-8');
    const votes = JSON.parse(voteData);

    votes[name] += 1;

    await fs.writeFile(VOTE_FILE, JSON.stringify(votes, null, 2));

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
