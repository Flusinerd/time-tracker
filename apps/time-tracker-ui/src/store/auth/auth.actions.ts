import { createAction, props } from '@ngrx/store';

export const loginUser = createAction(
  '[Auth] Login User',
  props<{
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
  }>()
);

export const logoutUser = createAction('[Auth] Logout User');

export const refreshToken = createAction('[Auth] Refresh Token');
