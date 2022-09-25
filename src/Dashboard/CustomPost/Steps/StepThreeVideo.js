import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    userSelectedVideoLink,
    searchVideosSuccess,
    searchVideosFailure,
    searchVideosLinksConvert,
    resetVideoLinksLoaderFlag
} from '../CustomPostSlice'
import axios from "axios";
function StepThreeVideo() {
    const {
        videoLinkDictFlag,
        videoLinkDict,
        videoLinksLoaderFlag,
        post,
        searchVideosSuccessFlag,
        searchVideos,
        searchLinksVideoDict } = useSelector(state => state.customPost)
    const dispatch = useDispatch()

    let galleryVideos = [];
    if (videoLinkDictFlag) {
        galleryVideos = JSON.parse(JSON.stringify(videoLinkDict));
        galleryVideos.defaultForm = true;
    }

    if (searchLinksVideoDict) {
        galleryVideos = JSON.parse(JSON.stringify(searchLinksVideoDict));
        galleryVideos.defaultForm = false;
    }
    const [selectedVideo, setSelectedVideo] = useState(galleryVideos[0]);
    const handleOnClick = (e) => {
        setSelectedVideo(e.target.value);
        dispatch(userSelectedVideoLink(e.target.value))
        console.log(" link " + selectedVideo)
    }

    const [searchQuery, setSearchQuery] = useState("");
    const searchQueryHandler = (e) => {
        setSearchQuery(e.target.value);
    }

    const submitSearchQuery = () => {
        getQueryVideoLinks();
    }

    const getQueryVideoLinks = useCallback(async () => {
        dispatch(resetVideoLinksLoaderFlag())
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var queryData = {
            query: searchQuery,
            type: post
        }
        let getImageLinks = await axios.post(process.env.REACT_APP_BURL + '/video/query_videos', queryData, config, { withCredentials: true })
            .then(res => {
                dispatch(searchVideosSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(searchVideosFailure(err.message))
            })
    }, [searchQuery, post, dispatch])

    useEffect(() => {
        if (searchVideosSuccessFlag) {
            let searchList = searchVideos.video_list
            let searchListDict = {};
            let key = 0;
            searchListDict = searchList.map(x => { return ({ src: x, key: (key++).toString() }) })
            dispatch(searchVideosLinksConvert(searchListDict))

        }
    }, [searchVideosSuccessFlag, searchVideos, dispatch])

    return (
        <div data-w-id="f2b31280-0b97-8741-e941-32cae7d4974b" className="slide-2 w-slide" id='stepThree'>
            <div className="slider-content-wrap">
                <div className="form-content-3">
                    <div className="form-section-title-2">Select a Video</div>
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
                            {!videoLinksLoaderFlag ? <div className="d-flex justify-content-center" style={{ zIndex: '2', paddingTop: '20px' }}>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div> : <div className="container">
                                {galleryVideos.map(video => {
                                    return (
                                        <div className="card" key={video.key} style={{ border: selectedVideo === video.src ? "5px solid black" : "" }}>
                                            <video src={video.src} controls type="video/mp4" style={{ padding: '15px' }}></video>
                                            <div className="card-body">
                                                <button type='button' onClick={(e) => handleOnClick(e)} value={video.src} className='btn'>Select Video</button>
                                            </div>
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

export default StepThreeVideo