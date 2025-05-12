import React from 'react';

const EmailTabs = ({ inbox, outbox, drafts }) => {
  return (
    <div>
      <div className="tabs">
        <h2>Inbox</h2>
        <ul>
          {inbox.map((email) => (
            <li key={email._id}>{email.subject}</li>
          ))}
        </ul>
      </div>

      <div className="tabs">
        <h2>Outbox</h2>
        <ul>
          {outbox.map((email) => (
            <li key={email._id}>{email.subject}</li>
          ))}
        </ul>
      </div>

      <div className="tabs">
        <h2>Drafts</h2>
        <ul>
          {drafts.map((email) => (
            <li key={email._id}>{email.subject}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmailTabs;
