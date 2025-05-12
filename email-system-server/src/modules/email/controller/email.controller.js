const emailService = require('../service/email.service');

const getDrafts = async (req, res) => {
  try {
    const { userId } = req.params;
    const drafts = await emailService.getDrafts(userId);
    res.status(200).json(drafts);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching drafts', error: error.message });
  }
};

const getInbox = async (req, res) => {
  try {
    const { userId } = req.params;
    const inbox = await emailService.getInbox(userId);
    res.status(200).json(inbox);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching inbox', error: error.message });
  }
};

const getOutbox = async (req, res) => {
  try {
    const { userId } = req.params;
    const outbox = await emailService.getOutbox(userId);
    res.status(200).json(outbox);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching outbox', error: error.message });
  }
};

const saveDraft = async (req, res) => {
  try {
    const { subject, body, sender, receivers, emailId } = req.body;
    const email = await emailService.saveDraft(
      subject,
      body,
      sender,
      receivers,
      emailId
    );
    res.status(200).json(email);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error saving draft', error: error.message });
  }
};

const sendEmail = async (req, res) => {
  try {
    const { subject, body, sender, receivers, emailId } = req.body;
    const email = await emailService.sendEmail(
      subject,
      body,
      sender,
      receivers,
      emailId
    );
    res.status(200).json(email);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error sending email', error: error.message });
  }
};

module.exports = {
  getDrafts,
  getInbox,
  getOutbox,
  saveDraft,
  sendEmail,
};
