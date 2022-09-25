import React, { useEffect, useMemo } from 'react'
import DashboardNavbar from '../../Dashboard/Common/DashboardNavbar'
import Footer from '../../Common/Footer'
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

    return (
        <>
            <DashboardNavbar />
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
                                <div className="card mt-3">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx={12} cy={12} r={10} /><line x1={2} y1={12} x2={22} y2={12} /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>Website</h6>
                                            <span className="text-secondary">https://bootdey.com</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>Github</h6>
                                            <span className="text-secondary">bootdey</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>Twitter</h6>
                                            <span className="text-secondary">@bootdey</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x={2} y={2} width={20} height={20} rx={5} ry={5} /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>Instagram</h6>
                                            <span className="text-secondary">bootdey</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>Facebook</h6>
                                            <span className="text-secondary">bootdey</span>
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