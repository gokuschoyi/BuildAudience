import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelectedGeneratedLink } from '../CustomPostSlice'
function StepFour() {
    const dispatch = useDispatch();
    const { generatedImageLinksDictFlag, generatedImageLinksDict, tagline } = useSelector(state => state.customPost);

    let generatedPhotos = [];
    if (generatedImageLinksDictFlag) {
        generatedPhotos = JSON.parse(JSON.stringify(generatedImageLinksDict));
        generatedPhotos.defaultForm = true;
    }

    const [selectedImg, setSelectedImg] = useState(generatedPhotos[0]);
    const handleOnClick = (e) => {
        setSelectedImg(e.target.src);
        dispatch(userSelectedGeneratedLink(e.target.src))
        console.log(" link " + e.target.src)
    }

    return (
        <div data-w-id="f2b31280-0b97-8741-e941-32cae7d49763" className="slide-2 w-slide" id='stepFour'>
            <div className="slider-content-wrap" >
                <div className="form-content-3" >
                    <div className="form-title-wrap-2">
                        {!generatedImageLinksDictFlag ?
                            <div className="form-section-title-2">Generating Posts</div> :
                            <div className="form-section-title-2">Select an Image</div>}
                        <p className="paragraph-3">{tagline}<br /></p>
                    </div>
                    <div >
                        {!generatedImageLinksDictFlag ? <div className="d-flex justify-content-center" style={{ zIndex: '2', paddingTop: '20px' }}>
                            <div className="spinner-border text-danger" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div> :
                            <div className="container1">
                                <div id="carouselExampleControls" className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="false">
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                                        <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to={1} aria-label="Slide 2" />
                                        <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to={2} aria-label="Slide 3" />
                                    </div>
                                    <div className="carousel-inner carouselInner">
                                        <div className="carousel-item active" >
                                            <img
                                                src={generatedPhotos[0].src}
                                                className="image1"
                                                alt="..."
                                                key={generatedPhotos[0].key}
                                                onClick={handleOnClick}
                                                style={{ border: selectedImg === generatedPhotos[0].src ? "5px solid red" : "" }}
                                            />
                                        </div>
                                        <div className="carousel-item" >
                                            <img
                                                src={generatedPhotos[1].src}
                                                className="image1"
                                                alt="..."
                                                key={generatedPhotos[1].key}
                                                onClick={handleOnClick}
                                                style={{ border: selectedImg === generatedPhotos[1].src ? "5px solid red" : "" }}
                                            />
                                        </div>
                                        <div className="carousel-item" >
                                            <img
                                                src={generatedPhotos[2].src}
                                                className="image1"
                                                alt="..."
                                                key={generatedPhotos[2].key}
                                                onClick={handleOnClick}
                                                style={{ border: selectedImg === generatedPhotos[2].src ? "5px solid red" : "" }}
                                            />
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true" />
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                    <div className="carousel-indicators">
                                        <button aria-label="Slide 1" className="active" data-bs-slide-to={0} data-bs-target="#carouselExampleControls" type="button">
                                            <img
                                                className="img-fluid"
                                                src={generatedPhotos[0].src}
                                                alt="..." />
                                        </button>
                                        <button aria-label="Slide 2" data-bs-slide-to={1} data-bs-target="#carouselExampleControls" type="button">
                                            <img
                                                className="img-fluid"
                                                src={generatedPhotos[1].src}
                                                alt="..." />
                                        </button>
                                        <button aria-label="Slide 3" data-bs-slide-to={2} data-bs-target="#carouselExampleControls" type="button">
                                            <img
                                                className="img-fluid"
                                                src={generatedPhotos[2].src}
                                                alt="..." />
                                        </button>
                                    </div>
                                </div>

                            </div>}
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