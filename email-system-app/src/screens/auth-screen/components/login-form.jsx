import React from 'react';
import { Input, Form } from 'antd';

const LoginForm = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Form onFinish={(e) => e.preventDefault()}>
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
        rules={[{ required: true, message: 'Password is required!' }]}
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

export default LoginForm;
