import axios from 'axios';
import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    saveProjectPending,
    saveProjectSuccess,
    saveProjectFailure
} from "../CustomPostSlice"
function StepFive(props) {

    const [postStyle, setPostStyle] = React.useState('')

    const {
        tagline,
        hashtag,
        selectedQuote,
        selectedQuoteAuthor,
        mediaType,
        selectOneGeneratedImageLink,
        post,
        hashtagLoaderFlag,
        saveProjectPendingFlag,
        saveProjectSuccessFlag
    } = useSelector(state => state.customPost);

    useMemo(() => {
        const facebookStyleClassName = {
            classname: 'col-12 col-sm-12 col-md-6 col-lg-6',
            height: 100 + '%',
        }
        const instagramStyleClassName = {
            classname: 'col-12 col-sm-12 col-md-6 col-lg-6',
            height: 65 + '%',
        }
        const storyStyleClassName = {
            classname: 'col-12 col-sm-12 col-md-6 col-lg-6',
            height: 37 + '%',
        }
        if (post === 'facebook') {
            setPostStyle(facebookStyleClassName)
        }
        if (post === 'instagram') {
            setPostStyle(instagramStyleClassName)
        }
        if (post === 'story') {
            setPostStyle(storyStyleClassName)
        }
    }, [post])

    const dispatch = useDispatch()

    const saveProject = useCallback(async () => {
        dispatch(saveProjectPending())
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        var projectData = {
            tag: tagline,
            p_name: sessionStorage.getItem('CompanyName'),
            hashtags: hashtag.hashtag,
            quote: selectedQuote,
            quote_author: selectedQuoteAuthor,
            media_type: mediaType,
            post_url: selectOneGeneratedImageLink,
            post_type: post
        }
        console.log(projectData)
        let saveProject = await axios.post(process.env.REACT_APP_BURL + '/user/save_project', projectData, config)
            .then(res => {
                dispatch(saveProjectSuccess(res.data))

            })
            .catch(err => {
                dispatch(saveProjectFailure(err))
            })
    }, [dispatch, hashtag, selectedQuote, selectedQuoteAuthor, mediaType, selectOneGeneratedImageLink, tagline, post])

    return (
        <div data-w-id="f2b31280-0b97-8741-e941-32cae7d4977d" className="slide-2 w-slide" id='stepFive'>
            {saveProjectPendingFlag ? <div className="d-flex justify-content-center" style={{ zIndex: '2', paddingTop: '200px' }}>
                <div className="spinner-border text-danger" role="status">
                    <span className="sr-only"></span>
                </div>
            </div> :
                <>
                    {saveProjectSuccessFlag === false ?
                        <div id="createPost">
                            <div className="slider-content-wrap">
                                <div className="form-content-3 final">
                                    <div style={{
                                        WebkitTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                                        MozTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                                        msTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                                        transform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', opacity: 0
                                    }} className="form-title-wrap-2">
                                        < div >
                                            <div className="row align-items-center" style={{ backgroundColor: 'transarent' }}>
                                                <div className={postStyle.classname}>
                                                    {/*  <div className="form-section-title-2">Create Post</div> */}
                                                    <p className="paragraph-3"><strong>{selectedQuote}</strong><br /></p>
                                                    {!hashtagLoaderFlag ? <div className="d-flex justify-content-center" style={{ zIndex: '2', paddingTop: '10px', paddingBottom: '10px' }}>
                                                        <div className="spinner-border text-danger" role="status">
                                                            <span className="sr-only"></span>
                                                        </div>
                                                    </div> : <p className="paragraph-3">{hashtag.hashtag}</p>}
                                                </div>
                                                <div className={postStyle.classname}>
                                                    <img
                                                        src={selectOneGeneratedImageLink}
                                                        alt="..."
                                                        style={{ width: postStyle.height }} />
                                                </div>
                                            </div>
                                        </div >
                                    </div>
                                    <div style={{ paddingTop: '35px' }}>
                                        <div className="submit-button-4 w-button" onClick={saveProject} >CREATE POST</div>
                                    </div>

                                </div>
                                <div style={{ opacity: 0 }} className="details-right"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e8f1dbffdfd6_6.svg" alt="CounterImage" className="counter-image" />
                                    <div className="text-counter">5 / 5</div>
                                </div>
                            </div>
                        </div> :
                        <div id="newPost" style={{ paddingTop: '210px', paddingBottom: '210px' }} >
                            <div className="slider-content-wrap">
                                <div className="submit-button-4 w-button" onClick={props.reset} >Create New Post</div>
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default StepFive