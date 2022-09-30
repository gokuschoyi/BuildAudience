/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import SelectTagInput from "../../Dashboard/BlogPost/SelectTagInput";
import plus from '../../images/addIcon.png';
import infoIcon from '../../images/information.png'
import axios from "axios";
import CustomPost from "../CustomPost/CustomPost";
import { resetCustomPostSlice, resetSaveProjectSuccessFlag } from '../CustomPost/CustomPostSlice'
import { resetNotifiacationHistory } from './NotificationIcon/NotificationSlice'
import { useNavigate } from "react-router-dom";
import {
    blogPostPending,
    saveBlogPost,
    blogPostSuccess,
    blogPostFailure,
    blogPostReset
} from '../BlogPost/BlogPostSlice'
import { saveProjectData, setStatusFlag, resetProjectVideoSlice } from '../CustomPost/VideoPostStatusSlice';
import { saveQVPFlag, saveQVPData, resetQVPSlice, resetQvpSaveFlag, setQVPStatusFlag } from './QVPSlice'
import {
    EmailShareButton,
    FacebookShareButton,
    PinterestShareButton,
    RedditShareButton,
    WhatsappShareButton,
    TwitterShareButton
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    PinterestIcon,
    RedditIcon,
    WhatsappIcon,
    TwitterIcon
} from "react-share";
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

    const { blogPostPendingFlag } = useSelector(state => state.blogPost);
    const { saveProjectVideoFlag, projectData, videoProjectUid, videoProjectFlag } = useSelector(state => state.saveVideoPostFlag)
    const { saveProjectNotificationFlag, mediaType, saveProjectSuccessFlag } = useSelector(state => state.customPost)
    const { qvpProjectVideoFlag, saveQvpFlag, qvpUid, qvpData, qvpStatus } = useSelector(state => state.qvp)
    const dispatch = useDispatch()
    const [tooltip, showTooltip] = useState(true)
    const [qipUrl, setQipUrl] = useState('')
    const [qipUrlError, setQipUrlError] = useState('')
    const [pDict, setPDict] = useState('')
    const [project, setProjects] = useState('')
    const [defaultpDict, setDefaultpDict] = useState('')
    const [defaultProject, setDefaultProject] = useState('')
    const [facebook, setFacebook] = useState('')
    const [facebookThree, setFacebookThree] = useState('')
    const [facebookRemaining, setFacebookRemaining] = useState('')
    const [instagram, setInstagram] = useState('')
    const [instagramThree, setInstagramThree] = useState('')
    const [instagramRemaining, setInstagramRemaining] = useState('')
    const [story, setStory] = useState('')
    const [storyThree, setStoryThree] = useState('')
    const [storyRemaining, setStoryRemaining] = useState('')
    const [blog, setBlog] = useState('')
    const [blogThree, setBlogThree] = useState('')
    const [blogRemaining, setBlogRemaining] = useState('')
    const [seed, setSeed] = useState(1)
    const [deleteUrl, setDeleteUrl] = useState('')
    const [customPostSwitch, setCustomPostSwitch] = useState(false)
    const [BPDescription, setBPDescription] = useState('')
    const [BPUrl, setBPUrl] = useState('')
    const [prop, setProp] = useState('')
    const [qvpUrl, setQvpUrl] = useState('')
    const [qvpProcessedStatus, setqvpProcessedStatus] = useState(false)
    const [blogPostUrl, setBlogPostUrl] = useState('')
    const [BPResetFlag, setBPResetFlag] = useState(false)
    const projectCount = React.useRef(0)
    const randomValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
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

    const getQuickVideoPost = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let qvp = await axios.post(process.env.REACT_APP_BURL + '/video_post/quick_post', { withCredentials: true }, config)
            .then(res => {
                dispatch(saveQVPFlag(res.data.project_uid))
            })
            .catch(err => {
                console.log("something went wrong")
            })
    }, [dispatch])

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
                    console.log("project length is 0")
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

    const refreshProjectTab = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let totalPCount = await axios.get(process.env.REACT_APP_BURL + '/user/projects', config, { withCredentials: true })
            .then(res => {
                projectCount.current = res.data.projects.length
            })
            .catch(err => {
                console.log("something went wrong, try later")
            })
        /* console.log(projectCount.current, project.projects.length) */

        if (project === '') {
            getProjects()
            console.log("inside project null check")
        }
        else if (project.projects.length < projectCount.current) {
            getProjects()
            console.log("Total count ", projectCount.current + " actual count", project.projects.length)
        }
    }, [getProjects, project])

    /* Converting projects list to dictionary */
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

    /* Converting default project list to dictionary */
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

    /* Sorting Project data to various categories - Facebook, Instagram, Story and Blogs */
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

    /* Splitting Different posts to group of 3 and remaining posts */
    useEffect(() => {
        if (facebook !== '') {
            setFacebookThree(facebook.slice(0, 3))
            setFacebookRemaining(facebook.slice(3, facebook.length))
        }
        if (instagram !== '') {
            setInstagramThree(instagram.slice(0, 3))
            setInstagramRemaining(instagram.slice(3, instagram.length))
        }
        if (story !== '') {
            setStoryThree(story.slice(0, 3))
            setStoryRemaining(story.slice(3, story.length))
        }
        if (blog !== '') {
            setBlogThree(blog.slice(0, 3))
            setBlogRemaining(blog.slice(3, blog.length))
        }
    }, [facebook, instagram, story, blog])

    function removeQipLink() {
        setQipUrl('');
        setQipUrlError('');
    }

    function removeQvpLink() {
        setQvpUrl('');
        setqvpProcessedStatus(false);
    }

    function downloadQIP() {
        var FileSaver = require('file-saver');
        console.log(qipUrl.data)
        FileSaver.saveAs(qipUrl.data[0], "image.jpg");
    }

    function downloadQVP() {
        var FileSaver = require('file-saver');
        console.log(qvpUrl)
        FileSaver.saveAs(qvpUrl, "video.mp4");
    }

    const downloadImage = (e) => {
        var url = e.target.getAttribute('data-uid')
        var FileSaver = require('file-saver');
        console.log(url)
        FileSaver.saveAs(url, "image.jpg");
    }

    const downloadVideo = (e) => {
        var url = e.target.getAttribute('data-uid')
        var FileSaver = require('file-saver');
        console.log(url)
        FileSaver.saveAs(url, "video.mp4");
    }

    const getDeleteProjectUrl = (e) => {
        setDeleteUrl(e.target.getAttribute('data-uid'))
    }

    const resetDeleteProjectUrl = () => {
        setDeleteUrl('')
    }

    const deleteProject = (e) => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var deletePostKey = {
            post_uid: deleteUrl
        }
        console.log(deletePostKey)
        let deleteProject = axios.post(process.env.REACT_APP_BURL + '/user/delete_project', deletePostKey, config, { withCredentials: true })
            .then(res => {
                if (res.data.success === 'Deleted project!') {
                    deleteSuccess(deleteUrl)
                    resetDeleteProjectUrl()
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
                    deleteSuccess(deleteUrl)
                }
                console.log(res.data.success)
                getProjects()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const toastIdCopied = React.useRef(null);
    const copied = (PostUid, ProjectUrl) => toastIdCopied.current = toast.success('Link Copied', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        data: {
            url: ProjectUrl,
            p_uid: PostUid
        },
        type: "success"
    });

    const toastIdBlogInputDescWarn = React.useRef(null);
    const customIdBlogInputDescWarn = "custom-id-DescWarn";
    const blogInputDescWarn = () => toastIdBlogInputDescWarn.current = toast.warn('Please fill in Description', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customIdBlogInputDescWarn,
        type: "warning"
    });

    const toastIdBlogInputUrlWarn = React.useRef(null);
    const customIdBlogInputUrlWarn = "custom-id-UrlWarn";
    const blogInputUrlWarn = () => toastIdBlogInputUrlWarn.current = toast.warn('Please fill in URL', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customIdBlogInputUrlWarn,
        type: "warning"
    });

    const toastIdDelete = React.useRef(null);
    const deleteSuccess = (PostUid) => toastIdDelete.current = toast.success('Project Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: PostUid,
        type: "success"
    });

    const toastISuccess = React.useRef(null);
    const customIdImage = "custom-id-PSuccess";

    const imagePostSuccess = () => toastISuccess.current = toast.success('Your project has been saved', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customIdImage,
        type: "success"
    });

    const toastPSuccess = React.useRef(null);
    const customIdV = "custom-id-PSuccess";
    const Success = () => toastPSuccess.current = toast.success('Your Video Post is being Processed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customIdV,
        onClose: () => {
            handleSaveVideoProjectSuccess();
        },
        type: "success"
    });

    const toastIdVProjectStatus = React.useRef(null);
    const customIdVProjectStatus = "custom-id-yesVProject";
    const VProjectFlag = () => toastIdVProjectStatus.current = toast.success('Video post Processed successfully. You can view it in the projects tab', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: customIdVProjectStatus,
        type: "success"
    });

    const toastQvpSuccess = React.useRef(null);
    const qvpSuccess = (QvpUid) => toastQvpSuccess.current = toast.success('Your Quick Video Post is being Processed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: QvpUid,
        onClose: () => {
            handleQvpSuccess();
        },
        type: "success"
    });

    const toastIdQVPStatus = React.useRef(null);
    const qvpProjectFlag = (QvpUid) => toastIdQVPStatus.current = toast.success('Your Quick Video post processed successfully. You can view it in the projects tab', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: QvpUid + randomValues[Math.floor(Math.random() * randomValues.length)],
        type: "success"
    });

    function handleQvpSuccess() {
        console.log("qvp success")
        dispatch(resetQvpSaveFlag())
    }

    function handleSaveVideoProjectSuccess() {
        console.log("working")
        dispatch(resetSaveProjectSuccessFlag())
    }

    if (saveProjectNotificationFlag && mediaType === 'video') {
        Success()
    }
    if (saveProjectSuccessFlag && mediaType === 'image') {
        imagePostSuccess()
    }
    if (saveQvpFlag === true) {
        qvpSuccess(qvpUid)
    }

    /* Random number generator for blogPost template selection */
    function randomNumberInRange() {
        var min = 1;
        var max = 3;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleBPReset = () => {
        setBPResetFlag(false)
    }

    /* Generating blog Post */
    const generateBlogPost = useCallback(async () => {
        dispatch(blogPostReset())
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var BPData = {
            p_desc: BPDescription,
            ref_url: BPUrl,
            p_name: sessionStorage.getItem('CompanyName')
        }
        if (BPData.p_desc === '') {
            blogInputDescWarn()
        }
        else if (BPData.ref_url === '') {
            blogInputUrlWarn()
        }
        if (BPData.p_desc !== '' && BPData.ref_url !== '') {
            console.log(BPData)
            dispatch(blogPostPending())
            dispatch(saveBlogPost(BPData))
            let blogPost = await axios.post(process.env.REACT_APP_BURL + '/blog_post/generate', BPData, config, { withCredentials: true })
                .then(res => {
                    dispatch(blogPostSuccess(res.data))
                    var BPT = randomNumberInRange()
                    setBlogPostUrl("/BlogPost" + BPT)
                    console.log(blogPostUrl)
                    setBPResetFlag(true)
                    /* history(blogPostUrl); */
                })
                .catch(err => {
                    dispatch(blogPostFailure(err.data))
                })
        }

    }, [BPDescription, BPUrl, dispatch, blogPostUrl])

    /* Setting share url for various  projects */
    useEffect(() => {
        var exampleModal = document.getElementById('shareProject')
        exampleModal.addEventListener('show.bs.modal', function (event) {
            var button = event.relatedTarget
            var projectURL = button.getAttribute('data-bs-whatever')
            var modalBodyInput = exampleModal.querySelectorAll('.modal-body input')
            modalBodyInput[0].value = projectURL
            setProp({
                url: projectURL,
            })
            modalBodyInput[1].value = button.getAttribute('data-bs-id')
        })
    })

    /* Copying Project link */
    const copyProjectLink = () => {
        var PostUid = ''
        var copyText = document.getElementById("shareProjectUrl");
        var projectUrl = copyText.value;
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        PostUid = document.getElementById('postUidP').value
        console.log(PostUid)
        /* console.log(projectUrl) */
        copied(PostUid, projectUrl)
    }

    /* getting status of saved video Project */
    const getVideoProjectStatus = useCallback(async (PData, VPUid) => {
        const token = sessionStorage.getItem('userTokenSession');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let allProjects = await axios.get(process.env.REACT_APP_BURL + '/user/projects', config, { withCredentials: true })
            .then(res => {
                if (videoProjectUid !== '') {
                    dispatch(saveProjectData(res.data))
                    var videoPosts = PData.projects.filter(x => x.media_type === 'video')
                    var Status = videoPosts.filter(x => x.post_uid === VPUid)
                    dispatch(setStatusFlag(Status[0].status))
                }
                else {
                    dispatch(saveQVPData(res.data))
                    var QVPVideoPosts = PData.projects.filter(x => x.media_type === 'video')
                    var qvpStatus = QVPVideoPosts.filter(x => x.post_uid === VPUid)
                    setQvpUrl(qvpStatus[0].post_url)
                    dispatch(setQVPStatusFlag(qvpStatus[0].status))
                }
            })
            .catch(err => {
                console.log(err)
            })
        console.log(PData)
    }, [dispatch, videoProjectUid])

    /* Checking if custom video post is processed or not */
    useEffect(() => {
        var interval;
        if (saveProjectVideoFlag === true) {
            if (videoProjectFlag === 'Running') {
                interval = setInterval(() => {
                    getVideoProjectStatus(projectData, videoProjectUid)
                }, 5000)
            }
            else {
                VProjectFlag();
                dispatch(resetProjectVideoSlice());
            }
        }
        if (saveProjectVideoFlag === false && projectData !== '' && videoProjectFlag === 'Processed') {
            clearInterval(interval)
            dispatch(resetProjectVideoSlice());
        }
        return () => clearInterval(interval)
    }, [dispatch, getVideoProjectStatus, saveProjectVideoFlag, videoProjectFlag, projectData, videoProjectUid])

    /* Checking if quick video post is processed or not */
    useEffect(() => {
        var interval;
        if (qvpProjectVideoFlag === true) {
            if (qvpStatus === 'Running') {
                interval = setInterval(() => {
                    getVideoProjectStatus(qvpData, qvpUid)
                }, 5000)
            }
            else {
                qvpProjectFlag(qvpUid);
                setqvpProcessedStatus(true)
                dispatch(resetQVPSlice())
            }
        }
        if (qvpProjectVideoFlag === false && qvpData !== '' && qvpStatus === 'Processed') {
            clearInterval(interval);
            dispatch(resetQVPSlice())
        }
        return () => clearInterval(interval);
    }, [qvpProjectVideoFlag, qvpData, qvpStatus, qvpUid, dispatch, getVideoProjectStatus])

    /* Resetting customPost, VideoPostStatus, QVP Post slices */
    useEffect(() => {
        window.onbeforeunload = function () {
            console.log('refresh')
            dispatch(resetProjectVideoSlice());
            dispatch(resetCustomPostSlice())
            dispatch(resetQVPSlice())
            /* dispatch(resetNotifiacationHistory()) */
        }
    })

    /* Expand/Collapse Projects Tab */
    useEffect(() => {
        if (project !== '') {
            var myCollapsibleF = document.getElementById('facebookPosts')
            myCollapsibleF.addEventListener('hidden.bs.collapse', function () {
                var FBButton = document.getElementById('buttonFB')
                FBButton.classList.remove('bi-chevron-up')
                FBButton.classList.add('bi-chevron-down')
            })
            myCollapsibleF.addEventListener('shown.bs.collapse', function () {
                var FBButton = document.getElementById('buttonFB')
                FBButton.classList.remove('bi-chevron-down')
                FBButton.classList.add('bi-chevron-up')
            })

            var myCollapsibleI = document.getElementById('instagramPosts')
            myCollapsibleI.addEventListener('hidden.bs.collapse', function () {
                var IButton = document.getElementById('buttonI')
                IButton.classList.remove('bi-chevron-up')
                IButton.classList.add('bi-chevron-down')
            })
            myCollapsibleI.addEventListener('shown.bs.collapse', function () {
                var IButton = document.getElementById('buttonI')
                IButton.classList.remove('bi-chevron-down')
                IButton.classList.add('bi-chevron-up')
            })

            var myCollapsibleS = document.getElementById('storyPosts')
            myCollapsibleS.addEventListener('hidden.bs.collapse', function () {
                var SButton = document.getElementById('buttonS')
                SButton.classList.remove('bi-chevron-up')
                SButton.classList.add('bi-chevron-down')
            })
            myCollapsibleS.addEventListener('shown.bs.collapse', function () {
                var SButton = document.getElementById('buttonS')
                SButton.classList.remove('bi-chevron-down')
                SButton.classList.add('bi-chevron-up')
            })

            var myCollapsibleB = document.getElementById('blogPosts')
            myCollapsibleB.addEventListener('hidden.bs.collapse', function () {
                var blogButton = document.getElementById('buttonB')
                blogButton.classList.remove('bi-chevron-up')
                blogButton.classList.add('bi-chevron-down')
            })
            myCollapsibleB.addEventListener('shown.bs.collapse', function () {
                var blogButton = document.getElementById('buttonB')
                blogButton.classList.remove('bi-chevron-down')
                blogButton.classList.add('bi-chevron-up')
            })
        }
    }, [project])

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
                    <a data-w-tab="MyProjects" id="projects" className="navigation-item w-inline-block w-tab-link" onClick={refreshProjectTab}>
                        <div className="text-block-16">My Project</div>
                    </a>
                </div>

                <div className="dash-tab-wrapper w-tab-content">
                    <div data-w-tab="ImagePost" className="dashboard-section w-tab-pane">
                        <div className="container-13" style={{ marginTop: '60px' }}>
                            <h1 className="heading-18">Quick Post </h1>
                            <div className="dash-row">
                                <div className="btnQ">
                                    <a href="" onClick={getQuickImagePost} data-bs-toggle="modal" data-bs-target="#quickImagePost">Quick Image Post </a>
                                    <div style={{ zIndex: '1', position: 'absolute', bottom: '70px' }}>
                                        <img
                                            style={{ width: '40px' }}
                                            src={plus}
                                            loading="lazy"
                                            alt="plusicon"
                                        />
                                    </div>
                                </div>
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
                                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={removeQipLink}>Close</button>
                                                <button type="button" className="btn btn-dark" onClick={downloadQIP}>Download</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="btnQ">
                                    <a href="" onClick={getQuickVideoPost} data-bs-toggle="modal" data-bs-target="#quickVideoPost">Quick Video Post </a>
                                    <div style={{ zIndex: '1', position: 'absolute', bottom: '70px' }}>
                                        <img
                                            style={{ width: '40px' }}
                                            src={plus}
                                            loading="lazy"
                                            alt="plusicon"
                                        />
                                    </div>
                                </div>
                                <div className="modal modal-centered fade" id="quickVideoPost" data-bs-backdrop="false" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">Quick Video Post</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={removeQvpLink} />
                                            </div>
                                            <div className="modal-body">
                                                {qvpProcessedStatus === false ?
                                                    <>
                                                        <div className="d-flex justify-content-center" style={{ zIndex: '2', paddingTop: '20px' }}>
                                                            <div className="spinner-border text-danger" role="status">
                                                                <span className="sr-only"></span>
                                                            </div>
                                                        </div>
                                                        {qvpProjectVideoFlag === true ?
                                                            <div className="heading-21" style={{ textAlign: 'center' }}>
                                                                You will be notified once the quick video post is processed. You can close this tab.
                                                            </div> : ""}
                                                    </> :
                                                    <div className="ratio ratio-16x9">
                                                        <video src={qvpUrl} controls type="video/mp4" style={{ padding: '15px' }}></video>
                                                    </div>
                                                }
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-dark" onClick={removeQvpLink} data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-dark" onClick={downloadQVP}>Download</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div style={{ height: '163px' }}></div> */}
                        </div>
                    </div>
                    <div data-w-tab="CustomPost" className="dashboard-section w-tab-pane" >
                        {!customPostSwitch ?
                            <div className="container-13" style={{ marginTop: '60px' }}>
                                <h1 className="heading-18">Custom Post </h1>
                                <div className="dash-row">
                                    <div className="btnQ">
                                        <a href="#" onClick={changeCustomPostSwitch}>Custom Post </a>
                                        <div style={{ zIndex: '1', position: 'absolute', bottom: '70px' }}>
                                            <img
                                                style={{ width: '40px' }}
                                                src={plus}
                                                loading="lazy"
                                                alt="plusicon"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <div style={{ height: '163px' }}></div> */}
                            </div> : <CustomPost reset={reset} key={seed} />
                        }
                    </div>
                    <div data-w-tab="Blog" className="dashboard-section w-tab-pane w--tab-active" style={{ marginTop: '40px' }}>
                        {BPResetFlag === false ?
                            <div>
                                {blogPostPendingFlag ?
                                    <div style={{ zIndex: '2', paddingTop: '260px', paddingBottom: '201px' }}>
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
                            :
                            <div style={{ zIndex: '2', paddingTop: '190px', paddingBottom: '177px' }}>
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-lg-4 d-flex justify-content-center">
                                        <div className="form-section-title-2">Blog Post Generated</div>
                                    </div>
                                </div>
                                <div className="w-100"></div>
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-lg-4 d-flex justify-content-center">
                                        <p>Check out your blog  <a href={blogPostUrl} target="_blank" rel="noopener noreferrer">here</a>.</p>
                                    </div>
                                </div>
                                <div className="row justify-content-center align-items-center p-4">
                                    <div className="col-lg-4 d-flex justify-content-center">
                                        <button className="btn btn-dark" onClick={handleBPReset}>Start Over</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div data-w-tab="MyProjects" className="dashboard-section w-tab-pane">
                        {defaultProject === "" ?
                            <div className="container-13">
                                <h3 className="heading-20">Saved Projects</h3>
                                {project === '' ?
                                    <div className="d-flex justify-content-center" style={{ zIndex: '2', paddingTop: '20px' }}>
                                        <div className="spinner-border text-danger" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                    </div> :
                                    <>
                                        {/* Facebook Projects */}
                                        {facebook.length === 0 ? "" :
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-10 align-self-start ">
                                                        <h3 className="heading-projects">Your Facebook Posts - {facebook.length}</h3>
                                                    </div>
                                                    <div className="col-2 d-flex text-center align-items-center justify-content-end">
                                                        <button className="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#facebookPosts" aria-expanded="false" aria-controls="facebookPosts">
                                                            <i id="buttonFB" className="bi bi-chevron-down"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div className="container">
                                            <div className="row">
                                                {facebookThree && facebookThree.map(project => {
                                                    return (
                                                        <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                            {project.media_type === 'video' ?
                                                                <div className="card mb-3">
                                                                    <video src={project.post_url} controls type="video/mp4"></video>
                                                                    <div className="card-body">
                                                                        <h4 className="heading-19">{project.p_name}</h4>
                                                                        <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                        <h4 className="heading-21">{project.hashtags}</h4>
                                                                        <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                    </div>
                                                                    <div className="card-footer">
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }}  ><i onClick={(e) => downloadVideo(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                        <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal" ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                    </div>
                                                                </div> :
                                                                <div className="card mb-3">
                                                                    <img
                                                                        src={project.post_url}
                                                                        alt="project 1" />
                                                                    <div className="card-body">
                                                                        <h4 className="heading-19">{project.p_name} - {project.tag}</h4>
                                                                        <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                        <h4 className="heading-21">{project.hashtags}</h4>
                                                                        <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                    </div>
                                                                    <div className="card-footer">
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }}  ><i onClick={(e) => downloadImage(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                        <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal" ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="container collapse" id="facebookPosts">
                                            {facebookRemaining.length === 0 ? "" :
                                                <div className="row">
                                                    {facebookRemaining && facebookRemaining.map(project => {
                                                        return (
                                                            <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                                {project.media_type === 'video' ?
                                                                    <div className="card mb-3">
                                                                        <video src={project.post_url} controls type="video/mp4"></video>
                                                                        <div className="card-body">
                                                                            <h4 className="heading-19">{project.p_name}</h4>
                                                                            <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                            <h4 className="heading-21">{project.hashtags}</h4>
                                                                            <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                        </div>
                                                                        <div className="card-footer">
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }}  ><i onClick={(e) => downloadVideo(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                            <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal"  ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                        </div>
                                                                    </div> :
                                                                    <div className="card mb-3">
                                                                        <img
                                                                            src={project.post_url}
                                                                            alt="project 1" />
                                                                        <div className="card-body">
                                                                            <h4 className="heading-19">{project.p_name} - {project.tag}</h4>
                                                                            <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                            <h4 className="heading-21">{project.hashtags}</h4>
                                                                            <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                        </div>
                                                                        <div className="card-footer">
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }}  ><i onClick={(e) => downloadImage(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                            <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal"  ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </div>
                                        {/* Instagram Projects */}
                                        {instagram.length === 0 ? "" :
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-10 align-self-start ">
                                                        <h3 className="heading-projects">Your Instagram Posts - {instagram.length}</h3>
                                                    </div>
                                                    <div className="col-2 d-flex text-center align-items-center justify-content-end">
                                                        <button className="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#instagramPosts" aria-expanded="false" aria-controls="instagramPosts">
                                                            <i id="buttonI" className="bi bi-chevron-down"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div className="container">
                                            <div className="row">
                                                {instagramThree && instagramThree.map(project => {
                                                    return (
                                                        <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                            {project.media_type === 'video' ?
                                                                <div className="card mb-3">
                                                                    <video src={project.post_url} controls type="video/mp4"></video>
                                                                    <div className="card-body">
                                                                        <h4 className="heading-19">{project.p_name}</h4>
                                                                        <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                        <h4 className="heading-21">{project.hashtags}</h4>
                                                                        <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                    </div>
                                                                    <div className="card-footer">
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }}  ><i onClick={(e) => downloadVideo(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                        <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal"  ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                    </div>
                                                                </div> :
                                                                <div className="card mb-3">
                                                                    <img
                                                                        src={project.post_url}
                                                                        alt="project 1" />
                                                                    <div className="card-body">
                                                                        <h4 className="heading-19">{project.p_name} - {project.tag}</h4>
                                                                        <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                        <h4 className="heading-21">{project.hashtags}</h4>
                                                                        <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                    </div>
                                                                    <div className="card-footer">
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }} ><i onClick={(e) => downloadImage(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                        <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal" ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="container collapse" id="instagramPosts">
                                            {instagramRemaining.length === 0 ? "" :
                                                <div className="row">
                                                    {instagramRemaining && instagramRemaining.map(project => {
                                                        return (
                                                            <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                                {project.media_type === 'video' ?
                                                                    <div className="card mb-3">
                                                                        <video src={project.post_url} controls type="video/mp4"></video>
                                                                        <div className="card-body">
                                                                            <h4 className="heading-19">{project.p_name} - {project.tag}</h4>
                                                                            <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                            <h4 className="heading-21">{project.hashtags}</h4>
                                                                            <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                        </div>
                                                                        <div className="card-footer">
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }}  ><i onClick={(e) => downloadVideo(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                            <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal"  ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                        </div>
                                                                    </div> :
                                                                    <div className="card mb-3" >
                                                                        <img
                                                                            src={project.post_url}
                                                                            alt="project 1" />
                                                                        <div className="card-body">
                                                                            <h4 className="heading-19">{project.p_name} - {project.tag}</h4>
                                                                            <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                            <h4 className="heading-21">{project.hashtags}</h4>
                                                                            <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                        </div>
                                                                        <div className="card-footer">
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }}  ><i onClick={(e) => downloadImage(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                            <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal" ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </div>
                                        {/* Story Projects */}
                                        {story.length === 0 ? "" :
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-10 align-self-start ">
                                                        <h3 className="heading-projects">Your Story Posts - {story.length}</h3>
                                                    </div>
                                                    <div className="col-2 d-flex text-center align-items-center justify-content-end">
                                                        <button className="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#storyPosts" aria-expanded="false" aria-controls="storyPosts">
                                                            <i id="buttonS" className="bi bi-chevron-down"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div className="container">
                                            <div className="row">
                                                {storyThree && storyThree.map(project => {
                                                    return (
                                                        <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                            {project.media_type === 'video' ?
                                                                <div className="card mb-3">
                                                                    <video src={project.post_url} controls type="video/mp4"></video>
                                                                    <div className="card-body">
                                                                        <h4 className="heading-19">{project.p_name}</h4>
                                                                        <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                        <h4 className="heading-21">{project.hashtags}</h4>
                                                                        <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                    </div>
                                                                    <div className="card-footer">
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }}  ><i onClick={(e) => downloadVideo(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                        <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal"  ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                    </div>
                                                                </div> :
                                                                <div className="card mb-3">
                                                                    <img
                                                                        src={project.post_url}
                                                                        alt="project 1" />
                                                                    <div className="card-body">
                                                                        <h4 className="heading-19">{project.p_name} - {project.tag}</h4>
                                                                        <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                        <h4 className="heading-21">{project.hashtags}</h4>
                                                                        <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                    </div>
                                                                    <div className="card-footer">
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }} ><i onClick={(e) => downloadImage(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                        <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal" ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="container collapse" id="storyPosts">
                                            {storyRemaining.length === 0 ? "" :
                                                <div className="row">
                                                    {storyRemaining && storyRemaining.map(project => {
                                                        return (
                                                            <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                                {project.media_type === 'video' ?
                                                                    <div className="card mb-3">
                                                                        <video src={project.post_url} controls type="video/mp4"></video>
                                                                        <div className="card-body">
                                                                            <h4 className="heading-19">{project.p_name} - {project.tag}</h4>
                                                                            <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                            <h4 className="heading-21">{project.hashtags}</h4>
                                                                            <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                        </div>
                                                                        <div className="card-footer">
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }} ><i onClick={(e) => downloadVideo(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                            <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal" ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                        </div>
                                                                    </div> :
                                                                    <div className="card mb-3" >
                                                                        <img
                                                                            src={project.post_url}
                                                                            alt="project 1" />
                                                                        <div className="card-body">
                                                                            <h4 className="heading-19">{project.p_name} - {project.tag}</h4>
                                                                            <h4 className="heading-21"><strong className="bold-text-5">{project.quote}</strong></h4>
                                                                            <h4 className="heading-21">{project.hashtags}</h4>
                                                                            <div className="project-message"><strong className="bold-text-6">{project.quote_author}</strong></div>
                                                                        </div>
                                                                        <div className="card-footer">
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }}  ><i onClick={(e) => downloadImage(e)} data-uid={project.post_url} className="bi bi-download"></i></button>
                                                                            <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={project.post_url} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                            <button className="btn btn-dark " data-bs-target="#deleteModal" data-bs-toggle="modal" ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </div>
                                        {/* Blog Posts */}
                                        {blog.length === 0 ? "" :
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-10 align-self-start ">
                                                        <h3 className="heading-projects">Your Blogs - {blog.length}</h3>
                                                    </div>
                                                    <div className="col-2 d-flex text-center align-items-center justify-content-end">
                                                        <button className="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#blogPosts" aria-expanded="false" aria-controls="blogPosts">
                                                            <i id="buttonB" className="bi bi-chevron-down"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div className="container">
                                            <div className="row">
                                                {blogThree && blogThree.map(project => {
                                                    return (
                                                        <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                            <div className="card mb-3">
                                                                <img
                                                                    src={project.blogUrl}
                                                                    alt="project 1" />
                                                                <div className="card-body">
                                                                    <h4 className="heading-19">{project.blogTitle}</h4>
                                                                    {/* <h4 className="heading-21"><strong className="bold-text-5">{window.location.origin}/Blogs/{project.blogTitle}{project.post_uid}</strong></h4> */}
                                                                </div>
                                                                <div className="card-footer">
                                                                    <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={window.location.origin + "/blogs/" + project.blogTitleUrl + "/" + project.post_uid} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                    <button className="btn btn-dark " data-bs-target="#deleteBlogModal" data-bs-toggle="modal" ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="container collapse" id="blogPosts">
                                            {blogRemaining.length === 0 ? "" :
                                                <div className="row">
                                                    {blogRemaining && blogRemaining.map(project => {
                                                        return (
                                                            <div className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" key={project.key}>
                                                                <div className="card mb-3">
                                                                    <img
                                                                        src={project.blogUrl}
                                                                        alt="project 1" />
                                                                    <div className="card-body">
                                                                        <h4 className="heading-19">{project.blogTitle}</h4>
                                                                        {/* <h4 className="heading-21"><strong className="bold-text-5">{window.location.origin}/Blogs/{project.blogTitle}{project.post_uid}</strong></h4> */}
                                                                    </div>
                                                                    <div className="card-footer">
                                                                        <button className="btn btn-dark" style={{ margin: '5px' }} data-bs-target="#shareProject" data-bs-toggle="modal" data-bs-whatever={window.location.origin + "/blogs/" + project.blogTitleUrl + "/" + project.post_uid} data-bs-id={project.post_uid}><i className="bi bi-share"></i></button>
                                                                        <button className="btn btn-dark " data-bs-target="#deleteBlogModal" data-bs-toggle="modal" ><i onClick={(e) => getDeleteProjectUrl(e)} data-uid={project.post_uid} className="bi bi-trash"></i></button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </div>
                                    </>
                                }
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

                        <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Delete Project</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetDeleteProjectUrl} />
                                    </div>
                                    <div className="modal-body">
                                        You will not be able to recover this project.
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetDeleteProjectUrl}>Close</button>
                                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={(e) => deleteProject(e)}>Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id="deleteBlogModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false">
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

                        <div className="modal fade" id="shareProject" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">SHARE POST</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="shareProjectUrl" className="col-form-label">URL:</label>
                                            <input type="text" className="form-control" id="shareProjectUrl" />
                                            <input type="text" className="form-control" id="postUidP" />
                                        </div>
                                        <div className="mb-3 d-flex">
                                            <div style={{ padding: '5px' }}>
                                                <FacebookShareButton
                                                    url={prop.url}>
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton>
                                            </div>
                                            <div style={{ padding: '5px' }}>
                                                <TwitterShareButton
                                                    url={prop.url}>
                                                    <TwitterIcon size={32} round />
                                                </TwitterShareButton>
                                            </div>
                                            <div style={{ padding: '5px' }}>
                                                <WhatsappShareButton
                                                    url={prop.url}>
                                                    <WhatsappIcon size={32} round />
                                                </WhatsappShareButton>
                                            </div>
                                            <div style={{ padding: '5px' }}>
                                                <RedditShareButton
                                                    url={prop.url}>
                                                    <RedditIcon size={32} round />
                                                </RedditShareButton>
                                            </div>
                                            <div style={{ padding: '5px' }}>
                                                <EmailShareButton
                                                    url={prop.url}>
                                                    <EmailIcon size={32} round />
                                                </EmailShareButton>
                                            </div>
                                            <div style={{ padding: '5px' }}>
                                                <PinterestShareButton
                                                    url={prop.url}>
                                                    <PinterestIcon size={32} round />
                                                </PinterestShareButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-dark" onClick={copyProjectLink}>Copy URL</button>
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