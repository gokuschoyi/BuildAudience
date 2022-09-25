import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    saveProjectVideoFlag: false,
    videoProjectUid: '',
    projectData: '',
    videoProjectFlag: 'Running'
}

const VideoPostStatusSlice = createSlice({
    name: "videoPostStatus",
    initialState,
    reducers: {
        saveProjectData: (state, action) => {
            state.projectData = action.payload;
        },
        saveProjectVideoFlag: (state, action) => {
            state.saveProjectVideoFlag = true;
            state.videoProjectUid = action.payload;
        },
        setStatusFlag: (state, action) => {
            state.videoProjectFlag = action.payload;
        },
        resetProjectVideoSlice: (state) => {
            return initialState;
        }
    }
});

const { reducer, actions } = VideoPostStatusSlice;

export const { saveProjectVideoFlag, saveProjectData, resetProjectVideoSlice, setStatusFlag } = actions;

export default reducer;