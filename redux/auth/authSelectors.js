export const authErrorSelector = state => state.app.authError;
export const isLoggedInSelector = state => state.auth.isLoggedIn;

export const userIdSelector = state => state.auth.userData.userId;
export const userNameSelector = state => state.auth.userData.name;
export const userAvatarSelector = state => state.auth.userData.avatar;
