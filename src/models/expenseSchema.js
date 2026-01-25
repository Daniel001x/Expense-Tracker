import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters']
        },
        amount: {
            type: Number,
            required: [true, 'Amount is required'],
            min: [0.01, 'Amount must be greater than 0']
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: ['Food', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Bills', 'Education', 'Other'],
                message: '{VALUE} is not a valid category'
            }
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
            default: ''
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Indexes for better query performance
expenseSchema.index({ category: 1 });
expenseSchema.index({ date: -1 });
expenseSchema.index({ createdAt: -1 });

// Virtual for formatted amount (with currency)
expenseSchema.virtual('formattedAmount').get(function() {
    return `$${this.amount.toFixed(2)}`;
});

// Instance method to format date
expenseSchema.methods.getFormattedDate = function() {
    return this.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Static method to get total expenses
expenseSchema.statics.getTotalExpenses = async function() {
    const result = await this.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: '$amount' },
                count: { $sum: 1 }
            }
        }
    ]);
    return result[0] || { total: 0, count: 0 };
};

// Static method to get expenses by category
expenseSchema.statics.getExpensesByCategory = async function() {
    return await this.aggregate([
        {
            $group: {
                _id: '$category',
                total: { $sum: '$amount' },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { total: -1 }
        }
    ]);
};

// Pre-save middleware
expenseSchema.pre('save', function(next) {
    // Ensure amount is rounded to 2 decimal places
    if (this.amount) {
        this.amount = Math.round(this.amount * 100) / 100;
    }
    next();
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
