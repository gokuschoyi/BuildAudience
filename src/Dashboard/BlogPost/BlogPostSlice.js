import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogPostDescription: '',
    blogPostUrl: '',
    blogPostdata: '',
    blogPostSuccessFlag: false,
    blogPostError: '',
    blogPostErrorFlag: false,
    blogPostPendingFlag: false,
}

const BlogPostSlice = createSlice({
    name: "blogPost",
    initialState,
    reducers: {
        blogPostPending: (state) => {
            state.blogPostPendingFlag = true;
        },
        saveBlogPost: (state, action) => {
            state.blogPostDescription = action.payload.p_desc;
            state.blogPostUrl = action.payload.ref_url;
        },
        blogPostSuccess: (state, actions) => {
            state.blogPostPendingFlag = false;
            state.blogPostSuccessFlag = true;
            state.blogPostdata = actions.payload;
        },
        blogPostFailure: (state, actions) => {
            state.blogPostPendingFlag = false;
            state.blogPostSuccessFlag = false;
            state.blogPostError = actions.payload;
            state.blogPostErrorFlag = true;
        },
        blogPostReset: (state) => {
            state.blogPostPendingFlag = false;
            state.blogPostSuccessFlag = false;
            state.blogPostErrorFlag = false;
            state.blogPostError = '';
            state.blogPostdata = '';
            state.blogPostDescription = '';
            state.blogPostUrl = '';
        }
    }
});

const { reducer, actions } = BlogPostSlice;
export const {
    blogPostPending,
    saveBlogPost,
    blogPostSuccess,
    blogPostFailure,
    blogPostReset
} = actions;
export default reducer;