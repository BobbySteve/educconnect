const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const newsletterRoutes = require('./src/routes/newsletterRoutes'); // Import routes

const app = express();

const authRoutes = require('./src/routes/authRoutes'); // Import your auth routes

// app.use('/api/auth', authRoutes); // Mount the auth routes at /api/auth


// Middleware
app.use(cors());
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/newsletter', newsletterRoutes); // Mount routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
