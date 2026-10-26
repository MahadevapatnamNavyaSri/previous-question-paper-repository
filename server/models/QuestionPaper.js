
const mongoose = require('mongoose');

const questionPaperSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  regulation: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('QuestionPaper', questionPaperSchema);
