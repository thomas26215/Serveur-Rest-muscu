import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'exercises.json');
const readData = () => fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

export const getExercises = (req, res) => {
  let exercises = readData();
  const { creatorId, muscleGroups, visibility } = req.query;
  if (creatorId) exercises = exercises.filter(e => e.creatorId === creatorId);
  if (muscleGroups) exercises = exercises.filter(e => e.muscleGroups?.includes(muscleGroups));
  if (visibility) exercises = exercises.filter(e => e.visibility === visibility);
  res.json(exercises);
};

export const createExercise = (req, res) => {
  const newEx = req.body;
  const exercises = readData();
  exercises.push(newEx);
  writeData(exercises);
  res.status(201).json({ message: 'Exercice créé' });
};

export const getExerciseById = (req, res) => {
  const ex = readData().find(e => e.id === req.params.id);
  if (!ex) return res.status(404).json({ message: 'Exercice introuvable' });
  res.json(ex);
};

export const updateExercise = (req, res) => {
  const exercises = readData();
  const index = exercises.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Exercice introuvable' });
  exercises[index] = { ...exercises[index], ...req.body };
  writeData(exercises);
  res.json({ message: 'Exercice mis à jour' });
};

export const deleteExercise = (req, res) => {
  let exercises = readData();
  exercises = exercises.filter(e => e.id !== req.params.id);
  writeData(exercises);
  res.status(204).send();
};

