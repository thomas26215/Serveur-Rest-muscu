import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'coaching.json');
const readData = () => fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

export const getCoachings = (req, res) => {
  let coachings = readData();
  const { coachId, studentId } = req.query;
  if (coachId) coachings = coachings.filter(c => c.coachId === coachId);
  if (studentId) coachings = coachings.filter(c => c.studentId === studentId);
  res.json(coachings);
};

export const createCoaching = (req, res) => {
  const newCoaching = req.body;
  const coachings = readData();
  coachings.push(newCoaching);
  writeData(coachings);
  res.status(201).json({ message: 'Coaching créé' });
};

export const getCoaching = (req, res) => {
  const { coachId, studentId } = req.params;
  const coaching = readData().find(c => c.coachId === coachId && c.studentId === studentId);
  if (!coaching) return res.status(404).json({ message: 'Coaching introuvable' });
  res.json(coaching);
};

export const updateCoaching = (req, res) => {
  const { coachId, studentId } = req.params;
  const coachings = readData();
  const index = coachings.findIndex(c => c.coachId === coachId && c.studentId === studentId);
  if (index === -1) return res.status(404).json({ message: 'Coaching introuvable' });
  coachings[index] = { ...coachings[index], ...req.body };
  writeData(coachings);
  res.json({ message: 'Coaching mis à jour' });
};

export const deleteCoaching = (req, res) => {
  const { coachId, studentId } = req.params;
  let coachings = readData();
  coachings = coachings.filter(c => !(c.coachId === coachId && c.studentId === studentId));
  writeData(coachings);
  res.status(204).send();
};

