import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emailR: '',
    isLoading: false,
    success: false,
    error: '',
    errorFlag: false
}

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {
        forgotPasswordPending: (state) => {
            state.isLoading = true
        },
        forgotPasswordSuccess: (state) => {
            state.isLoading = false
            state.success = true
            state.error = ''
        },
        forgotPasswordFailure: (state, action) => {
            state.isLoading = false
            state.success = false
            state.error = action.payload
            state.errorFlag = true
        },
        userInfo: (state, action) => {
            state.emailR = action.payload
        },
        resetF(state) {
            state.errorFlag = false
            state.error = ''
        }

    }
});

const { reducer, actions } = forgotPasswordSlice;
export const { forgotPasswordPending, forgotPasswordSuccess, forgotPasswordFailure, userInfo, resetF } = actions;
export default reducer;