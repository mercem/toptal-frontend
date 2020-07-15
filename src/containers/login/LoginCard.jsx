import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, Form, Icon } from 'semantic-ui-react';
import { EMAIL_REGEX } from '../../common/constants';

import { login } from '../../store/user/thunk';

const LoginCard = ({ setIsLogin }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const failed = useSelector((state) => state.user.failed);
  const loading = useSelector((state) => state.user.loading);

  const [emailRequired, setEmailRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();

    const isEmailFailed = !email || (email && !EMAIL_REGEX.test(email));
    if (isEmailFailed) {
      setEmailRequired(true);
    } else {
      setEmailRequired(false);
    }

    if (!password) {
      setPasswordRequired(true);
    } else {
      setPasswordRequired(false);
    }

    if (!isEmailFailed && password) {
      dispatch(login({ email, password }));
    }
  };

  return (
    <Form onSubmit={onLogin}>
      <div className="login-card-wrapper">
        <div className="login-card-header">Login</div>
        <div className="login-continue" onClick={() => history.push('/')}>
          Continue as Guest
          <Icon name="arrow right" />
        </div>
        {failed && (
          <div className="login-card-validation"> Invalid Credentials </div>
        )}
        <div className="login-card-input-wrapper">
          <Input
            icon="mail"
            iconPosition="left"
            placeholder="E-mail"
            size="large"
            value={email}
            loading={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {emailRequired && (
          <div className="login-card-validation">
            E-mail is required in valid format
          </div>
        )}
        <div className="login-card-input-wrapper">
          <Input
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            size="large"
            type="password"
            value={password}
            loading={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {passwordRequired && (
          <div className="login-card-validation"> Password is required. </div>
        )}
        <div className="login-card-button-wrapper">
          <Button
            className="login-card-button"
            color="blue"
            loading={loading}
            type="submit"
          >
            Login
          </Button>
        </div>
        <div className="login-sign-up-text" onClick={() => setIsLogin(false)}>
          Sign Up!
        </div>
      </div>
    </Form>
  );
};

export default LoginCard;
