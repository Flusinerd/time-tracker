import { createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  isLoggedIn: boolean | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  picture?: string;
}

export const initialState: AuthState = {
  isLoggedIn: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.loginUser, (state, props) =>
    produce(state, (draft) => {
      draft.firstName = props.firstName;
      draft.lastName = props.lastName;
      draft.email = props.email;
      draft.picture = props.picture;
      draft.isLoggedIn = true;
    })
  ),
  on(AuthActions.logoutUser, (state) =>
    produce(state, (draft) => {
      draft.firstName = undefined;
      draft.lastName = undefined;
      draft.email = undefined;
      draft.picture = undefined;
      draft.isLoggedIn = false;
    })
  )
);
