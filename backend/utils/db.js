// DB connection utility (PostgreSQL or MongoDB)
const { Pool } = require('pg');
const mongoose = require('mongoose');

const pgPool = new Pool({
  connectionString: process.env.PG_URI || 'postgresql://user:pass@localhost:5432/steel',
});

function connectMongo() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/steel';
  const timeout = parseInt(process.env.MONGO_TIMEOUT_MS || '3000', 10);
  return mongoose.connect(uri, {
    serverSelectionTimeoutMS: timeout,
  });
}

module.exports = { pgPool, connectMongo };
