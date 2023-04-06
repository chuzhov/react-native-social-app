import { useSelector } from 'react-redux';

export const isLoggedInSelector = state => state.auth.isLoggedIn;
export const userIdSelector = state => state.auth.userData.userId;
export const authErrorSelector = state => state.app.authError;
