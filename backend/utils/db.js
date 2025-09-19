// DB connection utility (PostgreSQL or MongoDB)
const { Pool } = require('pg');
const mongoose = require('mongoose');

const pgPool = new Pool({
  connectionString: process.env.PG_URI || 'postgresql://user:pass@localhost:5432/steel',
});

function connectMongo() {
  return mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/steel');
}

module.exports = { pgPool, connectMongo };
