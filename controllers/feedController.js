import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'feed.json');
const readData = () => fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

export const getFeed = (req, res) => {
  let feed = readData();
  const { actorId, visibility } = req.query;
  if (actorId) feed = feed.filter(f => f.actorId === actorId);
  if (visibility) feed = feed.filter(f => f.visibility === visibility);
  res.json(feed);
};

export const createFeed = (req, res) => {
  const newFeed = req.body;
  const feed = readData();
  feed.push(newFeed);
  writeData(feed);
  res.status(201).json({ message: 'Activité publiée' });
};

export const getFeedById = (req, res) => {
  const item = readData().find(f => f.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Activité introuvable' });
  res.json(item);
};

export const updateFeed = (req, res) => {
  const feed = readData();
  const index = feed.findIndex(f => f.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Activité introuvable' });
  feed[index] = { ...feed[index], ...req.body };
  writeData(feed);
  res.json({ message: 'Activité mise à jour' });
};

export const deleteFeed = (req, res) => {
  let feed = readData();
  feed = feed.filter(f => f.id !== req.params.id);
  writeData(feed);
  res.status(204).send();
};

