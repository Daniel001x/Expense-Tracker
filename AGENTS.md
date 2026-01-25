# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an Express.js backend application for expense tracking. The project uses ES6 modules (import/export syntax) and is in early development stages.

## Architecture

The codebase follows an MVC-style architecture with the following structure:

- **index.js**: Main entry point - Express server initialization and basic routing
- **src/controller/**: Controllers for handling request/response logic
- **src/models/**: Data models and schemas
- **src/routes/**: API route definitions
- **src/middleware/**: Custom middleware functions (authentication, validation, error handling)
- **src/db/**: Database connection and configuration
- **src/utils/**: Helper functions and utilities

## Development Commands

### Start Development Server
```powershell
npm start
```
This runs the server with Node.js watch mode (auto-restarts on file changes). The server listens on port 8000.

### Install Dependencies
```powershell
npm install
```

### Run Server Without Watch Mode
```powershell
node index.js
```

## Key Implementation Notes

### Module System
- The project uses **ES6 modules** (not CommonJS)
- Use `import` and `export` syntax, not `require()` and `module.exports`
- Ensure `package.json` includes `"type": "module"` or use `.mjs` extensions if needed

### Server Configuration
- Default port: 8000
- Express version: 5.2.1 (note: this is Express v5, which has breaking changes from v4)

### Development Environment
- Node.js v22.14.0
- Windows PowerShell environment
- Repository: https://github.com/Daniel001x/Expense-Tracker

## When Adding New Features

### Routes
1. Create route definitions in `src/routes/`
2. Import and mount routes in `index.js`
3. Follow RESTful conventions for expense-related endpoints

### Controllers
1. Place controller logic in `src/controllers/`
2. Keep controllers focused on request/response handling
3. Delegate business logic to models or utilities

### Database
1. Configure database connection in `src/db/`
2. Define models in `src/models/`
3. Consider using an ORM/ODM (e.g., Mongoose for MongoDB, Sequelize for SQL)

### Middleware
1. Create middleware in `src/middleware/`
2. Common middleware needs: authentication, validation, error handling, logging
3. Mount middleware appropriately (global in index.js or route-specific)
