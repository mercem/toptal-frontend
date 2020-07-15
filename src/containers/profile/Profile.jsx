/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Segment,
  Input,
  Dropdown,
  Placeholder,
  Button,
  Form,
  Icon,
} from 'semantic-ui-react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import countries from '../../common/countries.json';
import { USER_ROLES } from '../../common/constants';
import { USER, USER_UPDATE, UPDATE_PASSWORD } from '../../api/endpoints';
import api from '../../api/axios';

const COUNTRIES = Object.keys(countries).map((country, index) => ({
  key: index,
  value: country,
  text: country,
}));

const PlaceholderWrapper = () => (
  <Placeholder className="profile-placeholder">
    <Placeholder.Paragraph>
      <Placeholder.Line length="full" />
      <Placeholder.Line length="very long" />
      <Placeholder.Line length="long" />
      <Placeholder.Line length="medium" />
      <Placeholder.Line length="short" />
      <Placeholder.Line length="very short" />
    </Placeholder.Paragraph>
    <Placeholder.Paragraph>
      <Placeholder.Line length="full" />
      <Placeholder.Line length="very long" />
      <Placeholder.Line length="long" />
      <Placeholder.Line length="medium" />
      <Placeholder.Line length="short" />
      <Placeholder.Line length="very short" />
    </Placeholder.Paragraph>
  </Placeholder>
);

