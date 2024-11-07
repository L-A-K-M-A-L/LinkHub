require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const { registerUser, loginUser } = require('./controllers/auth');
const { dashBoardData } = require('./controllers/dashboard');
const { getUserData, getUserSocials } = require('./controllers/getUserdata');

mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the routes
app.get('/', (req, res) => {
  res.send(`Server running on port ${port}`);
});

app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.post('/data/dashboard', dashBoardData);
app.get('/get/:handle', getUserData); // Corrected to handle GET requests
// app.get('/get/socials/:handle', getUserSocials);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
