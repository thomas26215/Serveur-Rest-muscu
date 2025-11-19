import express from 'express';
import {
  getCoachings,
  getCoaching,
  createCoaching,
  updateCoaching,
  deleteCoaching
} from '../controllers/coachingController.js';

const router = express.Router();

router.get('/', getCoachings);
router.post('/', createCoaching);

router.get('/:coachId/:studentId', getCoaching);
router.put('/:coachId/:studentId', updateCoaching);
router.delete('/:coachId/:studentId', deleteCoaching);

export default router;

