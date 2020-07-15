import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Menu, Responsive, Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import { logout as logoutAction } from '../store/user/userSlice';
import { fetchCategories, fetchSubCategories } from '../store/common/thunk';

const AuthPage = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const categories = useSelector((state) => state.common.categories);
  const subCategories = useSelector((state) => state.common.subCategories);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const [showMenu, setShowMenu] = useState(false);

  const currentUserId = localStorage.getItem('id');

  const logout = () => {
    dispatch(logoutAction());
    history.push('/');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (!categories || !categories.length) {
      dispatch(fetchCategories());
    }
    if (!subCategories || !subCategories.length) {
      dispatch(fetchSubCategories());
    }
  }, [categories, subCategories, dispatch]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const getMenu = useCallback(() => (
    <>
      <Menu.Item
        name="home"
        color="blue"
        active={location.pathname === '/'}
        onClick={() => history.push('/')}
      />
      {isLoggedIn && (
        <Menu.Item
          name="My Profile"
          color="blue"
          onClick={() => history.push(`/profile/${currentUserId}`)}
          active={location.pathname === `/profile/${currentUserId}`}
        />
      )}
      {isLoggedIn && <Menu.Item name="Logout" color="blue" onClick={logout} />}
      {!isLoggedIn && (
        <Menu.Item
          name="Login"
          color="blue"
          onClick={() => history.push('/login')}
        />
      )}
    </>
  ));

  return (
    <div className="auth-page-wrapper">
      <Menu
        className={`auth-page-menu ${showMenu ? 'auth-page-show-menu' : ''}`}
        vertical
        stackable
        inverted
      >
        <Responsive maxWidth={768} className="auth-responsive-tablet">
          <Button
            className="auth-menu-icon"
            icon
            onClick={() => setShowMenu(!showMenu)}
          >
            <Icon name="bars" />
          </Button>
          {showMenu && getMenu()}
        </Responsive>
        <Responsive minWidth={769}>
          <>
            <div
              className="auth-page-menu-header"
              onClick={() => history.push('/')}
            >
              Top Talents
            </div>
            {getMenu()}
          </>
        </Responsive>
      </Menu>
      <div className="auth-page-content">{children}</div>
    </div>
  );
};

export default AuthPage;
