import Expense from './expenseSchema.js';

class ExpenseModel {
    // Get all expenses
    static async getAll(filters = {}, options = {}) {
        const { page = 1, limit = 10, sortBy = '-createdAt' } = options;
        const skip = (page - 1) * limit;

        const expenses = await Expense.find(filters)
            .sort(sortBy)
            .skip(skip)
            .limit(limit);
        
        const total = await Expense.countDocuments(filters);
        
        return { expenses, total, page, limit };
    }

    // Get all expenses without pagination
    static async getAllNoPagination(filters = {}) {
        return await Expense.find(filters).sort('-createdAt');
    }

    // Get expense by ID
    static async getById(id) {
        return await Expense.findById(id);
    }

    // Create new expense
    static async create(expenseData) {
        const expense = new Expense(expenseData);
        return await expense.save();
    }

    // Update expense
    static async update(id, updateData) {
        return await Expense.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
    }

    // Delete expense
    static async delete(id) {
        return await Expense.findByIdAndDelete(id);
    }

    // Get statistics
    static async getStatistics() {
        const totalData = await Expense.getTotalExpenses();
        const byCategory = await Expense.getExpensesByCategory();

        const byCategoryObj = {};
        byCategory.forEach(cat => {
            byCategoryObj[cat._id] = {
                total: cat.total,
                count: cat.count
            };
        });

        return {
            totalExpenses: totalData.total,
            expenseCount: totalData.count,
            byCategory: byCategoryObj,
            averageExpense: totalData.count > 0 ? totalData.total / totalData.count : 0
        };
    }

    // Search expenses
    static async search(searchTerm) {
        return await Expense.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        }).sort('-createdAt');
    }

    // Get expenses by date range
    static async getByDateRange(startDate, endDate) {
        return await Expense.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort('-date');
    }

    // Get expenses by category
    static async getByCategory(category) {
        return await Expense.find({ category }).sort('-createdAt');
    }
}

export default ExpenseModel;
