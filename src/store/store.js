import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'
import commonReducer from './common/commonSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer
  }
})

export default store;