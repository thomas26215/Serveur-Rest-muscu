import express from 'express';
import {
  getStatistics,
  getStatisticsByUserId,
  createStatistics,
  updateStatistics,
  deleteStatistics,
  getSessionHistory
} from '../controllers/statsController.js';

const router = express.Router();

router.get('/', getStatistics);
router.post('/', createStatistics);

router.get('/:userId', getStatisticsByUserId);
router.put('/:userId', updateStatistics);
router.delete('/:userId', deleteStatistics);

router.get('/:userId/sessions', getSessionHistory);

export default router;


