import React, { useEffect, useMemo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    postInfo,
    quotesSuccess,
    quotesFailure,
    imageLinkSuccess,
    imageLinkFailure,
    imageLinksConvert,
    generatedImageLinksSuccess,
    generatedImageLinksFailure,
    generatedImageLinksConvert,
    hashtagSuccess,
    hashtagFailure,
    resetQuotesLoaderFlag,
    resetImageLinksLoaderFlag,
    resetGeneratedImageLinksLoaderFlag,
    resetHashtagLoaderFlag
} from "./CustomPostSlice";
import DashboardNavbar from "../Common/DashboardNavbar";
import Footer from "../../Common/Footer";
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import StepFive from "./Steps/StepFive";
function CustomPost() {
    // eslint-disable-next-line react-hooks/exhaustive-deps -- required for webflow to work
    useMemo(() => {
        const WEBFLOW_PAGE_ID = '62e88b73fbcb3a42622e64de'
        const WEBFLOW_SITE_ID = '62c7a74dd5c3fb4c886564d2'

        var doc = document.getElementsByTagName("html")[0]
        doc.setAttribute('data-wf-page', WEBFLOW_PAGE_ID)
        doc.setAttribute('data-wf-site', WEBFLOW_SITE_ID)
    });

    /* required for webflow js file to work */
    useEffect(() => {
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
        window.Webflow && window.Webflow.require('ix2').init();
        document.dispatchEvent(new Event('readystatechange'))
    })

    const [tagLineI, setTagLine] = React.useState('');
    const [categoryI, setCategory] = React.useState('');
    const [postI, setPost] = React.useState('');
    const [mediaTypeI, setMediaType] = React.useState('');
    const [selectedQuoteI, setSelectedQuote] = React.useState('');
    const [urlI, setUrl] = React.useState('');
    const [step, setStep] = React.useState(1);
    const stepFiveTagLine = useRef("");

    const {
        category,
        tagline,
        post,
        mediaType,
        quotesSuccessFlag,
        imageLinksSuccessFlag,
        imageLinks,
        selectedQuote,
        selectedImageLink,
        generatedImageLinksSuccessFlag,
        generatedImageLinks,
        selectOneGeneratedImageLink,
        hashtagSuccessFlag,
        generatedImageLinksLoaderFlag,
        imageLinksLoaderFlag,
        quotesLoaderFlag
    } = useSelector(state => state.customPost);

    const dispatch = useDispatch();

    const incrementStep = () => {
        setStep(step + 1);
    };

    const decrementStep = () => {
        setStep(step - 1);
    }

    const tagLineHandler = (e) => {
        setTagLine(e.target.value)
    }
    const categoryHandler = (e) => {
        setCategory(e.target.value)
    }
    const postHandler = (e) => {
        setPost(e.target.value)
    }
    const mediaTypeHandler = (e) => {
        setMediaType(e.target.value)
    }

    console.log("step count" + step);

    const getQuotes = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var quoteData = {
            category: categoryI
        }
        let getQuotes = await axios.post(process.env.REACT_APP_BURL + '/quote/get_quote', quoteData, config, { withCredentials: true })
            .then(res => {
                dispatch(quotesSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(quotesFailure(err.message))
            })
    }, [dispatch, categoryI])

    const getImageLinks = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var imageData = {
            tag: tagLineI,
            type: postI
        }
        let getImageLinks = await axios.post(process.env.REACT_APP_BURL + '/image/generate_image', imageData, config, { withCredentials: true })
            .then(res => {
                dispatch(imageLinkSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(imageLinkFailure(err.message))
            })
    }, [dispatch, tagLineI, postI])

    const generateImages = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        setSelectedQuote(selectedQuote);
        setUrl(selectedImageLink)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var imageGenerateData = {
            quote: selectedQuote,
            p_name: sessionStorage.getItem('CompanyName'),
            url: selectedImageLink,
            type: postI
        }
        console.log(imageGenerateData)
        let generateImages = await axios.post(process.env.REACT_APP_BURL + '/image_post/generate', imageGenerateData, config, { withCredentials: true })
            .then(res => {
                dispatch(generatedImageLinksSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(generatedImageLinksFailure(err.message))
            })
    }, [dispatch, selectedQuote, selectedImageLink, postI])

    const getHashtags = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var hashtagsData = {
            tag: tagLineI,
        }
        let getHashtags = await axios.post(process.env.REACT_APP_BURL + '/ai/get_hashtags', hashtagsData, config, { withCredentials: true })
            .then(res => {
                dispatch(hashtagSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(hashtagFailure(err.message))
            })
    }, [dispatch, tagLineI])

    /* checking for input values and setting button flag */
    useEffect(() => {
        var button = document.getElementById('nextButton')
        if (tagLineI !== '' && categoryI !== '' && postI !== '' && mediaTypeI !== '') {
            button.style.display = 'block'
            button.classList.add("fadeIn")
        }
        else {
            button.style.display = 'none'
        }
        if (step === 2) {
            if (quotesSuccessFlag) {
                button.style.display = 'block'
                button.classList.add("fadeIn")
            }
            else {
                button.style.display = 'none'
            }
            if (!quotesLoaderFlag) {
                button.style.display = 'none'
            }
            else {
                button.style.display = 'block'
                button.classList.add("fadeIn")
            }
        }
        if (step === 3) {
            if (selectedImageLink === '') {
                button.style.display = 'none'
            }
            else {
                button.classList.add("fadeIn")
                button.style.display = 'block'
            }
        }
        if (step === 4) {
            if (selectOneGeneratedImageLink === '') {
                button.style.display = 'none'
            }
            else {
                button.classList.add("fadeIn")
                button.style.display = 'block'
            }
        }
    }, [tagLineI, categoryI, postI, mediaTypeI, step, selectedImageLink, selectOneGeneratedImageLink, quotesSuccessFlag, quotesLoaderFlag, imageLinksLoaderFlag, generatedImageLinksLoaderFlag])

    /* step-1 */
    useEffect(() => {
        if (step === 1) {
            stepFiveTagLine.current = tagline;
        }
    }, [step, tagline])

    /* step-2 */
    useEffect(() => {
        var data = {
            tagLine: tagLineI,
            category: categoryI,
            post: postI,
            mediaType: mediaTypeI
        }
        if (step === 2 && quotesSuccessFlag === false) {
            dispatch(postInfo(data));
            console.log(data)
            const quotes = getQuotes();
        }
    }, [dispatch, step, getQuotes, tagLineI, categoryI, postI, mediaTypeI, quotesSuccessFlag]);

    useEffect(() => {
        var data = {
            tagLine: tagLineI,
            category: categoryI,
            post: postI,
            mediaType: mediaTypeI
        }
        if (step === 2 && quotesSuccessFlag === true && categoryI !== category) {
            dispatch(resetQuotesLoaderFlag());
            dispatch(postInfo(data));
            console.log(data)
            const quotes = getQuotes();
        }
    }, [dispatch, step, getQuotes, tagLineI, categoryI, postI, mediaTypeI, quotesSuccessFlag, category]);

    /* step-3 */
    useEffect(() => {
        if (step === 3 && imageLinksSuccessFlag === false) {
            getImageLinks();
        }
    }, [step, getImageLinks, imageLinksSuccessFlag])

    useEffect(() => {
        var data = {
            tagLine: tagLineI,
            category: categoryI,
            post: postI,
            mediaType: mediaTypeI
        }
        if (step === 3 && imageLinksSuccessFlag === true && tagLineI !== tagline) {
            console.log(tagline + ' ' + tagLineI)
            dispatch(resetImageLinksLoaderFlag());
            dispatch(postInfo(data));
            getImageLinks();
        }
    }, [step, getImageLinks, imageLinksSuccessFlag, tagLineI, tagline, dispatch, categoryI, postI, mediaTypeI]);

    useEffect(() => {
        var data = {
            tagLine: tagLineI,
            category: categoryI,
            post: postI,
            mediaType: mediaTypeI
        }
        if (step === 3 && imageLinksSuccessFlag === true && postI !== post) {
            console.log(post + ' ' + postI)
            dispatch(resetImageLinksLoaderFlag());
            dispatch(postInfo(data));
            getImageLinks();
        }
    }, [step, getImageLinks, imageLinksSuccessFlag, postI, post, dispatch, categoryI, tagLineI, mediaTypeI]);

    /* step-4 */
    useEffect(() => {
        if (step === 4 && generatedImageLinksSuccessFlag === false) {
            generateImages()
        }
    }, [step, generateImages, generatedImageLinksSuccessFlag])

    useEffect(() => {
        if (step === 4 && generatedImageLinksSuccessFlag === true) {
            if (postI !== post || selectedQuoteI !== selectedQuote || urlI !== selectedImageLink) {
                dispatch(resetGeneratedImageLinksLoaderFlag());
                generateImages();
            }
        }
    }, [step, generateImages, generatedImageLinksSuccessFlag, postI, post, selectedQuoteI, selectedQuote, selectedImageLink, urlI, dispatch])

    /* step-5 */
    useEffect(() => {
        if (step === 5 && hashtagSuccessFlag === false) {
            getHashtags()
        }
    }, [step, getHashtags, hashtagSuccessFlag])

    useEffect(() => {
        var data = {
            tagLine: tagLineI,
            category: categoryI,
            post: postI,
            mediaType: mediaTypeI
        }
        if (step === 5 && tagline !== stepFiveTagLine) {
            console.log(stepFiveTagLine + ' ' + tagLineI)
            stepFiveTagLine.current = tagLineI;
            dispatch(resetHashtagLoaderFlag());
            dispatch(postInfo(data));
            getHashtags()
        }
    }, [step, getHashtags, hashtagSuccessFlag, tagLineI, tagline, dispatch, categoryI, postI, mediaTypeI]);

    /* convert image links list to dict */
    useEffect(() => {
        let imageList = imageLinks.image_list;
        if (imageLinksSuccessFlag) {
            let linkDict = {};
            let key = 0;
            linkDict = imageList.map(x => { return ({ src: x, width: 3, height: 2, key: (key++).toString() }) });
            dispatch(imageLinksConvert(linkDict));
        }
    }, [imageLinks, dispatch, imageLinksSuccessFlag])

    useEffect(() => {
        let generatedImageList = generatedImageLinks.data;
        if (generatedImageLinksSuccessFlag) {
            let linkDict = {};
            let key = 0;
            linkDict = generatedImageList.map(x => { return ({ src: x, key: (key++).toString() }) })
            dispatch(generatedImageLinksConvert(linkDict));
        }
    }, [generatedImageLinks, dispatch, generatedImageLinksSuccessFlag])

    return (
        <>
            <div className="body-5">
                <DashboardNavbar />
                <div className="form-full-3">
                    <div className="form-wrapper-2 w-form">
                        <form id="email-form" type="submit" name="email-form" data-name="Email Form" redirect="/success" data-redirect="/success" method="get">
                            <div data-delay={4000} data-animation="cross" className="slider-2 w-slider" data-autoplay="false" data-easing="ease" data-hide-arrows="true" data-disable-swipe="true" data-autoplay-limit={0} data-nav-spacing={3} data-duration={240} data-infinite="false">
                                <div className="mask-2 w-slider-mask">
                                    <StepOne tagLineHandler={tagLineHandler} categoryHandler={categoryHandler} postHandler={postHandler} mediaTypeHandler={mediaTypeHandler} />
                                    <StepTwo />
                                    <StepThree />
                                    <StepFour />
                                    <StepFive />
                                </div>
                                <div className="line-bottom" />
                                <div className="previous w-slider-arrow-left"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e8d55effdfd0_arrow.svg" alt="" className="arrow-2" />
                                    <div className="previous-button-2" onClick={decrementStep}>Previous</div>
                                </div>
                                <div className="next w-slider-arrow-right" type='submit'>
                                    <div id="nextButton" >
                                        <div className="next-button-2" onClick={incrementStep}>Next</div>
                                    </div>
                                </div>
                            </div>
                            {/*  <div className="mobile-nav-bottom" /> */}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CustomPost;