import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { coreSlice } from './core/coreSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    core: coreSlice.reducer,
  },
});

export default store;
