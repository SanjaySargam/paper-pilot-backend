const Question = require("../models/Question");

app.post('/api/questions', async (req, res) => {
    try {
      const question = new Question(req.body);
      await question.save();
      res.status(201).send(question);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  app.get('/api/questions', async (req, res) => {
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
  