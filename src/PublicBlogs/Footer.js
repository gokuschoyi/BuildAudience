import React from 'react';
import BuildAudienceLogo from '../images/5.png';
import LinkedinLogo from '../images/linkedin.png';
import FacebookLogo from '../images/facebook.png';
import TwitterLogo from '../images/twitter.png';

function Footer() {
    return (
        <section className="footer-light wf-section">
            <div className="container-2">
                <div className="footer-wrapper-two">
                    <a href="!" className="footer-brand w-inline-block"><img src={BuildAudienceLogo} loading="lazy" alt="logo" className="image-7" /></a>
                    <div className="footer-form w-form">
                        <form id="wf-form-Footer-Form" name="wf-form-Footer-Form" data-name="Footer Form" method="get" className="footer-form-container">
                            <div className="footer-title" style={{ paddingTop: '20px' }}>Made using BUILDAUDIENCE.ME</div>
                        </form>
                    </div>
                </div>
                <div className="footer-divider-two" />
                <div className="footer-bottom">
                    <div className="footer-copyright">© 2022 Tektorch. All rights reserved</div>
                    <div className="footer-social-block-two">
                        <a href="!#" className="footer-social-link w-inline-block"><img src={LinkedinLogo} loading="lazy" width={40} alt="linkedin-logo" className="image-4" /></a>
                        <a href="!#" className="footer-social-link w-inline-block"><img src={FacebookLogo} loading="lazy" width={40} alt="facebook-logo" className="image-5" /></a>
                        <a href="!#" className="footer-social-link w-inline-block"><img src={TwitterLogo} loading="lazy" width={40} alt="twitter-logo" className="image-6" /></a>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Footer;