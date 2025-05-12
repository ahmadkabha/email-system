import React, { useState } from 'react';
import { Table, Button } from 'antd';

const EmailTabs = ({ emails, onOpenDraftInModal, tabKey }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (record) => {
    setExpandedRow(expandedRow === record.key ? null : record.key);
  };

  const columns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text, record) => (
        <Button type="link" onClick={() => handleRowClick(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Sender',
      dataIndex: 'sender',
      key: 'sender',
      render: (sender) => sender?.email,
    },
    {
      title: 'Receivers',
      dataIndex: 'receivers',
      key: 'receivers',
      render: (receivers) => receivers.map((r) => r.email).join('\n'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={emails}
      rowKey="_id"
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <div>
            <p>
              <strong>Subject:</strong> {record.subject}
            </p>
            <p>
              <strong>Body:</strong> {record.body}
            </p>
            <p>
              <strong>Receivers:</strong>{' '}
              {record.receivers.map((r) => r.email).join(', ')}
            </p>
            <p>
              <strong>Status:</strong> {record.status}
            </p>
            {record._id && tabKey === 'drafts' && (
              <Button onClick={() => onOpenDraftInModal(record)}>
                Edit Draft
              </Button>
            )}
          </div>
        ),
        onExpand: (expanded, record) => {
          setExpandedRow(expanded ? record.key : null);
        },
      }}
    />
  );
};

export default EmailTabs;
