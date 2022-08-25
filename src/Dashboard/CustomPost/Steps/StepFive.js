import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
function StepFive() {


    const [postStyle, setPostStyle] = React.useState('')

    const { selectOneGeneratedImageLink, selectedQuote, hashtag, hashtagSuccessFlag, post } = useSelector(state => state.customPost);

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

    return (
        <div data-w-id="f2b31280-0b97-8741-e941-32cae7d4977d" className="slide-2 w-slide" id='stepFive'>
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
                                    {!hashtagSuccessFlag ? <div className="d-flex justify-content-center" style={{ zIndex: '2', paddingTop: '10px', paddingBottom: '10px' }}>
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
                    <div className="submit-button-4 w-button" >CREATE POST</div>
                    {/*                     <input type="submit" defaultValue="Save" data-wait="Working on that..." wait="Calculating Nash Equilibrium..." data-ix="show-content-onslide" className="submit-button-4 w-button" />
 */}                </div>
                <div style={{ opacity: 0 }} className="details-right"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e8f1dbffdfd6_6.svg" alt="CounterImage" className="counter-image" />
                    <div className="text-counter">5 / 5</div>
                </div>
            </div>
        </div>
    )
}

export default StepFive