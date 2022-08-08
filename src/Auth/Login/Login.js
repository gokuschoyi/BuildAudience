import React, { useEffect, useMemo } from 'react';
import LoginImage from '../../images/Untitled-design.png'
function Login(props) {

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

    useEffect(() => {
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
        window.Webflow && window.Webflow.require('ix2').init();
        document.dispatchEvent(new Event('readystatechange'))
    })

    function getUnderline(e) {
        e.target.style.textDecoration = "underline";
    }
    function removeUnderline(e) {
        e.target.style.textDecoration = "none";
    }

    return (
        <div className='body-7'>
            <div className="wf-section">
                <div className="columns-10 w-row">
                    <div className="column-8 w-col w-col-6 w-col-stack">
                        <div className="form-block-5 w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" redirect="Dashboard" data-redirect="Dashboard" method="get" className="form-2">
                                <h1 className="heading-15">Sign In</h1>
                                <label htmlFor="name" className="email_text">Email</label>
                                <input type="text" className="email w-input" autoFocus={true} maxLength={256} name="name" data-name="Name" placeholder="Enter yout Email" id="name" required />
                                <label htmlFor="email" className="field-label-7">Password</label>
                                <input type="email" className="password w-input" maxLength={256} name="email" data-name="Email" placeholder="Enter Password" id="email" required />
                                <a href="/ForgotPassword"><div className="text-block-4">Forgot Password?</div></a>
                                <input type="submit" data-wait="Please wait..." defaultValue="Submit" className="submit-button w-button" />
                                <div className="text-block-5">Don't have an account? <span className="text-span-3" onClick={props.changeAuthMode} style={{ textDecoration: 'none' }} onMouseOver={getUnderline} onMouseLeave={removeUnderline}>Sign up</span>
                                </div>
                            </form>
                            <div className="w-form-done">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="w-form-fail">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                    </div>
                    <div className="column-9 w-col w-col-6 w-col-stack">
                        <div className="w-container">
                            <h1 className="heading-13">Welcome Back</h1>
                            <div className="text-block-7">Log in and start building your audience now!</div>
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

export default Login;