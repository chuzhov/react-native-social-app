export const authErrorSelector = state => state.auth.authError;
export const isLoggedInSelector = state => state.auth.isLoggedIn;
export const isFetchingUserDataSelector = state => state.auth.isUserFetching;

export const userIdSelector = state => state.auth.userData.userId;
export const userNameSelector = state => state.auth.userData.name;
export const userEmailSelector = state => state.auth.userData.email;
export const userAvatarSelector = state => state.auth.userData.avatar;
