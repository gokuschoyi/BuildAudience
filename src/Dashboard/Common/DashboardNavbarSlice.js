import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userEmail: '',
    resetPasswordSuccess: false,
    resetPasswordError: false,
    resetPasswordPending: false,
    resetPasswordErrorMsg: '',
}

const DashboardNavbarSlice = createSlice({
    name: "resetPassword",
    initialState,
    reducers: {
        setResetEmail: (state, action) => {
            state.userEmail = action.payload
        },
        resetPasswordPending: (state) => {
            state.resetPasswordPending = true
        },
        resetPasswordSuccess: (state) => {
            state.resetPasswordSuccess = true
            state.resetPasswordError = false
            state.resetPasswordPending = false
        },
        resetPasswordError: (state, actions) => {
            state.resetPasswordError = true
            state.resetPasswordSuccess = false
            state.resetPasswordErrorMsg = actions.payload
        },
        resetPasswordReset: (state) => {
            state.resetPasswordError = false
            state.resetPasswordSuccess = false
            state.resetPasswordPending = false
            state.resetPasswordErrorMsg = ''
            state.userEmail = ''
        }
    }
});

const { reducer, actions } = DashboardNavbarSlice;
export const { setResetEmail, resetPasswordPending, resetPasswordSuccess, resetPasswordError, resetPasswordReset } = actions
export default reducer