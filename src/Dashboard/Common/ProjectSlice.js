import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allProjectData: ''
}

const ProjectSlice = createSlice({
    name: "allProjects",
    initialState,
    reducers: {
        saveAllProjectData: (state, action) => {
            state.allProjectData = action.payload;
        },
        resetProjectSlice: () => {
            return initialState;
        }
    }
});

const { reducer, actions } = ProjectSlice;

export const { saveAllProjectData, resetProjectSlice } = actions;

export default reducer;