import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthScreen from './screens/auth-screen/Auth-screen';
import MainScreen from './screens/main-screen/MainScreen';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthScreen />} />
      <Route path="/main" element={<MainScreen />} />
    </Routes>
  );
};

export default App;
