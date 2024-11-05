require('dotenv').config(); // Add this at the top of your file
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const { registerUser, loginUser } = require('./controllers/auth');
const { dashBoardData } = require('./controllers/dashboard');

const cors = require('cors');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send(`Server running on port ${port}`);
});

app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

app.post('/data/dashboard', dashBoardData);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
