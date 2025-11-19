import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserFriends,
  getCoachingStudents
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.get('/:id/friends', getUserFriends);
router.get('/:id/coaching-students', getCoachingStudents);

export default router;

