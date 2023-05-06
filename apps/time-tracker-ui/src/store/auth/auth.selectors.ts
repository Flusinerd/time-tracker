import { AppState } from '..';

export const selectUser = (state: AppState) => ({
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
  email: state.auth.email,
  picture: state.auth.picture,
});

export const selectIsLoggedIn = (state: AppState) => state.auth.isLoggedIn;
