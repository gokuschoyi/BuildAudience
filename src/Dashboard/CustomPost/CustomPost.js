import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { postInfo, quotesPending, quotesSuccess, quotesFailure, imageLinkSuccess, imageLinkFailure, imageLinksConvert, generatedImageLinksSuccess, generatedImageLinksFailure, generatedImageLinksConvert, hashtagSuccess, hashtagFailure } from "./CustomPostSlice";
import DashboardNavbar from "../Common/DashboardNavbar";
import Footer from "../../Common/Footer";
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import StepFive from "./Steps/StepFive";
function CustomPost() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => {
        const WEBFLOW_PAGE_ID = '62e88b73fbcb3a42622e64de'
        const WEBFLOW_SITE_ID = '62c7a74dd5c3fb4c886564d2'

        var doc = document.getElementsByTagName("html")[0]
        doc.setAttribute('data-wf-page', WEBFLOW_PAGE_ID)
        doc.setAttribute('data-wf-site', WEBFLOW_SITE_ID)
    });

    useEffect(() => {
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
        window.Webflow && window.Webflow.require('ix2').init();
        document.dispatchEvent(new Event('readystatechange'))
    })

    const [tagLine, setTagLine] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [post, setPost] = React.useState('');
    const [mediaType, setMediaType] = React.useState('');
    const [step, setStep] = React.useState(1);
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

    const { isLoadingQoutes, quotesSuccessFlag, quotesError, quotesErrorFlag, imageLinksSuccessFlag, imageLinks, imageLinkDictFlag, imageLinkDict, selectedQuote, selectedImageLink, generatedImageLinksSuccessFlag, generatedImageLinksDictFlag, generatedImageLinks } = useSelector(state => state.customPost);
    const { companyName } = useSelector(state => state.login);

    const getQuotes = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var quoteData = {
            category: category
        }
        let getQuotes = await axios.post(process.env.REACT_APP_BURL + '/quote/get_quote', quoteData, config, { withCredentials: true })
            .then(res => {
                dispatch(quotesSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(quotesFailure(err.message))
            })
    }, [dispatch, category])

    const getImageLinks = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var imageData = {
            tag: tagLine,
            type: post
        }
        let getImageLinks = await axios.post(process.env.REACT_APP_BURL + '/image/generate_image', imageData, config, { withCredentials: true })
            .then(res => {
                dispatch(imageLinkSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(imageLinkFailure(err.message))
            })
    }, [dispatch, tagLine, post])

    const generateImages = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var imageGenerateData = {
            quote: selectedQuote,
            p_name: sessionStorage.getItem('CompanyName'),
            url: selectedImageLink,
            type: post
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
    }, [dispatch, selectedQuote, selectedImageLink, post])

    const getHashtags = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var hashtagsData = {
            tag: tagLine,
        }
        let getHashtags = await axios.post(process.env.REACT_APP_BURL + '/ai/get_hashtags', hashtagsData, config, { withCredentials: true })
            .then(res => {
                dispatch(hashtagSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(hashtagFailure(err.message))
            })
    }, [dispatch, tagLine])

    /* step-2 */
    useEffect(() => {
        var data = {
            tagLine: tagLine,
            category: category,
            post: post,
            mediaType: mediaType
        }
        if (step === 2) {
            dispatch(postInfo(data));
            console.log(data)
            const quotes = getQuotes();
            console.log(quotes);
        }
    }, [dispatch, step, getQuotes, tagLine, category, post, mediaType])

    /* step-3 */
    useEffect(() => {
        if (step === 3) {
            const imageLinksList = getImageLinks();
        }
    }, [step, getImageLinks])

    /* step-4 */
    useEffect(() => {
        if (step === 4) {
            const generatedImageLinks = generateImages()
        }
    }, [step, generateImages])

    /* step-5 */
    useEffect(() => {
        if (step === 5) {
            const fetchHashtags = getHashtags()
        }
    }, [step, getHashtags])

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
                                <div className="next w-slider-arrow-right">
                                    <div className="next-button-2" onClick={incrementStep}>Next</div>
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