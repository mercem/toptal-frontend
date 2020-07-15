import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button } from 'semantic-ui-react';

import api from '../../api/axios';
import { USER } from '../../api/endpoints';

import UserList from './UserList';

const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.common.categories);
  const subCategories = useSelector((state) => state.common.subCategories);

  const [rawUsers, setRawUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOption, setSubCategoryOption] = useState([]);

  const [filterCategory, setFilterCategory] = useState();
  const [filterSubCategory, setFilterSubCategory] = useState();

  useEffect(() => {
    api.get(USER).then(({ data }) => {
      const filteredData = data.filter(({ role }) => role === 2);
      filteredData.sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
      setUsers(filteredData);

      setRawUsers(filteredData);
    });
  }, [setUsers, setRawUsers, dispatch]);

  useEffect(() => {
    setCategoryOptions(
      categories.map((c) => ({ key: c._id, text: c.name, value: c._id }))
    );
    setSubCategoryOption(
      subCategories.map((c) => ({ key: c._id, text: c.name, value: c._id }))
    );
  }, [categories, subCategories, setCategoryOptions, setSubCategoryOption]);

  const onCategorySelect = (_, { value }) => {
    setFilterCategory(value);
  };

  const onSubCategorySelect = (_, { value }) => {
    setFilterSubCategory(value);
  };

  const clearFilter = () => {
    setFilterCategory(null);
    setFilterSubCategory(null);
  };

  useEffect(() => {
    if (!filterCategory && !filterSubCategory) {
      setUsers(rawUsers);
    } else {
      let filteredUsers = rawUsers;
      if (filterCategory) {
        filteredUsers = filteredUsers.filter((u) => {
          return u.categoryIds.some((c) => c._id === filterCategory);
        });
      }
      if (filterSubCategory) {
        filteredUsers = filteredUsers.filter((u) => {
          return u.subCategoryIds.some((c) => c._id === filterSubCategory);
        });
      }
      setUsers(filteredUsers);
    }
  }, [filterCategory, filterSubCategory, setUsers, rawUsers]);

  return (
    <div>
      <div className="home-header">Users</div>
      <div className="home-filter">
        <div className="home-filter-dropdown">
          <Dropdown
            placeholder="Category"
            search
            selection
            value={filterCategory}
            options={categoryOptions}
            onChange={onCategorySelect}
          />
        </div>
        <div className="home-filter-dropdown">
          <Dropdown
            placeholder="Subcategory"
            search
            value={filterSubCategory}
            selection
            options={subCategoryOption}
            onChange={onSubCategorySelect}
          />
        </div>
        <div className="home-filter-dropdown">
          <Button onClick={clearFilter} color="blue">
            Clear
          </Button>
        </div>
      </div>
      <UserList users={users} />
    </div>
  );
};

export default Home;
