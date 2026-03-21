const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

router.post('/', contactLimiter, submitContact);
router.get('/', getContacts);

module.exports = router;
