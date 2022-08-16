import React, { useMemo } from "react";
import LoginImage from '../../images/Untitled-design.png';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function RegistrationSuccess() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => {
        const WEBFLOW_PAGE_ID = '62e887c2b75bb5d080c83294'
        const WEBFLOW_SITE_ID = '62c7a74dd5c3fb4c886564d2'

        var doc = document.getElementsByTagName("html")[0]
        console.log(" test " + doc);
        doc.setAttribute('data-wf-page', WEBFLOW_PAGE_ID)
        doc.setAttribute('data-wf-site', WEBFLOW_SITE_ID)
        console.log(doc.getAttribute('data-wf-page'));
    });
    const history = useNavigate();
    let name = useSelector(state => state.signup.name);
    let email = useSelector(state => state.signup.email);
    const changeLogin = () => {
        history("/Auth");
    }
    return (
        <div className='body-7'>
            <div className="wf-section">
                <div className="columns-10 w-row">
                    <div className="column-8 w-col w-col-6 w-col-stack">
                        <div className="form-block-5 w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" redirect="Dashboard" data-redirect="Dashboard" method="get" className="form-2">
                                <h1 className="heading-15">Thank you for registering {name}. A confirmation email has been sent to  {email}. </h1>
                                <p className="text-center mb-0" onClick={changeLogin} style={{ color: '#676d8f' }}>Log In Here</p>

                            </form>
                        </div>
                    </div>
                    <div className="column-9 w-col w-col-6 w-col-stack">
                        <div className="w-container">
                            <h1 className="heading-13">Registration Successful</h1>
                            {/* <div className="text-block-7">Enter your email to get your account back.</div> */}
                        </div>
                        <div className="w-container">
                            <img src={LoginImage}
                                loading="lazy"
                                width={606}
                                sizes="(max-width: 991px) 100vw, 48vw"
                                alt="loginimage"
                                className="image-16" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationSuccess;