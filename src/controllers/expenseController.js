import ExpenseModel from '../models/expenseModel.js';
import ApiResponse from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/errorHandler.js';

class ExpenseController {
    // Get all expenses
    static getAllExpenses = asyncHandler(async (req, res) => {
        const expenses = await ExpenseModel.getAllNoPagination();
        return ApiResponse.success(res, { expenses, count: expenses.length }, 'Expenses fetched successfully');
    });

    // Get single expense by ID
    static getExpenseById = asyncHandler(async (req, res) => {
        const expense = ExpenseModel.getById(req.params.id);
        
        if (!expense) {
            return ApiResponse.notFound(res, 'Expense not found');
        }

        return ApiResponse.success(res, expense, 'Expense fetched successfully');
    });

    // Create new expense
    static createExpense = asyncHandler(async (req, res) => {
        const { title, amount, category, description, date } = req.body;

        // Validation
        if (!title || !amount || !category) {
            return ApiResponse.badRequest(res, 'Please provide title, amount, and category');
        }

        if (amount <= 0) {
            return ApiResponse.badRequest(res, 'Amount must be greater than 0');
        }

        const newExpense = ExpenseModel.create({ title, amount, category, description, date });
        return ApiResponse.created(res, newExpense, 'Expense created successfully');
    });

    // Update expense
    static updateExpense = asyncHandler(async (req, res) => {
        const { title, amount, category, description, date } = req.body;

        // Validate amount if provided
        if (amount && amount <= 0) {
            return ApiResponse.badRequest(res, 'Amount must be greater than 0');
        }

        const updatedExpense = ExpenseModel.update(req.params.id, { title, amount, category, description, date });

        if (!updatedExpense) {
            return ApiResponse.notFound(res, 'Expense not found');
        }

        return ApiResponse.success(res, updatedExpense, 'Expense updated successfully');
    });

    // Delete expense
    static deleteExpense = asyncHandler(async (req, res) => {
        const deletedExpense = ExpenseModel.delete(req.params.id);

        if (!deletedExpense) {
            return ApiResponse.notFound(res, 'Expense not found');
        }

        return ApiResponse.success(res, deletedExpense, 'Expense deleted successfully');
    });

    // Get expense statistics
    static getStatistics = asyncHandler(async (req, res) => {
        const stats = ExpenseModel.getStatistics();
        return ApiResponse.success(res, stats, 'Statistics fetched successfully');
    });
}

export default ExpenseController;
