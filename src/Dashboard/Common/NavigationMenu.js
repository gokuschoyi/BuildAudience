/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordReset } from './DashboardNavbarSlice'
import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FaDownload } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';
import ReactTooltip from 'react-tooltip';
import SelectTagInput from "../../Dashboard/BlogPost/SelectTagInput";
import plus from '../../images/addIcon.png';
import infoIcon from '../../images/information.png'
import axios from "axios";
import CustomPost from "../CustomPost/CustomPost";
import { resetCustomPostSlice } from '../CustomPost/CustomPostSlice'
import { useNavigate } from "react-router-dom";
import {
    blogPostPending,
    saveBlogPost,
    blogPostSuccess,
    blogPostFailure,
    blogPostReset
} from '../BlogPost/BlogPostSlice'
function NavigationMenu() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => {
        const WEBFLOW_PAGE_ID = '62e09f1bbfb10386a27822d7'
        const WEBFLOW_SITE_ID = '62c7a74dd5c3fb4c886564d2'

        var doc = document.getElementsByTagName("html")[0]
        doc.setAttribute('data-wf-page', WEBFLOW_PAGE_ID)
        doc.setAttribute('data-wf-site', WEBFLOW_SITE_ID)
    });

    useEffect(() => {
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
        window.Webflow && window.Webflow.require('ix2').init();
        document.dispatchEvent(new Event('readystatechange'))
    })

    const { resetPasswordPending, resetPasswordSuccess, resetPasswordError } = useSelector(state => state.resetPassword);
    const { blogPostPendingFlag } = useSelector(state => state.blogPost);
    const dispatch = useDispatch();
    const [tooltip, showTooltip] = React.useState(true);
    const [qipUrl, setQipUrl] = React.useState('');
    const [qipUrlError, setQipUrlError] = React.useState('');
    const [pDict, setPDict] = React.useState('');
    const [project, setProjects] = React.useState('');
    const [defaultpDict, setDefaultpDict] = React.useState('');
    const [defaultProject, setDefaultProject] = React.useState('');
    const [facebook, setFacebook] = React.useState('');
    const [instagram, setInstagram] = React.useState('');
    const [story, setStory] = React.useState('');
    const [blog, setBlog] = React.useState('');
    const [seed, setSeed] = React.useState(1);
    const [deleteUrl, setDeleteUrl] = React.useState('');
    const [customPostSwitch, setCustomPostSwitch] = React.useState(false);
    const [BPDescription, setBPDescription] = React.useState('');
    const [BPUrl, setBPUrl] = React.useState('');
    const history = useNavigate();

    const reset = useCallback(() => {
        setSeed(Math.random());
        dispatch(resetCustomPostSlice())
        setCustomPostSwitch(false);
        console.log('seed', seed);
    }, [seed, dispatch]);

    const changeCustomPostSwitch = () => {
        setCustomPostSwitch(true);
    }

    const handleBPDescription = (e) => {
        setBPDescription(e.target.value)
        console.log('BPDescription', BPDescription);
    }

    const handleBPUrl = (e) => {
        setBPUrl(e.target.value)
        console.log('BPUrl', BPUrl);
    }

    const getQuickImagePost = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let qip = await axios.post(process.env.REACT_APP_BURL + '/image_post/quick_post', { withCredentials: true }, config)
            .then(res => {
                setQipUrl(res.data)
                console.log(qipUrl.data)
            })
            .catch(err => {
                setQipUrlError(err.response.data)
            })
    }, [qipUrl])

    const getProjects = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let allProjects = await axios.get(process.env.REACT_APP_BURL + '/user/projects', config, { withCredentials: true })
            .then(res => {
                if (res.data.projects.length === 0) {
                    setDefaultProject(res.data)
                    setProjects('')
                }
                else {
                    setProjects(res.data)
                    setDefaultProject('')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

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
                    post_type: x.post_type,
                    blogTitle: x.title,
                    blogUrl: x.image,
                    blogTitleUrl: x.url_title
                })
            })
            setPDict(projectDict)
        }
    }, [project])

    useEffect(() => {
        if (defaultProject === '') {
            console.log("no  Default Project data")
        }
        else {
            let project_list = defaultProject.dummy;
            let projectDict = {};
            let key = 0;
            projectDict = project_list.map(x => {
                return ({
                    key: (key++).toString(),
                    hashtags: x.hashtags,
                    p_name: x.p_name,
                    post_url: x.post_url,
                    quote: x.quote,
                    quote_author: x.quote_author,
                    tag: x.tag,
                })
            })
            setDefaultpDict(projectDict)
        }
    }, [defaultProject])

    useEffect(() => {
        if (pDict === '') {
            console.log("no Facebook data")
        }
        else {
            setFacebook(pDict.filter(x => x.post_type === 'facebook'))
            setInstagram(pDict.filter(x => x.post_type === 'instagram'))
            setStory(pDict.filter(x => x.post_type === 'story'))
            setBlog(pDict.filter(x => x.media_type === 'blog'))
        }
    }, [pDict])

    function removeError() {
        dispatch(resetPasswordReset())
    }

    function removeQipLink() {
        setQipUrl('');
        setQipUrlError('');
    }

    function downloadQIP() {
        var FileSaver = require('file-saver');
        console.log(qipUrl.data)
        FileSaver.saveAs(qipUrl.data[0], "image.jpg");
    }

    const downloadImage = (e) => {
        var url = e.target.value;
        var FileSaver = require('file-saver');
        console.log(url)
        FileSaver.saveAs(url, "image.jpg");
    }

    const getDeleteProjectUrl = (e) => {
        setDeleteUrl(e.target.value)
        console.log('getDeleteProjectUrl', deleteUrl)
    }

    const deleteProject = (e) => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var deletePostKey = {
            post_uid: deleteUrl
        }
        let deleteProject = axios.post(process.env.REACT_APP_BURL + '/user/delete_project', deletePostKey, config, { withCredentials: true })
            .then(res => {
                if (res.data.success === 'Deleted project!') {
                    deleteSuccess()
                }
                console.log(res.data.success)
                getProjects()
            })
            .catch(err => {
                console.log(err)
            })
        console.log('deleteProject')
    }

    const deleteBlogProject = (e) => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var deleteBlogKey = {
            post_uid: deleteUrl,
            type: 'blog'
        }
        let deleteProject = axios.post(process.env.REACT_APP_BURL + '/user/delete_project', deleteBlogKey, config, { withCredentials: true })
            .then(res => {
                if (res.data.success === 'Deleted project!') {
                    deleteSuccess()
                }
                console.log(res.data.success)
                getProjects()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const toastId = React.useRef(null);
    const customId = "custom-id-yes";
    const Pending = () => toastId.current = toast.warn('Sending you the reset Link', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customId
    });
    const updateSuccess = () => toast.update(toastId.current, { render: "An email has been sent to you.", type: toast.TYPE.SUCCESS, autoClose: 5000, transition: Zoom });
    const updateError = () => toast.update(toastId.current, { render: "Oops, something went wrong.", type: toast.TYPE.SUCCESS, autoClose: 5000, transition: Zoom });

    const toastIdCopied = React.useRef(null);
    const customIdCopied = "custom-id-yes";
    const copied = () => toastIdCopied.current = toast.success('Link Copied', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customIdCopied
    });

    const toastIdDelete = React.useRef(null);
    const customIdDelete = "custom-id-yes";
    const deleteSuccess = () => toastIdDelete.current = toast.success('Project Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customIdDelete
    });

    if (resetPasswordPending) {
        Pending()
    }
    if (resetPasswordSuccess) {
        removeError()
        updateSuccess()
    }
    if (resetPasswordError) {
        removeError()
        updateError()
    }

    function randomNumberInRange() {
        var min = 1;
        var max = 3;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const generateBlogPost = useCallback(async () => {
        dispatch(blogPostReset())
        dispatch(blogPostPending())
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var BPData = {
            p_desc: BPDescription,
            ref_url: BPUrl,
            p_name: sessionStorage.getItem('CompanyName')
        }
        console.log(BPData)
        dispatch(saveBlogPost(BPData))
        let blogPost = await axios.post(process.env.REACT_APP_BURL + '/blog_post/generate', BPData, config, { withCredentials: true })
            .then(res => {
                dispatch(blogPostSuccess(res.data))
                var BPT = randomNumberInRange()
                var url = "/BlogPost" + BPT
                console.log(url)
                history(url);
            })
            .catch(err => {
                dispatch(blogPostFailure(err.data))
            })
    }, [BPDescription, BPUrl, dispatch, history])

    useEffect(() => {
        var exampleModal = document.getElementById('shareBlog')
        exampleModal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget
            var blogURL = button.getAttribute('data-bs-whatever')
            var modalBodyInput = exampleModal.querySelector('.modal-body input')
            modalBodyInput.value = blogURL
        })
    })

    const copyLink = () => {
        var copyText = document.getElementById("recipient-name");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        copied()
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div data-duration-in="300" data-duration-out="100" data-current="Blog" data-easing="ease" className="tabs-2 w-tabs">
                <div className="navigation-menu-2 w-tab-menu">
                    <a data-w-tab="ImagePost" className="navigation-item w-inline-block w-tab-link w--current">
                        <div className="text-block-13">Quick Post</div>
                    </a>
                    <a data-w-tab="CustomPost" className="navigation-item w-inline-block w-tab-link">
                        <div className="text-block-14">Custom Post</div>
                    </a>
                    <a data-w-tab="Blog" className="navigation-item w-inline-block w-tab-link">
                        <div className="text-block-15">Blog Post</div>
                    </a>
                    <a data-w-tab="MyProjects" id="projects" className="navigation-item w-inline-block w-tab-link" onClick={getProjects}>
                        <div className="text-block-16">My Project</div>
                    </a>
                </div>

                <div className="dash-tab-wrapper w-tab-content">
                    <div data-w-tab="ImagePost" className="dashboard-section w-tab-pane">
                        <div className="container-13">
                            <h1 className="heading-18">Quick Post </h1>
                            <div className="dash-row">
                                <a href="" data-bs-toggle="modal" data-bs-target="#quickImagePost" onClick={getQuickImagePost} className="white-box link-box paper-box w-inline-block">
                                    <div className="box-padding paper-padding">
                                        <h3 className="doc-heading">Quick Image Post</h3>
                                        <img
                                            sizes="60px"
                                            width={60}
                                            src={plus}
                                            loading="lazy"
                                            alt="plusicon"
                                            className="image-18" />
                                    </div>
                                </a>
                                <div className="modal modal-centered fade" id="quickImagePost" data-bs-backdrop="false" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">Quick Image Post</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                {qipUrl === '' ?
                                                    <div className="d-flex justify-content-center" style={{ zIndex: '2', paddingTop: '20px' }}>
                                                        <div className="spinner-border text-danger" role="status">
                                                            <span className="sr-only"></span>
                                                        </div>
                                                    </div> :
                                                    <img src={qipUrl.data} alt="qip" />}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={removeQipLink}>Close</button>
                                                <button type="button" className="btn btn-primary" onClick={downloadQIP}>Download</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a href="quickVideoPost" data-bs-toggle="modal" data-bs-target="#quickVideoPost" className="white-box link-box paper-box w-inline-block">
                                    <div className="box-padding paper-padding">
                                        <h3 className="doc-heading">Quick Video  Post</h3>
                                        <img
                                            sizes="60px"
                                            width={60}
                                            src={plus}
                                            loading="lazy"
                                            alt="plusicon"
                                            className="image-18" />
                                    </div>
                                </a>
                                <div className="modal modal-centered fade" id="quickVideoPost" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">Quick Image Post</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                ...
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Download</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ height: '163px' }}></div>
                        </div>
                    </div>
                    <div data-w-tab="CustomPost" className="dashboard-section w-tab-pane" style={{ padding: '0' }}>
                        {!customPostSwitch ?
                            <div className="container-13" style={{ padding: '5em' }}>
                                <h1 className="heading-18">Custom Post </h1>
                                <div className="dash-row">
                                    <a href="#" className="white-box link-box paper-box w-inline-block" onClick={changeCustomPostSwitch}>
                                        <div className="box-padding paper-padding">
                                            <h3 className="doc-heading">Custom Post</h3>
                                            <img
                                                sizes="60px"
                                                width={60}
                                                src={plus}
                                                loading="lazy"
                                                alt="plusicon"
                                                className="image-18" />
                                        </div>
                                    </a>
                                </div>
                                <div style={{ height: '163px' }}></div>
                            </div> : <CustomPost reset={reset} key={seed} />
                        }
                    </div>
                    <div data-w-tab="Blog" className="dashboard-section w-tab-pane w--tab-active">
                        {blogPostPendingFlag ?
                            <div style={{ zIndex: '2', paddingTop: '260px', paddingBottom: '225px' }}>
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-lg-4 d-flex justify-content-center">
                                        <div className="form-section-title-2">Generating Posts</div>
                                    </div>
                                </div>
                                <div className="w-100"></div>
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-lg-4 d-flex justify-content-center">
                                        <div className="spinner-border text-danger" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                <div className="container-18 w-container">
                                    <div className="form-wrap w-form">
                                        <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-4">
                                            <div className="ios-style-reset w-embed">
                                                <style dangerouslySetInnerHTML={{ __html: "\n input[type=text],\n input[type=email],\n input[type=tel] {\n /* Removes innershadow on form fields on iOS */\n border-radius: 0;\n                        -webkit-appearance: none;\n                        -moz-appearance: none;\n                        appearance: none;\n                      }\n                    " }} />
                                            </div>
                                            <h1 className="form-heading">Blog Generation</h1>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '50px' }}>
                                                <div style={{ width: '90%' }}>
                                                    <SelectTagInput />
                                                </div>
                                                <p data-for="tooltipTag" data-tip style={{ paddingTop: '5px' }} onMouseEnter={() => showTooltip(true)}
                                                    onMouseLeave={() => {
                                                        showTooltip(false);
                                                        setTimeout(() => showTooltip(true), 50);
                                                    }}>
                                                    <img src={infoIcon} alt='...' style={{ width: '25px' }}></img>
                                                </p>
                                                {tooltip &&
                                                    <ReactTooltip id="tooltipTag" data-effect="float" delayHide={1000} >
                                                        <span>Select relevent tags from the list to customize your blog post</span>
                                                    </ReactTooltip>
                                                }
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '50px' }}>
                                                <div className="field-wrap">
                                                    <textarea
                                                        type="text"
                                                        onChange={handleBPDescription}
                                                        className="form-field w-input"
                                                        autoComplete="off"
                                                        maxLength={1000}
                                                        name="name"
                                                        data-name="name"
                                                        placeholder="Enter a short description for the blog"
                                                        id="name"
                                                        required
                                                        style={{ height: '100px' }} />
                                                </div>
                                                <p data-for="tooltipURLdesc" data-tip style={{ paddingTop: '5px' }} onMouseEnter={() => showTooltip(true)}
                                                    onMouseLeave={() => {
                                                        showTooltip(false);
                                                        setTimeout(() => showTooltip(true), 50);
                                                    }}>
                                                    <img src={infoIcon} alt='...' style={{ width: '25px' }}></img>
                                                </p>
                                                {tooltip &&
                                                    <ReactTooltip id="tooltipURLdesc" data-effect="float" delayHide={1000} >
                                                        <span>Enter a short description for the blog</span>
                                                    </ReactTooltip>
                                                }
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div className="field-wrap">
                                                    <input
                                                        type="text"
                                                        onChange={handleBPUrl}
                                                        className="form-field w-input"
                                                        autoComplete="off"
                                                        maxLength={256}
                                                        name="name"
                                                        data-name="name"
                                                        placeholder="Enter a URL"
                                                        id="name"
                                                        required />
                                                </div>
                                                <p data-for="tooltipURL" data-tip style={{ paddingTop: '5px' }} onMouseEnter={() => showTooltip(true)}
                                                    onMouseLeave={() => {
                                                        showTooltip(false);
                                                        setTimeout(() => showTooltip(true), 50);
                                                    }}>
                                                    <img src={infoIcon} alt='...' style={{ width: '25px' }}></img>
                                                </p>
                                                {tooltip &&
                                                    <ReactTooltip id="tooltipURL" data-effect="float" delayHide={1000} >
                                                        <span>Enter a URL of a post that you want a blog created from</span>
                                                    </ReactTooltip>
                                                }
                                            </div>
                                            <div className="orfield">
                                                <h3 className="heading-24">OR</h3>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div className="field-wrap">
                                                    {/* <label htmlFor="day" className="form-field-label">Select</label> */}
                                                    <select id="day" name="day" data-name="day" required className="form-field select-field wide w-select">
                                                        <option value>Select From Saved Article</option>
                                                        <option value="Monday">https://www.agegracefullyamerica.com/technology-help/</option>
                                                        <option value="Tuesday">https://www.internetsociety.org/issues/technology/</option>
                                                        <option value="Wednesday">https://www.computerweekly.com/blogs</option>
                                                        <option value="Thursday">https://www.gartner.com/en/information-technology/insights/information-technology-blogs</option>
                                                    </select>
                                                </div>
                                                <p data-for="tooltipSaved" data-tip style={{ paddingTop: '5px' }} onMouseEnter={() => showTooltip(true)}
                                                    onMouseLeave={() => {
                                                        showTooltip(false);
                                                        setTimeout(() => showTooltip(true), 50);
                                                    }}>
                                                    <img src={infoIcon} alt='...' style={{ width: '25px' }}></img>
                                                </p>
                                                {tooltip &&
                                                    <ReactTooltip id="tooltipSaved" data-effect="float" delayHide={1000} >
                                                        <span>Select one Blog from your saved Articles</span>
                                                    </ReactTooltip>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="container-15 w-container">
                                    <a href="#" className="button-3 w-button" onClick={generateBlogPost}>Submit</a>
                                </div>
                            </>
                        }
                    </div>
                    <div data-w-tab="MyProjects" className="dashboard-section w-tab-pane">
                        {defaultProject === "" ?
                            <div className="container-13">
                                <h3 className="heading-20">Saved Projects</h3>
                                <div className="row">
                                    <h3 className="heading-projects">Your Facebook Posts</h3>
                                </div>
                                <div className="container">
                                    {facebook.length === 0 ? <div className="heading-21" style={{ padding: '20px' }}>No Facebook Posts Yet</div> : ""}
                                    <div className="row">
                                        {facebook && facebook.map(project => {
                                            return (
                                                <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                    <div className="card mb-3">
                                                        <img
                                                            src={project.post_url}
                                                            alt="project 1" />
                                                        <div className="card-body">
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
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="row">
                                    <h3 className="heading-projects">Your Instagram Posts</h3>
                                </div>
                                <div className="container">
                                    {instagram.length === 0 ? <div className="heading-21" style={{ padding: '20px' }}>No Instagram Posts Yet</div> : ""}
                                    <div className="row">
                                        {instagram && instagram.map(project => {
                                            return (
                                                <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                    <div className="card mb-3" >
                                                        <img
                                                            src={project.post_url}
                                                            alt="project 1" />
                                                        <div className="card-body">
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
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="row">
                                    <h3 className="heading-projects">Your Story Posts</h3>
                                </div>
                                <div className="container">
                                    {story.length === 0 ? <div className="heading-21" style={{ padding: '20px' }}>No Story Posts Yet</div> : ""}
                                    <div className="row">
                                        {story && story.map(project => {
                                            return (
                                                <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                    <div className="card mb-3" >
                                                        <img
                                                            src={project.post_url}
                                                            alt="project 1" />
                                                        <div className="card-body">
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
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="row">
                                    <h3 className="heading-projects">Your Blogs</h3>
                                </div>
                                <div className="container">
                                    {blog.length === 0 ? <div className="heading-21" style={{ padding: '20px' }}>No Blogs Yet</div> : ""}
                                    <div className="row">
                                        {blog && blog.map(project => {
                                            return (
                                                <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                    <div className="card mb-3">
                                                        <img
                                                            src={project.blogUrl}
                                                            alt="project 1" />
                                                        <div className="card-body">
                                                            <h4 className="heading-19">{project.blogTitle}</h4>
                                                            {/* <h4 className="heading-21"><strong className="bold-text-5">{window.location.origin}/Blogs/{project.blogTitle}{project.post_uid}</strong></h4> */}
                                                            <div>
                                                                <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareBlog" data-bs-toggle="modal" data-bs-whatever={window.location.origin + "/blogs/" + project.blogTitleUrl + "/" + project.post_uid}>Share <FiShare2 /></button>
                                                                <button className="btn btn-dark " data-bs-target="#deleteBlogModal" data-bs-toggle="modal" value={project.post_uid} onClick={(e) => getDeleteProjectUrl(e)}>Delete <AiFillDelete /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div> :
                            <div className="container-13">
                                <h3 className="heading-20">Saved Projects</h3>
                                <div className="container" style={{ alignItems: 'baseline' }}>
                                    {defaultpDict && defaultpDict.map(project => {
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
                            </div>
                        }
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
                        <div className="modal fade" id="shareBlog" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">BLOG URL</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">URL:</label>
                                            <input type="text" className="form-control" id="recipient-name" />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-dark" onClick={copyLink}>Copy URL</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="deleteBlogModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Delete Blog</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                        You will not be able to recover this blog and URL will stop working.
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={(e) => deleteBlogProject(e)}>Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NavigationMenu;