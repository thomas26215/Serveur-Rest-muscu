import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'groupWorkouts.json');
const readData = () => fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : [];
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

export const getGroupWorkouts = (req, res) => {
  let workouts = readData();
  const { hostId, workoutId, visibility } = req.query;
  if (hostId) workouts = workouts.filter(w => w.hostId === hostId);
  if (workoutId) workouts = workouts.filter(w => w.workoutId === workoutId);
  if (visibility) workouts = workouts.filter(w => w.visibility === visibility);
  res.json(workouts);
};

export const createGroupWorkout = (req, res) => {
  const newWorkout = req.body;
  const workouts = readData();
  workouts.push(newWorkout);
  writeData(workouts);
  res.status(201).json({ message: 'Séance de groupe créée' });
};

export const getGroupWorkoutById = (req, res) => {
  const workout = readData().find(w => w.id === req.params.id);
  if (!workout) return res.status(404).json({ message: 'Séance de groupe introuvable' });
  res.json(workout);
};

export const updateGroupWorkout = (req, res) => {
  const workouts = readData();
  const index = workouts.findIndex(w => w.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Séance de groupe introuvable' });
  workouts[index] = { ...workouts[index], ...req.body };
  writeData(workouts);
  res.json({ message: 'Séance de groupe mise à jour' });
};

export const deleteGroupWorkout = (req, res) => {
  let workouts = readData();
  workouts = workouts.filter(w => w.id !== req.params.id);
  writeData(workouts);
  res.status(204).send();
};

// Participants
export const getParticipants = (req, res) => {
  const workout = readData().find(w => w.id === req.params.id);
  if (!workout) return res.status(404).json({ message: 'Séance de groupe introuvable' });
  res.json(workout.participants || []);
};

export const joinGroupWorkout = (req, res) => {
  const workouts = readData();
  const workout = workouts.find(w => w.id === req.params.id);
  if (!workout) return res.status(404).json({ message: 'Séance de groupe introuvable' });
  workout.participants = workout.participants || [];
  workout.participants.push(req.body);
  writeData(workouts);
  res.json({ message: 'Participant ajouté à la séance' });
};

