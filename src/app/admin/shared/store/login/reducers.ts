import { Action, createReducer, on } from "@ngrx/store";

import { ILoginState } from "@app/shared/interfaces";
import { loginAction, loginFailureAction, loginSuccessAction } from "./actions";

const initialState: ILoginState = {
    isSubmitting: false,
    currentAdmin: null,
    isLoggedIn: null,
    validationErrors: null
}

const loginReducer = createReducer(
    initialState,
    on(
        loginAction,
        (state): ILoginState => ({
            ...state,
            isSubmitting: true,
            validationErrors: null
        })
    ),
    on(
        loginSuccessAction,
        (state, action): ILoginState => ({
            ...state,
            isSubmitting: false,
            isLoggedIn: true,
            currentAdmin: action
        })
    ),
    on(
        loginFailureAction,
        (state, action): ILoginState => ({
            ...state,
            isSubmitting: false,
            validationErrors: action
        })
    )
)

export function reducers(state: ILoginState, action: Action) {
    return loginReducer(state, action);
}