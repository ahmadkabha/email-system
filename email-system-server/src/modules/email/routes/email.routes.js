const express = require('express');
const emailController = require('../controller/email.controller');

const router = express.Router();
router.get('/drafts/:userId', emailController.getDrafts);
router.get('/inbox/:userId', emailController.getInbox);
router.get('/outbox/:userId', emailController.getOutbox);
router.post('/draft', emailController.saveDraft);
router.post('/send', emailController.sendEmail);

module.exports = router;
