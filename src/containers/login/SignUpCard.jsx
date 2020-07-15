import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, Form, Dropdown, Icon } from 'semantic-ui-react';
import countries from '../../common/countries.json';

import { signup } from '../../store/user/thunk';
import { EMAIL_REGEX } from '../../common/constants';

const COUNTRIES = Object.keys(countries).map((country, index) => ({
  key: index,
  value: country,
  text: country,
}));

const SignUpCard = ({ setIsLogin }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector((state) => state.user.loading);

  const [validationFailed, setValidationFailed] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [shouldBeMin, setShouldBeMin] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);

  const [cities, setCities] = useState([]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState();

  useEffect(() => {
    setCity(null);
    if (country && countries[country]) {
      setCities(
        countries[country].map((c, index) => ({
          key: index,
          value: c,
          text: c,
        }))
      );
    }
  }, [country]);

  const onCountryChange = (_, { value }) => {
    setCountry(value);
  };

  const onCityChange = (_, { value }) => {
    setCity(value);
  };

  const onSignUp = (e) => {
    e.preventDefault();

    setValidationFailed(false);
    setPasswordMismatch(false);
    setShouldBeMin(false);
    setEmailFailed(false);

    if (!email || !password || !firstName || !lastName || !country || !city) {
      setValidationFailed(true);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailFailed(true);
      return;
    }

    if (confirmPassword !== password) {
      setPasswordMismatch(true);
      return;
    }

    if (password.length < 6) {
      setShouldBeMin(true);
      return;
    }

    dispatch(signup({ email, password, firstName, lastName, country, city }));
  };

  return (
    <Form onSubmit={onSignUp}>
      <div className="login-card-wrapper">
        <div className="login-card-header">Sign Up</div>
        <div className="login-continue" onClick={() => history.push('/')}>
          Continue as Guest
          <Icon name="arrow right" />
        </div>
        {validationFailed && (
          <div className="login-card-validation"> All fields are required </div>
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
        {emailFailed && (
          <div className="login-card-validation">
            Must be valid email format
          </div>
        )}
        <div className="login-card-input-wrapper">
          <Input
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            size="large"
            value={password}
            loading={loading}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-card-input-wrapper">
          <Input
            icon="lock"
            iconPosition="left"
            placeholder="Confirm Password"
            size="large"
            value={confirmPassword}
            loading={loading}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {shouldBeMin && (
          <div className="login-card-validation">
            Should be min. 6 character
          </div>
        )}
        {passwordMismatch && (
          <div className="login-card-validation"> Password mismatch </div>
        )}
        <div className="login-card-input-wrapper">
          <Input
            icon="user"
            iconPosition="left"
            placeholder="First Name"
            size="large"
            value={firstName}
            loading={loading}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="login-card-input-wrapper">
          <Input
            icon="user"
            iconPosition="left"
            placeholder="Last Name"
            size="large"
            value={lastName}
            loading={loading}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="login-card-input-wrapper">
          <Dropdown
            className="login-card-dropdown"
            placeholder="Country"
            search
            selection
            value={country}
            options={COUNTRIES}
            onChange={onCountryChange}
          />
        </div>
        {country && (
          <div className="login-card-input-wrapper">
            <Dropdown
              className="login-card-dropdown"
              placeholder="City"
              search
              selection
              value={city}
              options={cities}
              onChange={onCityChange}
            />
          </div>
        )}
        <div className="login-card-button-wrapper">
          <Button
            className="login-card-button"
            color="blue"
            loading={loading}
            type="submit"
          >
            Sign Up
          </Button>
        </div>
        <div className="login-sign-up-text" onClick={() => setIsLogin(true)}>
          Log In
        </div>
      </div>
    </Form>
  );
};

export default SignUpCard;
