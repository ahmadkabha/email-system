import React, { useState, useEffect } from 'react';
import ComposeModal from './components/compose-modal';
import EmailTabs from './components/email-tabs';
import { getInbox, getOutbox, getDrafts } from '../../services/emailService';
import { useNavigate } from 'react-router-dom';
import { Button, Tabs } from 'antd';
const { TabPane } = Tabs;

const MainScreen = () => {
  const [emails, setEmails] = useState([]);
  const [tabKey, setTabKey] = useState('inbox');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDraft, setCurrentDraft] = useState(null);
  const navigate = useNavigate();

  const fetchEmails = async (tab) => {
    try {
      let data;
      if (tab === 'inbox') {
        data = await getInbox();
      } else if (tab === 'outbox') {
        data = await getOutbox();
      } else if (tab === 'drafts') {
        data = await getDrafts();
      }
      setEmails(data);
    } catch (err) {
      alert('Failed to fetch emails');
    }
  };

  useEffect(() => {
    fetchEmails(tabKey);
  }, [tabKey]);

  const handleTabChange = (key) => {
    setTabKey(key);
  };

  const handleOpenDraftInModal = (draft) => {
    setCurrentDraft(draft);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setCurrentDraft(null);
  };

  const handleRefresh = async () => {
    try {
      await fetchEmails(tabKey);
      alert('Emails refreshed successfully');
    } catch (error) {
      alert('Failed to refresh emails');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <Button
        onClick={handleRefresh}
        style={{ marginBottom: 16, marginRight: 8 }}
      >
        Refresh
      </Button>
      <Button
        onClick={() => setModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Compose
      </Button>
      <Button
        onClick={handleLogout}
        style={{ marginBottom: 16, marginLeft: 8 }}
      >
        Logout
      </Button>
      <Tabs activeKey={tabKey} onChange={handleTabChange} type="card">
        <TabPane tab="Inbox" key="inbox">
          <EmailTabs
            emails={emails}
            onOpenDraftInModal={handleOpenDraftInModal}
            fetchEmails={fetchEmails}
            tabKey={tabKey}
          />
        </TabPane>
        <TabPane tab="Outbox" key="outbox">
          <EmailTabs
            emails={emails}
            onOpenDraftInModal={handleOpenDraftInModal}
            fetchEmails={fetchEmails}
            tabKey={tabKey}
          />
        </TabPane>
        <TabPane tab="Drafts" key="drafts">
          <EmailTabs
            emails={emails}
            onOpenDraftInModal={handleOpenDraftInModal}
            fetchEmails={fetchEmails}
            tabKey={tabKey}
          />
        </TabPane>
      </Tabs>

      {modalVisible && (
        <ComposeModal
          draft={currentDraft}
          visible={modalVisible}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MainScreen;
