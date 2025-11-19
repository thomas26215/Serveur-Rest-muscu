import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'statistics.json');

// Utilitaire pour lire les données
const readData = () => {
  if (!fs.existsSync(dataFile)) return [];
  const raw = fs.readFileSync(dataFile);
  return JSON.parse(raw);
};

// Utilitaire pour écrire les données
const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// GET /statistics
export const getStatistics = (req, res) => {
  const { userId } = req.query;
  let stats = readData();
  if (userId) stats = stats.filter(s => s.userId === userId);
  res.json(stats);
};

// GET /statistics/:userId
export const getStatisticsByUserId = (req, res) => {
  const { userId } = req.params;
  const stats = readData().find(s => s.userId === userId);
  if (!stats) return res.status(404).json({ message: 'Statistiques introuvables' });
  res.json(stats);
};

// POST /statistics
export const createStatistics = (req, res) => {
  const newStat = req.body;
  const stats = readData();
  stats.push(newStat);
  writeData(stats);
  res.status(201).json({ message: 'Statistique ajoutée' });
};

// PUT /statistics/:userId
export const updateStatistics = (req, res) => {
  const { userId } = req.params;
  const stats = readData();
  const index = stats.findIndex(s => s.userId === userId);
  if (index === -1) return res.status(404).json({ message: 'Statistiques introuvables' });
  stats[index] = { ...stats[index], ...req.body };
  writeData(stats);
  res.json({ message: 'Statistiques mises à jour' });
};

// DELETE /statistics/:userId
export const deleteStatistics = (req, res) => {
  const { userId } = req.params;
  let stats = readData();
  stats = stats.filter(s => s.userId !== userId);
  writeData(stats);
  res.status(204).send();
};

// GET /statistics/:userId/sessions
export const getSessionHistory = (req, res) => {
  const { userId } = req.params;
  const stats = readData().find(s => s.userId === userId);
  if (!stats) return res.status(404).json({ message: 'Statistiques introuvables' });
  res.json(stats.sessionHistory || []);
};

