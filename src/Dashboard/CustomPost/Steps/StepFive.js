import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hashtagSuccess } from '../CustomPostSlice'
import DogImage from '../../../images/dog4.jpg';
function StepFive() {
    const dispatch = useDispatch();
    const { selectOneGeneratedImageLink, selectedQuote, hashtag } = useSelector(state => state.customPost);
    return (
        <div data-w-id="f2b31280-0b97-8741-e941-32cae7d4977d" className="slide-2 w-slide" id='stepFive'>
            <div className="slider-content-wrap">
                <div className="form-content-3 final">
                    <div style={{ WebkitTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', opacity: 0 }} className="form-title-wrap-2">
                        <div className="form-section-title-2">Create Post</div>
                        <p className="paragraph-3"><strong>{selectedQuote}</strong><br /></p>
                        <p className="paragraph-3">{hashtag.hashtag}<br /></p>
                        <div>
                            <img
                                src={selectOneGeneratedImageLink}
                                alt="..."
                                className="image-24" /></div>
                    </div>
                    <input type="submit" defaultValue="Save" data-wait="Working on that..." wait="Calculating Nash Equilibrium..." data-ix="show-content-onslide" className="submit-button-4 w-button" />
                </div>
                <div style={{ opacity: 0 }} className="title-left" />
                <div style={{ opacity: 0 }} className="details-right"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e8f1dbffdfd6_6.svg" alt="CounterImage" className="counter-image" />
                    <div className="text-counter">5 / 5</div>
                </div>
            </div>
        </div>
    )
}

export default StepFive