const Exam = require("../models/Exam");

app.post('/api/exams', async (req, res) => {
    try {
      const exam = new Exam(req.body);
      await exam.save();
      res.status(201).send(exam);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  app.get('/api/exams', async (req, res) => {
    try {
      const { subject, standard, examType } = req.query;
      let query = {};
      if (subject) query.subject = subject;
      if (standard) query.standard = standard;
      if (examType) query.examType = examType;
      
      const exams = await Exam.find(query)
        .populate('subject')
        .populate('sections.questions');
      res.send(exams);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  app.get('/api/exams/:id', async (req, res) => {
    try {
      const exam = await Exam.findById(req.params.id)
        .populate('subject')
        .populate('sections.questions');
      
      if (!exam) {
        return res.status(404).send('Exam not found');
      }
      
      res.send(exam);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  