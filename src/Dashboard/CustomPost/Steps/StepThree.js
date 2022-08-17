import React from 'react'
import PhotoGallery from '../PhotoGallery'
function StepThree() {
    return (
        <div data-w-id="f2b31280-0b97-8741-e941-32cae7d4974b" className="slide-2 w-slide" id='stepThree'>
            <div className="slider-content-wrap">
                <div className="form-content-3">
                    <div className="form-section-title-2">Select an Image</div>
                    <div className="div-block-15">
                        <div>
                            <input type="text" className="text-field-4 w-input" maxLength={256} name="field" data-name="Field" placeholder="Search Image" id="field" required />
                        </div>
                        <div>
                            <a href="!#" className="button-12 w-button">Search</a>
                        </div>
                    </div>
                    <div style={{ overflow: 'scroll', height: '400px' }}>
                        <PhotoGallery />
                    </div>
                    <div className="div-block-14">
                        <a href="!#" className="button-2 w-button">Load More</a>
                    </div>
                </div>
                <div className="details-right"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e820deffdfd8_3.svg" alt="counterImage" className="counter-image" />
                    <div className="text-counter">3 / 5</div>
                </div>
            </div>
        </div>
    )
}

export default StepThree