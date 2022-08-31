import React, { useEffect, useMemo } from "react";
import SignupImage from '../../images/Untitled-design.png';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signupSuccess, signupFailure, signupPending, userInfo, resetF } from "./SignupSlice";

function Signup(props) {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => {
        const WEBFLOW_PAGE_ID = '62e88877bacd8caa52803a2a'
        const WEBFLOW_SITE_ID = '62c7a74dd5c3fb4c886564d2'

        var doc = document.getElementsByTagName("html")[0]
/*         console.log(" test " + doc);
 */        doc.setAttribute('data-wf-page', WEBFLOW_PAGE_ID)
        doc.setAttribute('data-wf-site', WEBFLOW_SITE_ID)
/*         console.log(doc.getAttribute('data-wf-page'));
 */    });

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

    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [companyName, setCompanyName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const history = useNavigate();
    const dispatch = useDispatch();
    const { SignupIsLoading, SignupError, error } = useSelector(state => state.signup);

    /* form validation needs fixing */

    function removeError() {
        console.log("button close")
        dispatch(resetF());
    }

    async function signup(e) {
        console.log("signup function called");
        if (email === '' || name === '' || companyName === '' || password === '') {
            return;
        }
        var data = {
            email: email,
            display_name: name,
            company_name: companyName,
            password: password
        }
        console.log(data);
        try {
            dispatch(signupPending());
            let result = await axios.post(process.env.REACT_APP_BURL + '/user/signup', data, {
                withCredentials: false
            });
            if (result.data.error) {
                dispatch(signupFailure(result.data.error));
                console.log(result.data.error);
            }
            else {
                dispatch(signupSuccess());
                dispatch(userInfo(data));
                history("/RegistrationSuccess");
            }
        }
        catch (error) {
        }
    }

    return (
        <div className="body-8">
            <div className="wf-section">
                <div className="w-row">
                    <div className="column-8 w-col w-col-6 w-col-stack w-col-small-small-stack">
                        {error && <div><div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>{SignupError}</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={removeError}>
                            </button>
                        </div></div>}
                        <div className="w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" redirect="Dashboard" data-redirect="Dashboard" method="get" className="form-2">
                                <h1 className="heading-16">Sign Up</h1>
                                <label htmlFor="name" className="email_text">Email</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} className="email w-input" autoFocus={true} maxLength={256} name="name" data-name="Name" placeholder="Email" id="name" required />
                                <label htmlFor="name-2" className="name_text">Name</label>
                                <input type="text" onChange={(e) => setName(e.target.value)} className="name w-input" maxLength={256} name="name-2" data-name="Name 2" placeholder="Enter your name" id="name-2" required />
                                <label htmlFor="name-2" className="c_name_text">Company Name</label>
                                <input type="text" onChange={(e) => setCompanyName(e.target.value)} className="c_name w-input" maxLength={256} name="name-2" data-name="Name 2" placeholder="Enter company name" id="name-2" required />
                                <label htmlFor="email" className="field-label-7">Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} className="password w-input" maxLength={256} name="email" data-name="Email" placeholder="Enter password" id="email" required />
                                <input type="submit" onClick={signup} data-wait="Please wait..." defaultValue="Submit" style={{ filter: 'hue-rotate(97deg)', marginTop: '20px' }} className="submit-button w-button" />
                            </form>
                            <div className="text-block-6">Already have an account? <span onClick={props.changeAuthMode} data-w-id="f87978c0-b3de-5b56-4b46-68eae8a33b23" className="text-span-4" style={{ textDecoration: 'none' }} onMouseOver={getUnderline} onMouseLeave={removeUnderline}>Sign in</span></div>
                            {SignupIsLoading && <div className="d-flex justify-content-center" style={{ zIndex: '2', paddingTop: '20px' }}>
                                <div className="spinner-border text-danger" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div>}
                        </div>

                    </div>
                    <div className="column-9 w-col w-col-6 w-col-stack w-col-small-small-stack">
                        <div className="w-container">
                            <h1 className="heading-13">Welcome To<br />BUILDAUDIENCE</h1>
                            <div className="text-block-7">Create an account and start building your audience now!</div>
                        </div>
                        <div className="w-container">
                            <img src={SignupImage}
                                loading="lazy"
                                width={606}
                                sizes="(max-width: 991px) 100vw, 48vw"
                                alt="SignupImage"
                                className="image-16" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Signup;