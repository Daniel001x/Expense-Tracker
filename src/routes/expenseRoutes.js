import express from 'express';
import ExpenseController from '../controllers/expenseController.js';

const router = express.Router();

// Get expense statistics (place before /:id to avoid conflicts)
router.get('/stats', ExpenseController.getStatistics);

// Get all expenses
router.get('/', ExpenseController.getAllExpenses);

// Get single expense by ID
router.get('/:id', ExpenseController.getExpenseById);

// Create new expense
router.post('/', ExpenseController.createExpense);

// Update expense
router.put('/:id', ExpenseController.updateExpense);

// Delete expense
router.delete('/:id', ExpenseController.deleteExpense);

export default router;
