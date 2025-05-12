import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const saveDraft = async (emailData) => {
  const response = await axios.post(`${API_URL}/emails/draft`, emailData, {
    headers: {
      token: localStorage.getItem('token'),
    },
  });
  return response.data;
};

export const sendEmail = async (emailData) => {
  emailData.receivers = emailData.receivers.split(', ');
  const response = await axios.post(`${API_URL}/emails/send`, emailData, {
    headers: {
      token: localStorage.getItem('token'),
    },
  });
  return response.data;
};

export const getInbox = async () => {
  const response = await axios.get(`${API_URL}/emails/inbox`, {
    headers: {
      token: localStorage.getItem('token'),
    },
  });
  return response.data;
};

export const getOutbox = async () => {
  const response = await axios.get(`${API_URL}/emails/outbox`, {
    headers: {
      token: localStorage.getItem('token'),
    },
  });
  return response.data;
};

export const getDrafts = async () => {
  const response = await axios.get(`${API_URL}/emails/drafts`, {
    headers: {
      token: localStorage.getItem('token'),
    },
  });
  return response.data;
};
