// Main entry for backend API
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Modular routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/demand', require('./routes/demand'));
app.use('/api/rake', require('./routes/rake'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/route', require('./routes/route'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/iot', require('./routes/iot'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/sustainability', require('./routes/sustainability'));
app.use('/api/plant', require('./routes/plant'));
app.use('/api/maintenance', require('./routes/maintenance'));

app.get('/', (req, res) => {
  res.send('Steel Logistics Backend API Running');
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
