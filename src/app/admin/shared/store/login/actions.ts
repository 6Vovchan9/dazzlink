import { createAction, props } from '@ngrx/store';

import { ActionTypes } from './actionTypes';
import { IAdminData, IFbAuthError, IFbAuthResponse } from '@app/shared/interfaces';

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<IAdminData>()
);

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<IFbAuthResponse>()
);

export const loginFailureAction = createAction(
    ActionTypes.LOGIN_FAILURE,
    props<IFbAuthError>()
);