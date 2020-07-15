import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginCard from './LoginCard';
import SignUpCard from './SignUpCard';

const Login = () => {
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (localStorage.getItem('token') || !!token) {
      history.replace('/');
    }
  }, [history, token]);

  return (
    <div className="login-wrapper">
      <div className="login-header">Welcome!</div>
      {isLogin && <LoginCard setIsLogin={setIsLogin} />}
      {!isLogin && <SignUpCard setIsLogin={setIsLogin} />}
    </div>
  );
};

export default Login;
