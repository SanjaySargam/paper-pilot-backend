const Subject = require("../models/Subject");

app.post('/api/subjects', async (req, res) => {
    try {
      const subject = new Subject(req.body);
      await subject.save();
      res.status(201).send(subject);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  app.get('/api/subjects', async (req, res) => {
    try {
      const subjects = await Subject.find();
      res.send(subjects);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  app.get('/api/subjects/standard/:standard', async (req, res) => {
    try {
      const subjects = await Subject.find({ standard: req.params.standard });
      res.send(subjects);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  