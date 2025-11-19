import express from 'express';
import {
  getBadges,
  getBadgeById,
  createBadge,
  updateBadge,
  deleteBadge,
  assignBadge
} from '../controllers/badgesController.js';

const router = express.Router();

router.get('/', getBadges);
router.post('/', createBadge);

router.get('/:id', getBadgeById);
router.put('/:id', updateBadge);
router.delete('/:id', deleteBadge);

router.post('/:id/assign', assignBadge);

export default router;

