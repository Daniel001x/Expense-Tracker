import express from "express";
import dotenv from "dotenv";
import expenseRoutes from './src/routes/expenseRoutes.js';
import { errorHandler, notFound } from './src/utils/errorHandler.js';
import connectDB from './src/db/connection.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
    res.json({
        message: "Expense Tracker API",
        version: "1.0.0",
        endpoints: {
            "GET /expenses": "Get all expenses",
            "GET /expenses/stats": "Get expense statistics",
            "GET /expenses/:id": "Get expense by ID",
            "POST /expenses": "Create new expense",
            "PUT /expenses/:id": "Update expense",
            "DELETE /expenses/:id": "Delete expense"
        }
    });
});

// Routes
app.use('/expenses', expenseRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
