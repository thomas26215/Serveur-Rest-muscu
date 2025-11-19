import express from 'express';
import {
  getGroupWorkouts,
  getGroupWorkoutById,
  createGroupWorkout,
  updateGroupWorkout,
  deleteGroupWorkout,
  getParticipants,
  joinGroupWorkout
} from '../controllers/groupWorkoutController.js';

const router = express.Router();

router.get('/', getGroupWorkouts);
router.post('/', createGroupWorkout);

router.get('/:id', getGroupWorkoutById);
router.put('/:id', updateGroupWorkout);
router.delete('/:id', deleteGroupWorkout);

router.get('/:id/participants', getParticipants);
router.post('/:id/join', joinGroupWorkout);

export default router;

