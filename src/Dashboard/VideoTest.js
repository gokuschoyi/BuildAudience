import React, { useCallback, useEffect, useState } from 'react'
import axios from "axios";
import { FaDownload } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
export default function VideoTest() {
    const [videoUrl, setVideoUrl] = useState('');
    const [vDict, setVDict] = useState('');
    const [pDict, setPDict] = useState('');
    const [project, setProjects] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [story, setStory] = useState('');

    const getVideoUrl = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var queryData = {
            type: "facebook",
            tag: "just do it"
        }
        let getVideoUrl = await axios.post(process.env.REACT_APP_BURL + '/video/generate_videos', queryData, config, { withCredentials: true })
            .then(res => {
                /* console.log(res.data) */
                setVideoUrl(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const getProjects = useCallback(async () => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2MjYwODAzNywianRpIjoiYmZlNWJkYjktODAxMC00ZjRiLWE2NjctY2Y5OTdlOWQ5NjA2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1aWQiOiJDT0REZ2VuNHJyZmlGd09qWG5OZEk0czZZZEczIiwiZW1haWwiOiJnb2t1bHNhbmdhbWl0cmFjaG95aUBnbWFpbC5jb20iLCJjb21wYW55X25hbWUiOiJidXp6IiwiZGlzcGxheV9uYW1lIjoiZ29rdWwifSwibmJmIjoxNjYyNjA4MDM3fQ.zVzvwblL5WfSwRPb1Hw61BPALFMXBlGpjMIfyOb7KOs"
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let allProjects = await axios.get(process.env.REACT_APP_BURL + '/user/projects', config, { withCredentials: true })
            .then(res => {
                setProjects(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const getVideoUrlHandler = (e) => {
        console.log(e.target.value)
    }
    useEffect(() => {
        if (videoUrl === '') {
            console.log("no Video data")
        }
        else {
            let video_list = videoUrl.video_list;
            let videoDict = {};
            let key = 0;
            videoDict = video_list.map(x => { return ({ src: x, key: (key++).toString() }) })
            setVDict(videoDict)
        }
    }, [videoUrl])

    /* console.log(vDict) */

    useEffect(() => {
        if (project === '') {
            console.log("no Project data")
        }
        else {
            let project_list = project.projects;
            let projectDict = {};
            let key = 0;
            projectDict = project_list.map(x => {
                return ({
                    key: (key++).toString(),
                    hashtags: x.hashtags,
                    media_type: x.media_type,
                    p_name: x.p_name,
                    post_uid: x.post_uid,
                    post_url: x.post_url,
                    quote: x.quote,
                    quote_author: x.quote_author,
                    tag: x.tag,
                    post_type: x.post_type
                })
            })
            setPDict(projectDict)
        }
    }, [project])

    useEffect(() => {
        if (pDict === '') {
            console.log("no Facebook data")
        }
        else {
            setFacebook(pDict.filter(x => x.post_type === 'facebook'))
            setInstagram(pDict.filter(x => x.post_type === 'instagram'))
            setStory(pDict.filter(x => x.post_type === 'story'))
        }
    }, [pDict])
    const [deleteUrl, setDeleteUrl] = useState('');
    const getDeleteProjectUrl = (e) => {
        setDeleteUrl(e.target.value)
        console.log('getDeleteProjectUrl', deleteUrl)
    }
    console.log(deleteUrl)

    const deleteProject = (e) => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2MjYwODAzNywianRpIjoiYmZlNWJkYjktODAxMC00ZjRiLWE2NjctY2Y5OTdlOWQ5NjA2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1aWQiOiJDT0REZ2VuNHJyZmlGd09qWG5OZEk0czZZZEczIiwiZW1haWwiOiJnb2t1bHNhbmdhbWl0cmFjaG95aUBnbWFpbC5jb20iLCJjb21wYW55X25hbWUiOiJidXp6IiwiZGlzcGxheV9uYW1lIjoiZ29rdWwifSwibmJmIjoxNjYyNjA4MDM3fQ.zVzvwblL5WfSwRPb1Hw61BPALFMXBlGpjMIfyOb7KOs"
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var deletePostKey = {
            post_uid: deleteUrl
        }
        let deleteProject = axios.post(process.env.REACT_APP_BURL + '/user/delete_project', deletePostKey, config, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                getProjects()
            })
            .catch(err => {
                console.log(err)
            })
        console.log('deleteProject')
    }

    /*  console.log(pDict)
     console.log(facebook)
     console.log(instagram)
     console.log(story) */

    const downloadImage = (e) => {
        var url = e.target.value;
        var FileSaver = require('file-saver');
        console.log(url)
        FileSaver.saveAs(url, "image.jpg");
    }

    return (
        <>
            <div className='row'>
                <button className='btn' onClick={getVideoUrl}>Get Video</button>
            </div>
            <div className='row'>
                <button className="btn btn-primary" onClick={getProjects}>Get Projects</button>
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
            {/* <div className="dashboard-section w-tab-pane"> */}
            <div className="row">
                <h3 className="heading-20">Projects</h3>
            </div>
            <div className="row">
                <h3 className="heading-20">Facebook</h3>
            </div>
            {facebook.length === 0 ? <div>no facebook projects</div> : ''}
            <div className="container " style={{ alignItems: 'baseline' }}>
                {facebook && facebook.map(project => {
                    return (
                        <div className="card" key={project.key}>
                            <img
                                src={project.post_url}
                                alt="project 1" />
                            <div className="card-body ">
                                <h4 className="heading-19">{project.p_name} - {project.tag}</h4>
                                <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                <h4 className="heading-21">{project.hashtags}</h4>
                                <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                <div>
                                    <button className="btn btn-dark" style={{ margin: '5px' }} onClick={(e) => downloadImage(e)} value={project.post_url}>Download <FaDownload /></button>
                                    <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal" value={project.post_uid} onClick={(e) => getDeleteProjectUrl(e)}>Delete <AiFillDelete /></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="row">
                <h3 className="heading-20">Instagram</h3>
            </div>
            {instagram.length === 0 ? <div>no insta projects</div> : ''}
            <div className="container">
                {instagram && instagram.map(project => {
                    return (
                        <div className="card" key={project.key}>
                            <img
                                src={project.post_url}
                                alt="project 1" />
                            <div className="card-body">
                                <h4 className="heading-19">{project.p_name} - {project.tag}</h4>
                                <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                <h4 className="heading-21">{project.hashtags}</h4>
                                <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                            </div>
                        </div>
                    )
                })}

            </div>
            <div className="row">
                <h3 className="heading-20">Story</h3>
            </div>
            <div className="container">
                {story && story.map(project => {
                    return (
                        <div className="card" key={project.key}>
                            <img
                                src={project.post_url}
                                alt="project 1" />
                            <div className="card-body">
                                <h4 className="heading-19">{project.p_name} - {project.tag}</h4>
                                <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                <h4 className="heading-21">{project.hashtags}</h4>
                                <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                            </div>
                        </div>
                    )
                })}

            </div>
            {/* </div> */}
            <div>
                <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete Project</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                You will not be able to recover this project.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={(e) => deleteProject(e)}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>

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
