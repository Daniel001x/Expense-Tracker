# MongoDB Atlas Setup Guide

## Steps to Connect MongoDB Cluster

### 1. Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Sign up for a free account

### 2. Create a Cluster
- Click "Build a Cluster" or "Create"
- Choose the FREE tier (M0 Sandbox)
- Select your preferred cloud provider and region
- Click "Create Cluster"

### 3. Create Database User
- Go to "Database Access" in the left sidebar
- Click "Add New Database User"
- Choose authentication method (Username and Password)
- Create a username and strong password
- Set user privileges to "Read and write to any database"
- Click "Add User"

### 4. Whitelist Your IP Address
- Go to "Network Access" in the left sidebar
- Click "Add IP Address"
- For development, you can click "Allow Access from Anywhere" (0.0.0.0/0)
- For production, add your specific IP address
- Click "Confirm"

### 5. Get Connection String
- Go to your cluster dashboard
- Click "Connect" button
- Choose "Connect your application"
- Select "Node.js" as driver and latest version
- Copy the connection string

### 6. Update .env File
Replace the `MONGODB_URI` in your `.env` file with your actual connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority
```

**Important:** Replace:
- `<username>` with your database username
- `<password>` with your database password
- `cluster0.xxxxx` with your actual cluster address
- `expense-tracker` is your database name (you can keep or change it)

### Example:
```env
MONGODB_URI=mongodb+srv://john:MySecurePass123@cluster0.abc123.mongodb.net/expense-tracker?retryWrites=true&w=majority
```

## Testing the Connection

Run your server:
```powershell
npm start
```

You should see:
```
Mongoose connected to MongoDB
MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
Database Name: expense-tracker
Server is running on port 8000
```

## Troubleshooting

### Connection Timeout
- Check if your IP is whitelisted in Network Access
- Verify your username and password are correct
- Ensure you're not behind a firewall blocking MongoDB ports

### Authentication Failed
- Double-check username and password
- Make sure you're using the database user (not your Atlas account password)
- Check if special characters in password are URL-encoded

### Database Not Created
- The database will be automatically created when you insert the first document
- Run a POST request to create an expense, and the database will appear in Atlas
