import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { saveDraft, sendEmail } from '../../../services/emailService';
import { getOutbox, getDrafts } from '../../../services/emailService';

const ComposeModal = ({ visible, onClose, draft, fetch }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (draft) {
      const transformedDraft = {
        ...draft,
        receivers: draft.receivers?.map((r) => r.email).join(', ') || '',
        emailId: draft._id,
      };
      console.log(transformedDraft);
      form.setFieldsValue(transformedDraft);
    }
  }, [draft, form]);

  const handleSaveDraft = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      await saveDraft(values);
      alert('Draft saved successfully');
      await getDrafts();
      onClose();
    } catch (err) {
      alert('Failed to save draft');
    }
  };

  const handleSendEmail = async () => {
    try {
      const values = await form.validateFields();
      await sendEmail(values);
      alert('Email sent successfully');
      await getOutbox();
      if (draft) await getDrafts();
      onClose();
    } catch (err) {
      alert('Failed to send email');
    }
  };

  return (
    <Modal
      title={draft ? 'Edit Draft' : 'Compose Email'}
      visible={visible}
      onCancel={onClose}
      footer={[
        <>
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>
          <Button key="send" type="primary" onClick={handleSendEmail}>
            Send
          </Button>
          <Button key="save" onClick={handleSaveDraft}>
            Save Draft
          </Button>
        </>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Subject" name="subject" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Body" name="body" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Receivers"
          name="receivers"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="emailId" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ComposeModal;
