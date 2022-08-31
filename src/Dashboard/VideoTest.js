import React, { useCallback, useEffect, useState } from 'react'
import axios from "axios";
export default function VideoTest() {
    const [videoUrl, setVideoUrl] = useState('');
    const [vDict, setVDict] = useState('');
    const getVideoUrl = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var queryData = {
            type: "facebook",
            tag: "just do it"
        }
        let getVideoUrl = await axios.post(process.env.REACT_APP_BURL + 'video/generate_videos', queryData, config, { withCredentials: true })
            .then(res => {
                /* console.log(res.data) */
                setVideoUrl(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
    const getVideoUrlHandler = (e) => {
        console.log(e.target.value)
    }
    useEffect(() => {
        if (videoUrl === '') {
            console.log("no data")
        }
        else {
            let video_list = videoUrl.video_list;
            let videoDict = {};
            let key = 0;
            videoDict = video_list.map(x => { return ({ src: x, key: (key++).toString() }) })
            setVDict(videoDict)
        }
    }, [videoUrl])

    console.log(vDict)

    return (
        <>
            <div className='row'>
                <button className='btn' onClick={getVideoUrl}>Get Video</button>
            </div>
            <div className='container' style={{ alignItems: 'right' }}>
                {vDict && vDict.map(video => {
                    return (
                        <div className="card" key={video.key} >
                            <video src={video.src} controls type="video/mp4" style={{ padding: '15px' }}></video>
                            <div className="card-body">
                                <button type='button' onClick={(e) => getVideoUrlHandler(e)} value={video.src} className='btn'>Select Video</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Launch static backdrop modal
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
