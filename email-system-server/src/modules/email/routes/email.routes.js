const express = require('express');
const emailController = require('../controller/email.controller');
const authenticate = require('../../auth/auth.middleware');

const router = express.Router();
router.get('/drafts/:userId', authenticate, emailController.getDrafts);
router.get('/inbox/:userId', authenticate, emailController.getInbox);
router.get('/outbox/:userId', authenticate, emailController.getOutbox);
router.post('/draft', authenticate, emailController.saveDraft);
router.post('/send', authenticate, emailController.sendEmail);

module.exports = router;
