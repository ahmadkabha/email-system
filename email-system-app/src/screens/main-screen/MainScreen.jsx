import React, { useState, useEffect } from 'react';
import ComposeModal from './components/compose-modal';
import EmailTabs from './components/email-tabs';
import { getInbox, getOutbox, getDrafts } from '../../services/emailService';
import { useNavigate } from 'react-router-dom';

const MainScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [inbox, setInbox] = useState([]);
  const [outbox, setOutbox] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInbox();
    fetchOutbox();
    fetchDrafts();
  }, []);

  const fetchInbox = async () => {
    const data = await getInbox();
    setInbox(data);
  };

  const fetchOutbox = async () => {
    const data = await getOutbox();
    setOutbox(data);
  };

  const fetchDrafts = async () => {
    const data = await getDrafts();
    setDrafts(data);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h1>Main Screen</h1>
      <button onClick={toggleModal}>Compose</button>

      <button onClick={handleLogout}>Logout</button>

      {showModal && (
        <ComposeModal closeModal={toggleModal} fetchDrafts={fetchDrafts} />
      )}

      <EmailTabs inbox={inbox} outbox={outbox} drafts={drafts} />
    </div>
  );
};

export default MainScreen;
