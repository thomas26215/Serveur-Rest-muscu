import express from 'express';
import {
  getChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  getChallengeParticipants
} from '../controllers/challengeController.js';

const router = express.Router();

router.get('/', getChallenges);
router.post('/', createChallenge);

router.get('/:id', getChallengeById);
router.put('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);

router.get('/:id/participants', getChallengeParticipants);

export default router;

