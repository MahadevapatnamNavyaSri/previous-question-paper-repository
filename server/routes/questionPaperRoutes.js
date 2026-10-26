
const express = require('express');
const router = express.Router();

const QuestionPaper = require('../models/QuestionPaper');

// Get all question papers
router.get('/', async (req, res) => {
  try {
    const papers = await QuestionPaper.find();
    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new question paper
router.post('/', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const paper = new QuestionPaper(req.body);
    const savedPaper = await paper.save();
    res.status(201).json(savedPaper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedPaper = await QuestionPaper.findByIdAndDelete(
      req.params.id
    );

    if (!deletedPaper) {
      return res.status(404).json({ message: 'Question paper not found' });
    }

    res.json({ message: 'Question paper deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
