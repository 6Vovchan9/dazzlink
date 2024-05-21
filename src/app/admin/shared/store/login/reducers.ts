import { Action, createReducer, on } from "@ngrx/store";

import { ILoginState } from "@app/shared/interfaces";
import { loginAction } from "./actions";

const initialState: ILoginState = {
    isSubmitting: false
}

const loginReducer = createReducer(
    initialState,
    on(
        loginAction,
        (state): ILoginState => ({
            ...state,
            isSubmitting: true
        })
    )
)

export function reducers(state: ILoginState, action: Action) {
    return loginReducer(state, action);
}