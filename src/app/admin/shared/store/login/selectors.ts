import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ILoginState } from "@app/shared/interfaces";
import { IAppState } from "@app/shared/types/appState.interface";

export const loginFeatureSelector = createFeatureSelector<IAppState, ILoginState>('login');

export const isSubmittingSelector = createSelector(
    loginFeatureSelector,
    (loginState: ILoginState) => loginState.isSubmitting
)