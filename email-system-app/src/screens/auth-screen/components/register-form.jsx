import React from 'react';

const RegisterForm = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </div>
    </form>
  );
};

export default RegisterForm;
