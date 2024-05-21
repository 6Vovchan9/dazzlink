import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypes';
import { IAdminData } from '@app/shared/interfaces';

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<IAdminData>()
);