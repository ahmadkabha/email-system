import React from 'react';
import { Input, Form } from 'antd';

const RegisterForm = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Form onFinish={(e) => e.preventDefault()}>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input name="lastName" value={data.lastName} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please input a valid email!',
          },
        ]}
      >
        <Input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
