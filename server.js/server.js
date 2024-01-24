const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const url = "mongodb://localhost:27017/allan";
// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() =>
 
console.log('MongoDB connected'))
  .catch(err =>
 
console.error(err));

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const eventsRoutes = require('./routes/events');
const usersRoutes = require('./routes/users');
app.use('/events', eventsRoutes);
app.use('/users', usersRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});