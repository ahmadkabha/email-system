import React, { useState } from 'react';
import { saveDraft, sendEmail } from '../../../services/emailService';

const ComposeModal = ({ closeModal, fetchDrafts }) => {
  const [emailData, setEmailData] = useState({
    subject: '',
    body: '',
    receivers: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReceiverChange = (e) => {
    const { value } = e.target;
    const updatedReceivers = value.split(/[ ,]+/).filter((email) => email);
    setEmailData((prevData) => ({
      ...prevData,
      receivers: updatedReceivers,
    }));
  };

  const handleSend = async () => {
    const { subject, body, receivers } = emailData;

    try {
      await sendEmail({ subject, body, receivers });
      fetchDrafts();
      closeModal();
    } catch (err) {
      console.error('Error sending email:', err);
    }
  };

  const handleSaveDraft = async () => {
    const { subject, body, receivers } = emailData;

    try {
      await saveDraft({ subject, body, receivers });
      fetchDrafts();
      closeModal();
    } catch (err) {
      console.error('Error saving draft:', err);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          X
        </span>
        <h2>Compose Email</h2>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={emailData.subject}
          onChange={handleChange}
        />
        <textarea
          name="body"
          placeholder="Body"
          value={emailData.body}
          onChange={handleChange}
        />
        <input
          type="text"
          name="receivers"
          placeholder="Receivers (comma separated)"
          value={emailData.receivers.join(', ')} // Join array with commas for display
          onChange={handleReceiverChange}
        />
        <div className="modal-actions">
          <button onClick={handleSaveDraft}>Save as Draft</button>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;
