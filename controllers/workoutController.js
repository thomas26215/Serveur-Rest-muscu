import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'workouts.json');
const readData = () => fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

export const getWorkouts = (req, res) => {
  let workouts = readData();
  const { creatorId, difficulty, visibility } = req.query;
  if (creatorId) workouts = workouts.filter(w => w.creatorId === creatorId);
  if (difficulty) workouts = workouts.filter(w => w.difficulty === difficulty);
  if (visibility) workouts = workouts.filter(w => w.visibility === visibility);
  res.json(workouts);
};

export const createWorkout = (req, res) => {
  const newWorkout = req.body;
  const workouts = readData();
  workouts.push(newWorkout);
  writeData(workouts);
  res.status(201).json({ message: 'Séance créée' });
};

export const getWorkoutById = (req, res) => {
  const workout = readData().find(w => w.id === req.params.id);
  if (!workout) return res.status(404).json({ message: 'Séance introuvable' });
  res.json(workout);
};

export const updateWorkout = (req, res) => {
  const workouts = readData();
  const index = workouts.findIndex(w => w.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Séance introuvable' });
  workouts[index] = { ...workouts[index], ...req.body };
  writeData(workouts);
  res.json({ message: 'Séance mise à jour' });
};

export const deleteWorkout = (req, res) => {
  let workouts = readData();
  workouts = workouts.filter(w => w.id !== req.params.id);
  writeData(workouts);
  res.status(204).send();
};

