import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    userSelectedImageLink,
    searchImagesSuccess,
    searchImagesFailure,
    searchLinksConvert,
    resetImageLinksLoaderFlag
} from '../CustomPostSlice'
import axios from "axios";
function StepThree() {
    const {
        imageLinkDictFlag,
        imageLinkDict,
        imageLinksLoaderFlag,
        post,
        searchImagesSuccessFlag,
        searchImages,
        searchLinksDict } = useSelector(state => state.customPost)
    const dispatch = useDispatch()

    let galleryPhotos = [];
    if (imageLinkDictFlag) {
        galleryPhotos = JSON.parse(JSON.stringify(imageLinkDict));
        galleryPhotos.defaultForm = true;
    }

    if (searchLinksDict) {
        galleryPhotos = JSON.parse(JSON.stringify(searchLinksDict));
        galleryPhotos.defaultForm = false;
    }
    const [selectedImg, setSelectedImg] = useState(galleryPhotos[0]);
    const handleOnClick = (e) => {
        setSelectedImg(e.target.src);
        dispatch(userSelectedImageLink(e.target.src))
        console.log(" link " + e.target.src)
    }

    const [searchQuery, setSearchQuery] = useState("");
    const searchQueryHandler = (e) => {
        setSearchQuery(e.target.value);
    }

    const submitSearchQuery = () => {
        getQueryImageLinks();
    }

    const getQueryImageLinks = useCallback(async () => {
        dispatch(resetImageLinksLoaderFlag())
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var queryData = {
            query: searchQuery,
            type: post
        }
        let getImageLinks = await axios.post(process.env.REACT_APP_BURL + '/image/query_images', queryData, config, { withCredentials: true })
            .then(res => {
                dispatch(searchImagesSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(searchImagesFailure(err.message))
            })
    }, [searchQuery, post, dispatch])

    useEffect(() => {
        if (searchImagesSuccessFlag) {
            let searchList = searchImages.image_list
            let searchListDict = {};
            let key = 0;
            searchListDict = searchList.map(x => { return ({ src: x, key: (key++).toString() }) })
            dispatch(searchLinksConvert(searchListDict))

        }
    }, [searchImagesSuccessFlag, searchImages, dispatch])

    return (
        <div data-w-id="f2b31280-0b97-8741-e941-32cae7d4974b" className="slide-2 w-slide" id='stepThree'>
            <div className="slider-content-wrap">
                <div className="form-content-3">
                    <div className="form-section-title-2">Select an Image</div>
                    <div className="div-block-15">
                        <div>
                            <input type="text" onChange={searchQueryHandler} className="text-field-4 w-input" maxLength={256} name="field" data-name="Field" placeholder="Search Image" id="field" />
                        </div>
                        <div>
                            <button type="button" onClick={submitSearchQuery} className="next-button-2 w-button">Search</button>
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