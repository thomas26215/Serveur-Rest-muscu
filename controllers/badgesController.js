import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'badges.json');
const readData = () => fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

export const getBadges = (req, res) => res.json(readData());

export const createBadge = (req, res) => {
  const newBadge = req.body;
  const badges = readData();
  badges.push(newBadge);
  writeData(badges);
  res.status(201).json({ message: 'Badge créé' });
};

export const getBadgeById = (req, res) => {
  const badge = readData().find(b => b.id === req.params.id);
  if (!badge) return res.status(404).json({ message: 'Badge introuvable' });
  res.json(badge);
};

export const updateBadge = (req, res) => {
  const badges = readData();
  const index = badges.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Badge introuvable' });
  badges[index] = { ...badges[index], ...req.body };
  writeData(badges);
  res.json({ message: 'Badge mis à jour' });
};

export const deleteBadge = (req, res) => {
  let badges = readData();
  badges = badges.filter(b => b.id !== req.params.id);
  writeData(badges);
  res.status(204).send();
};

export const assignBadge = (req, res) => {
  const badges = readData();
  const badge = badges.find(b => b.id === req.params.id);
  if (!badge) return res.status(404).json({ message: 'Badge introuvable' });

  const { userId } = req.body;
  badge.assignedUsers = badge.assignedUsers || [];
  badge.assignedUsers.push(userId);
  writeData(badges);
  res.json({ message: 'Badge attribué à l’utilisateur' });
};

