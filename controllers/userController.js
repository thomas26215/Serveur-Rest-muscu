import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'users.json');

const readData = () => fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

export const getUsers = (req, res) => {
  let users = readData();
  const { visibility } = req.query;
  if (visibility) users = users.filter(u => u.visibilityDefault === visibility);
  res.json(users);
};

export const createUser = (req, res) => {
  const newUser = req.body;
  const users = readData();
  users.push(newUser);
  writeData(users);
  res.status(201).json({ message: 'Utilisateur créé' });
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const user = readData().find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
  res.json(user);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const users = readData();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'Utilisateur introuvable' });
  users[index] = { ...users[index], ...req.body };
  writeData(users);
  res.json({ message: 'Utilisateur mis à jour' });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  let users = readData();
  users = users.filter(u => u.id !== id);
  writeData(users);
  res.status(204).send();
};

// Friends
export const getUserFriends = (req, res) => {
  const { id } = req.params;
  const user = readData().find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
  const friends = readData().filter(u => user.friends.includes(u.id));
  res.json(friends);
};

// Coaching students
export const getCoachingStudents = (req, res) => {
  const { id } = req.params;
  const users = readData();
  const students = users.filter(u => u.coachingStudents?.includes(id));
  res.json(students);
};

