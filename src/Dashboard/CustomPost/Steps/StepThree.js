import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelectedImageLink } from '../CustomPostSlice'
function StepThree() {
    const { imageLinkDictFlag, imageLinkDict, imageLinksLoaderFlag } = useSelector(state => state.customPost)
    const dispatch = useDispatch()

    let galleryPhotos = [];
    if (imageLinkDictFlag) {
        galleryPhotos = JSON.parse(JSON.stringify(imageLinkDict));
        galleryPhotos.defaultForm = true;
    }
    const [selectedImg, setSelectedImg] = useState(galleryPhotos[0]);
    const handleOnClick = (e) => {
        setSelectedImg(e.target.src);
        dispatch(userSelectedImageLink(e.target.src))
        console.log(" link " + e.target.src)
    }

    return (
        <div data-w-id="f2b31280-0b97-8741-e941-32cae7d4974b" className="slide-2 w-slide" id='stepThree'>
            <div className="slider-content-wrap">
                <div className="form-content-3">
                    <div className="form-section-title-2">Select an Image</div>
                    <div className="div-block-15">
                        <div>
                            <input type="text" className="text-field-4 w-input" maxLength={256} name="field" data-name="Field" placeholder="Search Image" id="field" />
                        </div>
                        <div>
                            <button type="button" className="button-12 w-button">Search</button>
                        </div>
                    </div>
                    <div style={{ overflowY: 'scroll', height: '400px' }}>
                        <div>
                            {!imageLinksLoaderFlag ? <div className="d-flex justify-content-center" style={{ zIndex: '2', paddingTop: '20px' }}>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div> : <div className="container">
                                {galleryPhotos.map(photo => {
                                    return (
                                        <div key={photo.key}>
                                            <img
                                                style={{ border: selectedImg === photo.src ? "5px solid red" : "" }}
                                                src={photo.src}
                                                alt={photo.title}
                                                onClick={(e) => handleOnClick(e)}
                                            />
                                        </div>
                                    )
                                })
                                }
                            </div>}
                        </div>
                    </div>
                    {/* <div className="div-block-14">
                        <a href="!#" className="button-2 w-button">Load More</a>
                    </div> */}
                </div>
                <div className="details-right"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e820deffdfd8_3.svg" alt="counterImage" className="counter-image" />
                    <div className="text-counter">3 / 5</div>
                </div>
            </div>
        </div>
    )
}

export default StepThree