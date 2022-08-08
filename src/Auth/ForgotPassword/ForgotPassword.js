import React, { useMemo } from "react";
import LoginImage from '../../images/Untitled-design.png';

function ForgotPassword() {
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

    return (
        <div className='body-7'>
            <div className="wf-section">
                <div className="columns-10 w-row">
                    <div className="column-8 w-col w-col-6 w-col-stack">
                        <div className="form-block-5 w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" redirect="Dashboard" data-redirect="Dashboard" method="get" className="form-2">
                                <h1 className="heading-15">Forgot Password</h1>
                                <label htmlFor="name" className="email_text">Email</label>
                                <input type="email" className="email w-input" autoFocus={true} maxLength={256} name="name" data-name="Name" placeholder="Enter yout Email" id="name" required />
                                <div className="text-block-5"></div>
                                <input type="submit" data-wait="Please wait..." defaultValue="Submit" className="submit-button w-button" />

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
                            <h1 className="heading-13">Password Recovery</h1>
                            <div className="text-block-7">Enter your email to get your account back.</div>
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

export default ForgotPassword;