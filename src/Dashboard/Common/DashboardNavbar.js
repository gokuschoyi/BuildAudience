import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BuildAudienceLogo from '../../images/5.png';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationCenter } from "./NotificationIcon/NotificationCenter";
function DashboardNavbar() {
    const history = useNavigate();
    const handleLogout = useCallback(() => {
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('CompanyName');
        sessionStorage.removeItem('userTokenSession');
        localStorage.removeItem('userTokenLocal')
        history('/Auth');
    }, [history]);

    const handleProfile = useCallback(() => {
        history('/UserProfile');
    }, [history]);

    return (
        <div className="navbar-logo-left-2 wf-section">
            <div data-animation="default" data-collapse="medium" data-duration={400} data-easing="ease" data-easing2="ease" role="banner" className="navbar-logo-left-container shadow-three w-nav">
                <div className="navbar-wrapper-2">
                    <a href="/Dashboard" className="navbar-brand w-nav-brand"><img src={BuildAudienceLogo} loading="lazy" width={50} alt="Buildaudience Logo" /></a>
                    <h3 className="heading-9">BUILDAUDIENCE.ME</h3>
                    <div className="navIcon" style={{ translate: '400%', position: 'absolute' }}>
                        <NotificationCenter />
                    </div>

                    <nav role="navigation" className="nav-menu-wrapper-2 w-nav-menu">
                        <ul className="nav-menu-two-2 w-list-unstyled">
                            <li>
                                <div className="nav-divider-2" />
                            </li>
                            <li className="mobile-margin-top-11">
                                <button className="button-primary w-button" style={{ margin: '5px' }} onClick={handleProfile} >Profile</button>
                            </li>
                            <li className="mobile-margin-top-11">
                                <button className="button-primary w-button" style={{ margin: '5px' }} onClick={handleLogout}>Signout</button>
                            </li>
                        </ul>
                    </nav>
                    <div className="menu-button-2 w-nav-button">
                        <div className="icon-2 w-icon-nav-menu" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashboardNavbar;