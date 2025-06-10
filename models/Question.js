const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  options: [String], // For MCQs
  answer: String,
  marks: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['mcq', 'short', 'scientific_reason', 'medium', 'long', 'optional', 'fill'],
    required: true
  },
  chapterNo: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound indexes for better query performance
questionSchema.index({ type: 1, marks: 1 });
questionSchema.index({ chapterNo: 1, type: 1 });
questionSchema.index({ marks: 1, chapterNo: 1 });
questionSchema.index({ type: 1, marks: 1, chapterNo: 1 });

// Update the updatedAt field before saving
questionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Cache for storing models to avoid re-compilation
const modelCache = new Map();

// Dynamic model creation function
const getQuestionModel = (subjectName, standard) => {
  // Sanitize subject name and standard for collection naming
  const sanitizedSubject = subjectName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const sanitizedStandard = standard.toString().replace(/[^a-z0-9]/g, '');
  const collectionName = `questions_${sanitizedSubject}_std${sanitizedStandard}`;
  
  // Check cache first
  if (modelCache.has(collectionName)) {
    return modelCache.get(collectionName);
  }
  
  // Check if model already exists in mongoose
  if (mongoose.models[collectionName]) {
    modelCache.set(collectionName, mongoose.models[collectionName]);
    return mongoose.models[collectionName];
  }
  
  // Create new model
  const model = mongoose.model(collectionName, questionSchema, collectionName);
  modelCache.set(collectionName, model);
  return model;
};

// Function to get collection name
const getCollectionName = (subjectName, standard) => {
  const sanitizedSubject = subjectName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const sanitizedStandard = standard.toString().replace(/[^a-z0-9]/g, '');
  return `questions_${sanitizedSubject}_std${sanitizedStandard}`;
};

module.exports = { 
  questionSchema, 
  getQuestionModel, 
  getCollectionName 
};
