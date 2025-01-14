const express = require('express');
const router = express.Router();
const {
  createSubmission,
  getSubmissions,
  getUserSubmissions,
} = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getSubmissions).post(protect, createSubmission);
router.get('/me', protect, getUserSubmissions);

module.exports = router; 