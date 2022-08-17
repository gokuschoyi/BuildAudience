import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tagline: '',
    category: '',
    post: '',
    mediaType: '',
    quotes: [],
    isLoadingQoutes: false,
    quotesSuccess: false,
    quotesError: '',
    quotesErrorFlag: false,
}

const quotesSlice = createSlice({
    name: "quotes",
    initialState,
    reducers: {
        postInfo: (state, action) => {
            state.tagline = action.payload.tagline;
            state.category = action.payload.category;
            state.post = action.payload.post;
            state.mediaType = action.payload.mediaType;
        },
        quotesPending: (state) => {
            state.isLoadingQoutes = true;
        },
        quotesSuccess(state, action) {
            state.isLoadingQoutes = false;
            state.quotesSuccess = true;
            state.quotes = action.payload;
            state.quotesError = '';
            state.quotesErrorFlag = false;
        },
        quotesFailure(state, action) {
            state.isLoadingQoutes = false;
            state.quotesSuccess = false;
            state.quotesError = action.payload;
            state.quotesErrorFlag = true;
        }
    }
});

const { reducer, actions } = quotesSlice;
export const { postInfo, quotesPending, quotesSuccess, quotesFailure } = actions;
export default reducer;