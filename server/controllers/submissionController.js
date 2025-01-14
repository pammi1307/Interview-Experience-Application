const Submission = require('../models/submissionModel');

// @desc    Create new submission
// @route   POST /api/submissions
// @access  Private
const createSubmission = async (req, res) => {
  try {
    const { name, country, company, questions } = req.body;

    // Validate required fields
    if (!name || !country || !company || !questions || questions.length === 0) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const submission = await Submission.create({
      name,
      country,
      company,
      questions,
      userId: req.user._id,
    });

    res.status(201).json({
      _id: submission._id,
      name: submission.name,
      country: submission.country,
      company: submission.company,
      questions: submission.questions,
      userId: submission.userId,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all submissions
// @route   GET /api/submissions
// @access  Public
const getSubmissions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const submissions = await Submission.find()
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name')
      .select('name country company questions createdAt updatedAt');

    const total = await Submission.countDocuments();

    res.json({
      submissions,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalSubmissions: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user submissions
// @route   GET /api/submissions/me
// @access  Private
const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user._id })
      .select('name country company questions createdAt updatedAt');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubmission,
  getSubmissions,
  getUserSubmissions,
}; 