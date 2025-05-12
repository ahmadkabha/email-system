import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/login-form';
import RegisterForm from './components/register-form';
import { register, login } from '../../services/authService';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/main');
    }
  }, [navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async () => {
    const { email, password, firstName, lastName } = formData;

    try {
      let response;

      if (isLogin) {
        response = await login({ email, password });
      } else {
        response = await register({ email, password, firstName, lastName });
      }
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      navigate('/main');
    } catch (err) {
      alert('Error. Please try again.');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {isLogin ? (
        <LoginForm data={formData} setData={setFormData} />
      ) : (
        <RegisterForm data={formData} setData={setFormData} />
      )}
      <button onClick={toggleForm}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
      <button onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</button>
    </div>
  );
};

export default AuthScreen;
