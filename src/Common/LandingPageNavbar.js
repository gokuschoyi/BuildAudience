/* eslint-disable no-unreachable */
import React from 'react';
import BuildAudienceLogo from '../images/5.png';

function LandingPageNavbar() {
    return (
        <div className="navbar-logo-left-2 wf-section">
            <div data-animation="default" data-collapse="medium" data-duration={400} data-easing="ease" data-easing2="ease" role="banner" className="navbar-logo-left-container shadow-three w-nav">
                <div className="navbar-wrapper-2">
                    <a href="!#" className="navbar-brand w-nav-brand"><img src={BuildAudienceLogo} loading="lazy" width={50} alt="Buildaudience Logo" /></a>
                    <h3 className="heading-9">BUILDAUDIENCE.ME</h3>
                    <nav role="navigation" className="nav-menu-wrapper-2 w-nav-menu">
                        <ul className="nav-menu-two-2 w-list-unstyled">
                            <li>
                                <a href="#Home" className="nav-link-3">Home</a>
                            </li>
                            <li>
                                <a href="#about" className="nav-link-3">About</a>
                            </li>
                            <li>
                                <a href="#ContactUS" className="nav-link-3">Contact</a>
                            </li>
                            <li>
                                <div className="nav-divider-2" />
                            </li>
                            <li className="mobile-margin-top-11">
                                <a href="/Auth" className="button-primary w-button">Login</a>
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

export default LandingPageNavbar;