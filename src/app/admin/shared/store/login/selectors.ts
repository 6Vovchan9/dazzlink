import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ILoginState } from "@app/shared/interfaces";

export const loginFeatureSelector = createFeatureSelector<ILoginState>('login');

export const isSubmittingSelector = createSelector(
    loginFeatureSelector,
    (loginState: ILoginState) => loginState.isSubmitting
)

export const validationErrorsSelector = createSelector(
    loginFeatureSelector,
    (loginState: ILoginState) => {
        return loginState.validationErrors;
    }
)