import React, { useEffect, useMemo, useCallback } from 'react'
import DashboardNavbar from '../../Dashboard/Common/DashboardNavbar'
import Footer from '../../Common/Footer'
import { ToastContainer, toast } from 'react-toastify';
import { Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    setResetEmail,
    rPasswordPending,
    rPasswordSuccess,
    rPasswordError,
    resetPasswordReset
} from "../../Dashboard/Common/DashboardNavbarSlice";
function UserProfile() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => {
        const WEBFLOW_PAGE_ID = '62e887c2b75bb5d080c83294'
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

    let [editProfile, setEditProfile] = React.useState("profile");
    const changeEditProfile = () => {
        setEditProfile(editProfile === "profile" ? "editProfile" : "profile");
    }

    useEffect(() => {
        if (editProfile === "editProfile") {
            let picturePreview = document.querySelector(".imagePreview");
            let actionButton = document.querySelector(".action-button");
            let fileInput = document.querySelector("input[name='fileInput']");
            let fileReader = new FileReader();

            const DEFAULT_IMAGE_SRC = "https://www.drupal.org/files/profile_default.png";

            actionButton.addEventListener("click", () => {
                if (picturePreview.src !== DEFAULT_IMAGE_SRC) {
                    resetImage();
                } else {
                    fileInput.click();
                }
            });

            fileInput.addEventListener("change", () => {
                refreshImagePreview();
            });

            function resetImage() {
                setActionButtonMode("upload");
                picturePreview.src = DEFAULT_IMAGE_SRC;
                fileInput.value = "";
            }

            function setActionButtonMode(mode) {
                let modes = {
                    "upload": function () {
                        actionButton.innerText = "Upload avatar";
                        actionButton.classList.remove("mode-remove");
                        actionButton.classList.add("mode-upload");
                    },
                    "remove": function () {
                        actionButton.innerText = "Remove avatar";
                        actionButton.classList.remove("mode-upload");
                        actionButton.classList.add("mode-remove");
                    }
                }
                return (modes[mode]) ? modes[mode]() : console.error("unknown mode");
            }

            function refreshImagePreview() {
                if (picturePreview.src !== DEFAULT_IMAGE_SRC) {
                    picturePreview.src = DEFAULT_IMAGE_SRC;
                } else {
                    if (fileInput.files && fileInput.files.length > 0) {
                        fileReader.readAsDataURL(fileInput.files[0]);
                        fileReader.onload = (e) => {
                            picturePreview.src = e.target.result;
                            setActionButtonMode("remove");
                        }
                    }
                }
            }

            refreshImagePreview();
        }

    }, [editProfile]);

    const dispatch = useDispatch();
    const { userEmail } = useSelector(state => state.resetPassword);
    const { resetPasswordPending, resetPasswordSuccess, resetPasswordError } = useSelector(state => state.resetPassword);

    function setEmail(e) {
        e.preventDefault();
        var email = sessionStorage.getItem('userEmail');
        dispatch(setResetEmail(email));
    }

    function removeError() {
        dispatch(resetPasswordReset())
    }
    const resetPassword = useCallback(async () => {
        if (userEmail === '') {
            return
        }
        var data = {
            email: userEmail
        }
        try {
            dispatch(rPasswordPending());
            let result = await axios.post(process.env.REACT_APP_BURL + '/user/reset_password', data, {
                withCredentials: false
            });
            if (result.data.error) {
                dispatch(rPasswordError(result.data.error.message));
            }
            else {
                dispatch(rPasswordSuccess());
            }
        }
        catch (error) {
            /* console.log("catch")
            console.log(error.message) */
        }
    }, [userEmail, dispatch]);

    useEffect(() => {
        if (userEmail !== '') {
            resetPassword();
        }
    }, [userEmail, resetPassword]);

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
        toastId: customId,
        type: "warning"
    });
    const updateSuccess = () => toast.update(toastId.current, { render: "An email has been sent to you.", type: toast.TYPE.SUCCESS, autoClose: 5000, transition: Zoom });
    const updateError = () => toast.update(toastId.current, { render: "Oops, something went wrong.", type: toast.TYPE.WARNING, autoClose: 5000, transition: Zoom });

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

    return (
        <>
            <DashboardNavbar />
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
            <div className="container" style={{ paddingTop: '115px' }}>
                <div className="main-body">
                    <div>
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Profile_Picture" className="imagePreview rounded-circle" width={150} />
                                            <div className="mt-3">
                                                <h4>John Doe</h4>
                                                <p className="text-secondary mb-1">Full Stack Developer</p>
                                                <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                                {editProfile === 'editProfile' ?
                                                    <>
                                                        <button className="action-button mode-upload btn btn-outline-dark">Change Picture</button>
                                                        <input className="file-upload" type="file" accept="image/*" name="fileInput" style={{ position: 'absolute', width: '0px', height: '0px', left: '-999999px' }} />
                                                    </> : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3 d-flex justify-content-between align-items-center">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item flex-wrap">
                                            <a href="!" className="button-primary w-button" style={{ margin: '5px' }} onClick={(e) => setEmail(e)} >Reset Password</a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-8">
                                {editProfile === 'profile' ?
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Full Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    Kenneth Valdez
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    fip@jukmuh.al
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Phone</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    (239) 816-9029
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Mobile</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    (320) 380-4539
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Address</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    Bay Area, San Francisco, CA
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <button className="btn btn-dark " onClick={changeEditProfile}>Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-sm-3 d-flex align-items-center">
                                                    <h6 className="mb-1">Full Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="text" className="form-control" defaultValue="John Doe" />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row mb-3">
                                                <div className="col-sm-3 d-flex align-items-center">
                                                    <h6 className="mb-1">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="text" className="form-control" defaultValue="john@example.com" />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row mb-3">
                                                <div className="col-sm-3 d-flex align-items-center">
                                                    <h6 className="mb-1">Phone</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="text" className="form-control" defaultValue="(239) 816-9029" />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row mb-3">
                                                <div className="col-sm-3 d-flex align-items-center">
                                                    <h6 className="mb-1">Mobile</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="text" className="form-control" defaultValue="(320) 380-4539" />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row mb-3">
                                                <div className="col-sm-3  d-flex align-items-center">
                                                    <h6 className="mb-1">Address</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="text" className="form-control" defaultValue="Bay Area, San Francisco, CA" />
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <button className="btn btn-dark " onClick={changeEditProfile}>Save Changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserProfile