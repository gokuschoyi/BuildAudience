import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    isLoading: false,
    success: false,
    error: '',
    errorFlag: false
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginPending: (state) => {
            state.isLoading = true;
        },
        loginSuccess(state, action) {
            state.isLoading = false;
            state.success = true;
            state.userName = action.payload.display_name;
            state.error = '';
        },
        loginFailure(state, action) {
            state.isLoading = false;
            state.success = false;
            state.error = action.payload;
            state.errorFlag = true;
        },
        resetF(state) {
            state.errorFlag = false;
            state.error = '';
        }
    }
});

const { reducer, actions } = loginSlice;
export const { loginPending, loginSuccess, loginFailure, resetF } = actions;
export default reducer;