import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { CATEGORY, SUB_CATEGORY } from '../../api/endpoints';

export const fetchCategories = createAsyncThunk(
  'common/fetchCategoryStatus',
  async () => {
    const response = await axios.get(CATEGORY)
    return response.data
  }
)

export const fetchSubCategories = createAsyncThunk(
  'common/fetchSubCategoryStatus',
  async () => {
    const response = await axios.get(SUB_CATEGORY)
    return response.data
  }
)

