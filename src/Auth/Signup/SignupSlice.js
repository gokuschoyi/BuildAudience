import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    name: '',
    companyName: '',
    SignupIsLoading: false,
    SignupSuccess: false,
    SignupError: '',
    error: false
}

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {
        signupPending: (state) => {
            state.SignupIsLoading = true;
            state.SignupSuccess = false;
            state.SignupError = '';
            state.error = false;
        },
        signupSuccess: (state) => {
            state.SignupIsLoading = false;
            state.SignupSuccess = true;
            state.SignupError = '';
        },
        signupFailure: (state, action) => {
            state.SignupIsLoading = false;
            state.SignupError = action.payload;
            state.error = true;
        },
        userInfo: (state, action) => {
            state.companyName = action.payload.company_name;
            state.email = action.payload.email;
            state.name = action.payload.display_name;
        },
        resetF(state) {
            state.errorFlag = false;
            state.error = '';
        }
    }
});

const { reducer, actions } = signupSlice;
export const { signupPending, signupSuccess, signupFailure, userInfo, resetF } = actions;
export default reducer;