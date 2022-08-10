import React from "react";
import BuildAudienceLogo from '../../images/5.png';
function DashboardNavbar() {
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
                                <a href="#about" className="nav-link-3">Reset Password</a>
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