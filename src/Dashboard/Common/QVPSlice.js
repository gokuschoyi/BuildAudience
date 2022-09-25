import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    qvpProjectVideoFlag: false,
    qvpUid: '',
    qvpData: '',
    qvpStatus: 'Running',
    saveQvpFlag: false,
}

const QVPSlice = createSlice({
    name: "qvp",
    initialState,
    reducers: {
        saveQVPData: (state, action) => {
            state.qvpData = action.payload;
        },
        saveQVPFlag: (state, action) => {
            state.qvpProjectVideoFlag = true;
            state.saveQvpFlag = true;
            state.qvpUid = action.payload;
        },
        setQVPStatusFlag: (state, action) => {
            state.qvpStatus = action.payload;
        },
        resetQvpSaveFlag: (state) => {
            state.saveQvpFlag = false;
        },
        resetQVPSlice: () => {
            return initialState;
        }
    }
});

const { reducer, actions } = QVPSlice;

export const { saveQVPFlag, saveQVPData, resetQVPSlice, resetQvpSaveFlag, setQVPStatusFlag } = actions;

export default reducer;