const Profile = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const allCategories = useSelector((state) => state.common.categories);
  const allSubCategories = useSelector((state) => state.common.subCategories);

  const { id } = match.params || {};

  const isAdmin = Number(localStorage.getItem('role')) === USER_ROLES.ADMIN;
  const isMe = localStorage.getItem('id') === id;

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  const isAuth = isMe || isAdmin;

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const [cityOptions, setCityOptions] = useState([]);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [enquire, setEnquire] = useState();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const getUser = useCallback(() => {
    api
      .get(`${USER}/${id}`)
      .then(({ data }) => {
        setEmail(data.email);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setCountry(data.country);
        setCity(data.city);
        setCategories(data.categoryIds.map((cat) => cat.id));
        setSubCategories(data.subCategoryIds.map((subCat) => subCat.id));

        setCityOptions(
          countries[data.country].map((c, index) => ({
            key: index,
            value: c,
            text: c,
          }))
        );
        setEnquire(data.numberOfEnquire);
        setLoading(false);
      })
      .catch(() => {
        history.push('/');
      });
  }, [history, id]);

  useEffect(() => {
    getUser();
  }, [history, id, getUser]);

  const onCountryChange = (_, { value }) => {
    setCountry(value);
    setCity(null);
    if (value && countries[value]) {
      setCityOptions(
        countries[value].map((c, index) => ({
          key: index,
          value: c,
          text: c,
        }))
      );
    }
  };

  useEffect(() => {
    setCategoryOptions(
      allCategories.map((c) => ({
        key: c._id,
        value: c._id,
        text: c.name,
      }))
    );
    setSubCategoryOptions(
      allSubCategories.map((c) => ({
        key: c._id,
        value: c._id,
        text: c.name,
      }))
    );
  }, [allCategories, allSubCategories]);

  const onCityChange = (_, { value }) => {
    setCity(value);
  };

  const onSave = () => {
    if (!email || !firstName || !lastName || !country || !city) {
      setError('Contact information cannot contain empty field');
      return;
    }
    setDisabled(true);
    api
      .post(USER_UPDATE, {
        userId: id,
        email,
        firstName,
        lastName,
        city,
        country,
        categoryIds: categories,
        subCategoryIds: subCategories,
      })
      .then(() => {
        setError('');
      })
      .catch(({ response }) => {
        const msg = response.data;
        setError(msg);
        getUser();
      });
  };

  const onCategoriesChange = (_, { value }) => {
    setCategories(value);
  };

  const onSubCategoriesChange = (_, { value }) => {
    setSubCategories(value);
  };

  const onChangePassword = () => {
    api
      .post(UPDATE_PASSWORD, {
        userId: id,
        oldPassword,
        newPassword,
      })
      .then(() => {
        setPasswordError('');
      })
      .catch(({ response }) => {
        const msg = response.data;
        setPasswordError(msg);
      })
      .finally(() => {
        setOldPassword('');
        setNewPassword('');
      });
  };

  const mailMessage = `mailto:${email}?subject=Top%20Talents%20Online%20Contact&body=Hi%20${firstName},%0d%0dI%20would%20like%20to%20talk%20to%20you%20about%20a%20project.%0d%0dIf%20you%20want%20to%20talk%20about%20details%20please%20reach%20me.%0d%0dRegards.`;

  return (
    <div className="profile-wrapper">
      <div className="profile-header">Profile</div>
      <Segment
        className={`profile-segment ${!isMe || isAdmin ? 'should-active' : ''}`}
      >
        {loading ? (
          <PlaceholderWrapper />
        ) : (
          <Form>
            {error && <div className="profile-error">{error}</div>}

            <div className="profile-row">
              <Form.Field>
                <label>
                  {'E-Mail  - '}
                  <a href={mailMessage} className="profile-send-email">
                    {'Send '}
                    <Icon name="mail" />
                  </a>
                </label>
                <Input
                  placeholder="E-Mail"
                  value={email}
                  disabled={disabled}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>First Name</label>
                <Input
                  placeholder="First Name"
                  value={firstName}
                  disabled={disabled}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  disabled={disabled}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Field>
            </div>
            <div className="profile-row">
              <Form.Field>
                <label>Country</label>
                <Dropdown
                  className="profile-dropdown"
                  placeholder="Country"
                  search
                  selection
                  value={country}
                  options={COUNTRIES}
                  onChange={onCountryChange}
                  disabled={disabled}
                />
              </Form.Field>
              <Form.Field>
                <label>City</label>
                <Dropdown
                  className="profile-dropdown"
                  placeholder="City"
                  search
                  selection
                  value={city}
                  options={cityOptions}
                  onChange={onCityChange}
                  disabled={disabled}
                />
              </Form.Field>
              <Form.Field>
                <label>Number of Enquire</label>
                <Input
                  placeholder="Number of Enquire"
                  value={enquire}
                  disabled
                />
              </Form.Field>
            </div>
            <div className="profile-row">
              <Form.Field>
                <label>Categories</label>
                <Dropdown
                  placeholder="Categories"
                  className="profile-category profile-dropdown"
                  fluid
                  multiple
                  search
                  selection
                  onChange={onCategoriesChange}
                  value={categories}
                  options={categoryOptions}
                  disabled={disabled}
                />
              </Form.Field>
              <Form.Field>
                <label>Subcategories</label>
                <Dropdown
                  placeholder="Subcategories"
                  className="profile-category profile-dropdown"
                  fluid
                  multiple
                  search
                  selection
                  onChange={onSubCategoriesChange}
                  value={subCategories}
                  options={subCategoryOptions}
                  disabled={disabled}
                />
              </Form.Field>
            </div>
            <div className="profile-button">
              {isAuth && disabled && (
                <Button color="yellow" onClick={() => setDisabled(false)}>
                  Edit
                </Button>
              )}
              {isAuth && !disabled && (
                <Button color="green" onClick={onSave}>
                  Save
                </Button>
              )}
            </div>
          </Form>
        )}
      </Segment>
      {isAuth && (
        <Segment className="profile-segment">
          {passwordError && (
            <div className="profile-error">{passwordError}</div>
          )}
          <div className="profile-password-row">
            {!isAdmin && (
              <Input
                className="profile-input"
                placeholder="Current Password"
                value={oldPassword}
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            )}
            <Input
              className="profile-input"
              placeholder="New Password"
              value={newPassword}
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className='className="profile-input"'>
              <Button color="blue" onClick={onChangePassword}>
                Change
              </Button>
            </div>
          </div>
        </Segment>
      )}
    </div>
  );
};

export default Profile;
