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
        rPasswordPending: (state) => {
            state.resetPasswordPending = true
        },
        rPasswordSuccess: (state) => {
            state.resetPasswordSuccess = true
            state.resetPasswordError = false
            state.resetPasswordPending = false
        },
        rPasswordError: (state, actions) => {
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
export const { setResetEmail, rPasswordPending, rPasswordSuccess, rPasswordError, resetPasswordReset } = actions
export default reducer