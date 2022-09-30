import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notiData: '',
}

const NotificationSlice = createSlice({
    name: "NotificationHistory",
    initialState,
    reducers: {
        saveNotificationData: (state, action) => {
            state.notiData = action.payload;
        },
        resetNotifiacationHistory: () => {
            return initialState;
        }
    }
});

const { reducer, actions } = NotificationSlice;

export const { saveNotificationData, resetNotifiacationHistory } = actions;

export default reducer;