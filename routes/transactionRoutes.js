import express from 'express';
import {
  getTransaction, addTransaction, deleteTransaction
} from '../controller/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/' , protect, getTransaction);
router.post('/add', protect , addTransaction);
router.delete('/:id',protect , deleteTransaction)

export default router;