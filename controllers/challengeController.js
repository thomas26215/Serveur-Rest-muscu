import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'challenges.json');
const readData = () => fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

export const getChallenges = (req, res) => {
  let challenges = readData();
  const { creatorId, startDate, endDate } = req.query;
  if (creatorId) challenges = challenges.filter(c => c.creatorId === creatorId);
  if (startDate) challenges = challenges.filter(c => c.startDate === startDate);
  if (endDate) challenges = challenges.filter(c => c.endDate === endDate);
  res.json(challenges);
};

export const createChallenge = (req, res) => {
  const newChallenge = req.body;
  const challenges = readData();
  challenges.push(newChallenge);
  writeData(challenges);
  res.status(201).json({ message: 'Défi créé' });
};

export const getChallengeById = (req, res) => {
  const challenge = readData().find(c => c.id === req.params.id);
  if (!challenge) return res.status(404).json({ message: 'Défi introuvable' });
  res.json(challenge);
};

export const updateChallenge = (req, res) => {
  const challenges = readData();
  const index = challenges.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Défi introuvable' });
  challenges[index] = { ...challenges[index], ...req.body };
  writeData(challenges);
  res.json({ message: 'Défi mis à jour' });
};

export const deleteChallenge = (req, res) => {
  let challenges = readData();
  challenges = challenges.filter(c => c.id !== req.params.id);
  writeData(challenges);
  res.status(204).send();
};

// Participants
export const getChallengeParticipants = (req, res) => {
  const challenge = readData().find(c => c.id === req.params.id);
  if (!challenge) return res.status(404).json({ message: 'Défi introuvable' });
  res.json(challenge.participants || []);
};

