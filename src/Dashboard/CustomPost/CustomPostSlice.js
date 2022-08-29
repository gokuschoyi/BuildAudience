import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tagline: '',
    category: '',
    post: '',
    mediaType: '',
    quotes: '',

    isLoadingQoutes: false,
    quotesSuccessFlag: false,
    quotesError: '',
    quotesErrorFlag: false,
    quotesLoaderFlag: false,

    selectedQuote: '',
    selectedQuoteAuthor: '',

    imageLinks: '',
    imageLinkDict: '',
    imageLinkDictFlag: false,
    imageLinksSuccessFlag: false,
    imageLinksError: '',
    imageLinksErrorFlag: false,
    imageLinksLoaderFlag: false,

    selectedImageLink: '',

    generatedImageLinks: '',
    generatedImageLinksDict: '',
    generatedImageLinksDictFlag: false,
    generatedImageLinksSuccessFlag: false,
    generatedImageLinksError: '',
    generatedImageLinksErrorFlag: false,
    generatedImageLinksLoaderFlag: false,

    selectOneGeneratedImageLink: '',

    hashtag: '',
    hashtagSuccessFlag: false,
    hashtagError: '',
    hashtagErrorFlag: false,
    hashtagLoaderFlag: false,
}

const quotesSlice = createSlice({
    name: "quotes",
    initialState,
    reducers: {
        postInfo: (state, action) => {
            state.tagline = action.payload.tagLine;
            state.category = action.payload.category;
            state.post = action.payload.post;
            state.mediaType = action.payload.mediaType;
        },
        quotesPending: (state) => {
            state.isLoadingQoutes = true;
        },
        quotesSuccess(state, action) {
            state.isLoadingQoutes = false;
            state.quotesSuccessFlag = true;
            state.quotes = action.payload;
            state.quotesLoaderFlag = true;
        },
        resetQuotesLoaderFlag: (state) => {
            state.quotesLoaderFlag = false;
        },
        quotesFailure(state, action) {
            state.isLoadingQoutes = false;
            state.quotesSuccessFlag = false;
            state.quotesError = action.payload;
            state.quotesErrorFlag = true;
        },
        userSelectedQuote(state, action) {
            state.selectedQuote = action.payload.quote;
            state.selectedQuoteAuthor = action.payload.author;
        },
        imageLinkSuccess(state, action) {
            state.imageLinksSuccessFlag = true;
            state.imageLinks = action.payload;
            state.imageLinksLoaderFlag = true;
        },
        resetImageLinksLoaderFlag: (state) => {
            state.imageLinksLoaderFlag = false;
            state.selectedImageLink = '';
        },
        imageLinkFailure(state, action) {
            state.imageLinksSuccessFlag = false;
            state.imageLinksError = action.payload;
            state.imageLinksErrorFlag = true;
        },
        imageLinksConvert(state, action) {
            state.imageLinkDict = action.payload;
            state.imageLinkDictFlag = true;

        },
        userSelectedImageLink(state, action) {
            state.selectedImageLink = action.payload;
        },
        generatedImageLinksSuccess(state, action) {
            state.generatedImageLinksSuccessFlag = true;
            state.generatedImageLinks = action.payload;
        },
        resetGeneratedImageLinksLoaderFlag: (state) => {
            state.generatedImageLinksLoaderFlag = false;
            state.selectOneGeneratedImageLink = '';
        },
        generatedImageLinksFailure(state, action) {
            state.generatedImageLinksSuccessFlag = false;
            state.generatedImageLinksError = action.payload;
            state.generatedImageLinksErrorFlag = true;
        },
        generatedImageLinksConvert(state, action) {
            state.generatedImageLinksDict = action.payload;
            state.generatedImageLinksDictFlag = true;
            state.generatedImageLinksLoaderFlag = true;
        },
        userSelectedGeneratedLink(state, action) {
            state.selectOneGeneratedImageLink = action.payload;
        },
        hashtagSuccess(state, action) {
            state.hashtag = action.payload;
            state.hashtagSuccessFlag = true;
            state.hashtagLoaderFlag = true;
        },
        resetHashtagLoaderFlag: (state) => {
            state.hashtagLoaderFlag = false;
        },
        hashtagFailure(state, action) {
            state.hashtagSuccessFlag = false;
            state.hashtagError = action.payload;
            state.hashtagErrorFlag = true;
        }
    }
});

const { reducer, actions } = quotesSlice;
export const {
    postInfo,
    quotesPending,
    quotesSuccess,
    quotesFailure,
    userSelectedQuote,
    imageLinkSuccess,
    imageLinkFailure,
    imageLinksConvert,
    userSelectedImageLink,
    generatedImageLinksSuccess,
    generatedImageLinksFailure,
    userSelectedGeneratedLink,
    generatedImageLinksConvert,
    hashtagSuccess,
    hashtagFailure,
    resetQuotesLoaderFlag,
    resetImageLinksLoaderFlag,
    resetGeneratedImageLinksLoaderFlag,
    resetHashtagLoaderFlag
} = actions;
export default reducer;