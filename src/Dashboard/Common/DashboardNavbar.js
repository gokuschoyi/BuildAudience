import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    setResetEmail,
    resetPasswordPending,
    resetPasswordSuccess,
    resetPasswordError
} from "./DashboardNavbarSlice";
import BuildAudienceLogo from '../../images/5.png';
function DashboardNavbar() {
    const dispatch = useDispatch();
    const { userEmail } = useSelector(state => state.resetPassword);

    function setEmail(e) {
        e.preventDefault();
        var email = sessionStorage.getItem('userEmail');
        dispatch(setResetEmail(email));
    }

    const resetPassword = useCallback(async () => {
        if (userEmail === '') {
            return
        }
        var data = {
            email: userEmail
        }
        try {
            dispatch(resetPasswordPending());
            let result = await axios.post(process.env.REACT_APP_BURL + '/user/reset_password', data, {
                withCredentials: false
            });
            if (result.data.error) {
                dispatch(resetPasswordError(result.data.error.message));
            }
            else {
                dispatch(resetPasswordSuccess());
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

    return (
        <div className="navbar-logo-left-2 wf-section">
            <div data-animation="default" data-collapse="medium" data-duration={400} data-easing="ease" data-easing2="ease" role="banner" className="navbar-logo-left-container shadow-three w-nav">
                <div className="navbar-wrapper-2">
                    <a href="/Dashboard" className="navbar-brand w-nav-brand"><img src={BuildAudienceLogo} loading="lazy" width={50} alt="Buildaudience Logo" /></a>
                    <h3 className="heading-9">BUILDAUDIENCE.ME</h3>
                    <nav role="navigation" className="nav-menu-wrapper-2 w-nav-menu">
                        <ul className="nav-menu-two-2 w-list-unstyled">
                            <li>
                                <div className="nav-divider-2" />
                            </li>
                            <li>
                                <a href="!" className="button-primary w-button" onClick={(e) => setEmail(e)}>Reset Password</a>
                            </li>
                            <li className="mobile-margin-top-11">
                                <a href="/Auth" className="button-primary w-button">Signout</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="menu-button-2 w-nav-button">
                        <div className="icon-2 w-icon-nav-menu" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DashboardNavbar;