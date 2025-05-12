const Email = require('../model/email.model');

// Save email as draft(or update draft if emailId is provided)
async function saveDraft(subject, body, sender, receivers, emailId = null) {
  let email;

  if (emailId) {
    email = await Email.findById(emailId);
    if (!email) {
      throw new Error('Draft email not found');
    }

    email.subject = subject;
    email.body = body;
    email.receivers = receivers;
    email.status = 'draft';
  } else {
    email = new Email({
      subject,
      body,
      sender,
      receivers,
      status: 'draft',
    });
  }

  return email.save();
}

// Send email(create a new one or send an existing draft)
async function sendEmail(subject, body, sender, receivers, emailId = null) {
  let email;

  if (emailId) {
    email = await Email.findById(emailId);
    if (!email) {
      throw new Error('Draft email not found');
    }
    email.subject = subject;
    email.body = body;
    email.receivers = receivers;
    email.status = 'sent';
  } else {
    email = new Email({
      subject,
      body,
      sender,
      receivers,
      status: 'sent',
    });
  }

  return email.save();
}

async function getDrafts(userId) {
  return await Email.find({ sender: userId, status: 'draft' })
    .select('_id subject body status timestamp')
    .populate('sender', 'firstName lastName email')
    .populate('receivers', 'firstName lastName email')
    .sort({ timestamp: -1 })
    .exec();
}

async function getInbox(userId) {
  return await Email.find({ receivers: userId, status: 'sent' })
    .select('_id subject body status timestamp')
    .populate('sender', 'firstName lastName email')
    .populate('receivers', 'firstName lastName email')
    .sort({ timestamp: -1 })
    .exec();
}

async function getOutbox(userId) {
  return await Email.find({ sender: userId, status: 'sent' })
    .select('_id subject body status timestamp')
    .populate('sender', 'firstName lastName email')
    .populate('receivers', 'firstName lastName email')
    .sort({ timestamp: -1 })
    .exec();
}

module.exports = { saveDraft, sendEmail, getDrafts, getInbox, getOutbox };
