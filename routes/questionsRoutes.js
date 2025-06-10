const express = require('express');
const { getQuestionModel, getCollectionName } = require('../models/Question');
const mongoose = require('mongoose');
const router = express.Router();

// Middleware for parameter validation
const validateRequiredParams = (req, res, next) => {
  const { subjectName, standard } = req.query;
  
  if (!subjectName || !standard) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'subjectName and standard are required parameters',
      example: '/api/questions?subjectName=math&standard=10'
    });
  }
  
  next();
};

// GET: Fetch questions with filters
router.get('/api/questions', validateRequiredParams, async (req, res) => {
  try {
    const { type, marks, subjectName, standard, chapterNo, limit, page, sortBy, sortOrder } = req.query;
    
    // Get the appropriate model for the subject-standard combination
    const QuestionModel = getQuestionModel(subjectName, standard);
    
    // Build query object
    let query = {};
    if (type) {
      if (Array.isArray(type)) {
        query.type = { $in: type };
      } else {
        query.type = type;
      }
    }
    if (marks) query.marks = parseInt(marks);
    if (chapterNo) {
      if (Array.isArray(chapterNo)) {
        query.chapterNo = { $in: chapterNo.map(ch => parseInt(ch)) };
      } else {
        query.chapterNo = parseInt(chapterNo);
      }
    }

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 100;
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    let sort = {};
    const validSortFields = ['chapterNo', 'type', 'marks', 'createdAt', 'updatedAt'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'chapterNo';
    const order = sortOrder === 'desc' ? -1 : 1;
    sort[sortField] = order;

    // Execute query with optimizations
    const [questions, totalCount] = await Promise.all([
      QuestionModel
        .find(query)
        .select('-__v') // Exclude version field
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(), // Returns plain JS objects for better performance
      QuestionModel.countDocuments(query)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    res.json({
      success: true,
      data: questions,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalQuestions: totalCount,
        questionsPerPage: limitNum,
        hasNextPage,
        hasPrevPage
      },
      filters: {
        subjectName,
        standard,
        type: type || 'all',
        marks: marks || 'all',
        chapterNo: chapterNo || 'all'
      }
    });

  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// GET: Get single question by ID
router.get('/api/questions/:id', validateRequiredParams, async (req, res) => {
  try {
    const { subjectName, standard } = req.query;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid question ID format'
      });
    }

    const QuestionModel = getQuestionModel(subjectName, standard);
    const question = await QuestionModel.findById(id).select('-__v').lean();

    if (!question) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }

    res.json({
      success: true,
      data: question
    });

  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// POST: Create new question
router.post('/api/questions', async (req, res) => {
  try {
    const { subjectName, standard, ...questionData } = req.body;

    if (!subjectName || !standard) {
      return res.status(400).json({
        success: false,
        error: 'subjectName and standard are required in request body'
      });
    }

    const QuestionModel = getQuestionModel(subjectName, standard);
    const newQuestion = new QuestionModel(questionData);
    const savedQuestion = await newQuestion.save();

    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      data: savedQuestion
    });

  } catch (error) {
    console.error('Error creating question:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: error.errors
      });
    }

    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// PUT: Update question
router.put('/api/questions/:id', async (req, res) => {
  try {
    const { subjectName, standard, ...updateData } = req.body;
    const { id } = req.params;

    if (!subjectName || !standard) {
      return res.status(400).json({
        success: false,
        error: 'subjectName and standard are required in request body'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid question ID format'
      });
    }

    const QuestionModel = getQuestionModel(subjectName, standard);
    updateData.updatedAt = new Date();

    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }

    res.json({
      success: true,
      message: 'Question updated successfully',
      data: updatedQuestion
    });

  } catch (error) {
    console.error('Error updating question:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: error.errors
      });
    }

    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// DELETE: Delete question
router.delete('/api/questions/:id', validateRequiredParams, async (req, res) => {
  try {
    const { subjectName, standard } = req.query;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid question ID format'
      });
    }

    const QuestionModel = getQuestionModel(subjectName, standard);
    const deletedQuestion = await QuestionModel.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({
        success: false,
        error: 'Question not found'
      });
    }

    res.json({
      success: true,
      message: 'Question deleted successfully',
      data: deletedQuestion
    });

  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// GET: Get metadata about available subjects and standards
router.get('/api/questions/metadata', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const questionCollections = collections.filter(col => 
      col.name.startsWith('questions_')
    );
    
    const metadata = [];
    const subjects = new Set();
    const standards = new Set();

    questionCollections.forEach(col => {
      const parts = col.name.split('_');
      if (parts.length >= 3) {
        const standard = parts[parts.length - 1].replace('std', '');
        const subject = parts.slice(1, -1).join('_');
        
        subjects.add(subject);
        standards.add(standard);
        
        metadata.push({
          subject: subject.charAt(0).toUpperCase() + subject.slice(1),
          standard: standard,
          collectionName: col.name
        });
      }
    });
    
    res.json({
      success: true,
      data: {
        combinations: metadata,
        availableSubjects: Array.from(subjects).sort(),
        availableStandards: Array.from(standards).sort((a, b) => parseInt(a) - parseInt(b))
      }
    });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// POST: Bulk insert questions
router.post('/api/questions/bulk', async (req, res) => {
  try {
    const { questions, subjectName, standard } = req.body;
    
    if (!questions || !Array.isArray(questions) || !subjectName || !standard) {
      return res.status(400).json({
        success: false,
        error: 'questions array, subjectName, and standard are required'
      });
    }

    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Questions array cannot be empty'
      });
    }

    const QuestionModel = getQuestionModel(subjectName, standard);
    
    // Add timestamps to all questions
    const questionsWithTimestamps = questions.map(q => ({
      ...q,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Use insertMany for better performance
    const result = await QuestionModel.insertMany(questionsWithTimestamps, {
      ordered: false, // Continue inserting even if some fail
      rawResult: true
    });

    res.json({
      success: true,
      message: `Successfully inserted ${result.insertedCount} questions`,
      data: {
        insertedCount: result.insertedCount,
        insertedIds: result.insertedIds
      }
    });

  } catch (error) {
    console.error('Error in bulk insert:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate entry found',
        message: 'Some questions may already exist'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

// GET: Get statistics for a subject-standard combination
router.get('/api/questions/stats', validateRequiredParams, async (req, res) => {
  try {
    const { subjectName, standard } = req.query;
    const QuestionModel = getQuestionModel(subjectName, standard);

    const stats = await QuestionModel.aggregate([
      {
        $group: {
          _id: null,
          totalQuestions: { $sum: 1 },
          byType: {
            $push: {
              type: '$type',
              marks: '$marks',
              chapter: '$chapterNo'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalQuestions: 1,
          typeDistribution: {
            $reduce: {
              input: '$byType',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  {
                    $arrayToObject: [[{
                      k: '$$this.type',
                      v: { $add: [{ $ifNull: [{ $getField: { field: '$$this.type', input: '$$value' } }, 0] }, 1] }
                    }]]
                  }
                ]
              }
            }
          },
          chapterDistribution: {
            $reduce: {
              input: '$byType',
              initialValue: {},
              in: {
                $mergeObjects: [
                  '$$value',
                  {
                    $arrayToObject: [[{
                      k: { $toString: '$$this.chapter' },
                      v: { $add: [{ $ifNull: [{ $getField: { field: { $toString: '$$this.chapter' }, input: '$$value' } }, 0] }, 1] }
                    }]]
                  }
                ]
              }
            }
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalQuestions: 0,
      typeDistribution: {},
      chapterDistribution: {}
    };

    res.json({
      success: true,
      data: {
        subject: subjectName,
        standard: standard,
        ...result
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    });
  }
});

module.exports = router;
