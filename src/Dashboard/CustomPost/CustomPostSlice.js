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

    searchImages: '',
    searchImagesSuccessFlag: false,
    searchImagesError: '',
    searchImagesErrorFlag: false,
    searchImagesLoaderFlag: false,
    searchLinksDict: '',

    videoLinks: '',
    videoLinkDict: '',
    videoLinkDictFlag: false,
    videoLinksSuccessFlag: false,
    videoLinksError: '',
    videoLinksErrorFlag: false,
    videoLinksLoaderFlag: false,

    searchVideos: '',
    searchVideosSuccessFlag: false,
    searchVideosError: '',
    searchVideosErrorFlag: false,
    searchVideosLoaderFlag: false,
    searchLinksVideoDict: '',

    selectedImageLink: '',
    selectedVideoLink: '',

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

    saveProjectSuccessFlag: false,
    saveProjectNotificationFlag: false,
    saveProjectError: '',
    saveProjectErrorFlag: false,
    saveProjectPendingFlag: false,
}

const quotesSlice = createSlice({
    name: "customPost",
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
        videoLinkSuccess(state, action) {
            state.videoLinksSuccessFlag = true;
            state.videoLinks = action.payload;
            state.videoLinksLoaderFlag = true;
        },
        resetVideoLinksLoaderFlag: (state) => {
            state.videoLinksLoaderFlag = false;
            state.selectedVideoLink = '';
        },
        videoLinkFailure(state, action) {
            state.videoLinksSuccessFlag = false;
            state.videoLinksError = action.payload;
            state.videoLinksErrorFlag = true;
        },
        videoLinksConvert(state, action) {
            state.videoLinkDict = action.payload;
            state.videoLinkDictFlag = true;
        },
        userSelectedVideoLink(state, action) {
            state.selectedVideoLink = action.payload;
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
        },
        searchImagesSuccess(state, action) {
            state.searchImagesSuccessFlag = true;
            state.searchImages = action.payload;
            state.searchImagesLoaderFlag = true;
        },
        searchLinksConvert(state, action) {
            state.searchLinksDict = action.payload;
            state.imageLinksLoaderFlag = true;
        },
        resetSearchImagesLoaderFlag: (state) => {
            state.searchImagesLoaderFlag = false;
        },
        searchImagesFailure(state, action) {
            state.searchImagesSuccessFlag = false;
            state.searchImagesError = action.payload;
            state.searchImagesErrorFlag = true;
        },
        searchVideosSuccess(state, action) {
            state.searchVideosSuccessFlag = true;
            state.searchVideos = action.payload;
            state.searchVideosLoaderFlag = true;
        },
        searchVideosLinksConvert(state, action) {
            state.searchLinksVideoDict = action.payload;
            state.videoLinksLoaderFlag = true;
        },
        resetSearchVideosLoaderFlag: (state) => {
            state.searchVideosLoaderFlag = false;
        },
        searchVideosFailure(state, action) {
            state.searchVideosSuccessFlag = false;
            state.searchVideosError = action.payload;
            state.searchVideosErrorFlag = true;
        },
        saveProjectPending: (state) => {
            state.saveProjectPendingFlag = true;
            state.saveProjectSuccessFlag = false;
        },
        saveProjectSuccess: (state) => {
            state.saveProjectSuccessFlag = true;
            state.saveProjectNotificationFlag = true;
            state.saveProjectPendingFlag = false;
        },
        saveProjectFailure: (state, action) => {
            state.saveProjectError = action.payload;
            state.saveProjectErrorFlag = true;
            state.saveProjectPendingFlag = false;
        },
        resetSaveProjectSuccessFlag: (state) => {
            state.saveProjectNotificationFlag = false;
        },
        resetCustomPostSlice: () => {
            return initialState;
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
    videoLinkSuccess,
    videoLinkFailure,
    videoLinksConvert,
    userSelectedImageLink,
    userSelectedVideoLink,
    generatedImageLinksSuccess,
    generatedImageLinksFailure,
    userSelectedGeneratedLink,
    generatedImageLinksConvert,
    hashtagSuccess,
    hashtagFailure,
    resetQuotesLoaderFlag,
    resetImageLinksLoaderFlag,
    resetVideoLinksLoaderFlag,
    resetGeneratedImageLinksLoaderFlag,
    resetHashtagLoaderFlag,
    searchImagesSuccess,
    resetSearchImagesLoaderFlag,
    searchImagesFailure,
    searchLinksConvert,
    searchVideosSuccess,
    searchVideosLinksConvert,
    resetSearchVideosLoaderFlag,
    searchVideosFailure,
    saveProjectPending,
    saveProjectSuccess,
    resetSaveProjectSuccessFlag,
    saveProjectFailure,
    resetCustomPostSlice,
    saveProjectVideoFlag
} = actions;
export default reducer;