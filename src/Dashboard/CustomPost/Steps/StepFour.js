import React from 'react'
import FinalPhotoGallery from '../FinalPhotoGallery'
function StepFour() {
    return (
        <div data-w-id="f2b31280-0b97-8741-e941-32cae7d49763" className="slide-2 w-slide" id='stepFour'>
            <div className="slider-content-wrap">
                <div className="form-content-3">
                    <div className="form-title-wrap-2">
                        <div className="form-section-title-2">Posts</div>
                        <p className="paragraph-3">doggo<br /></p>
                        <div>Select an Image to generate your post</div>
                    </div>
                    <div style={{ overflow: 'scroll', height: '400px' }}>
                        <FinalPhotoGallery />
                    </div>
                </div>
                <div className="details-right"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e86aaeffdfd7_4.svg" alt="imageCounter" className="counter-image" />
                    <div className="text-counter">4 / 5</div>
                </div>
            </div>
        </div>
    )
}

export default StepFour