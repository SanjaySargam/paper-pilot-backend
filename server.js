const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const cors = require('cors');
const Question = require('./models/Question');

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(cors(corsOptions)) // Use this after the variable declaration

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/teachers', require('./routes/teacherRoutes'));
app.use('/api/schools', require('./routes/schoolRoutes'));

app.post('/api/questions', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('/api/questionss', async (req, res) => {
  try {
    const { type, marks } = req.query;
    let query = {};
    if (type) query.type = type;
    if (marks) query.marks = marks;
    
    const questions = await Question.find(query);
    res.send(questions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
