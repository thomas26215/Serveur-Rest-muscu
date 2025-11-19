import express from 'express';
import {
  getFeed,
  getFeedById,
  createFeed,
  updateFeed,
  deleteFeed
} from '../controllers/feedController.js';

const router = express.Router();

router.get('/', getFeed);
router.post('/', createFeed);

router.get('/:id', getFeedById);
router.put('/:id', updateFeed);
router.delete('/:id', deleteFeed);

export default router;

