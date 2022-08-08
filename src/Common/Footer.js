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
                    <a href="!#" className="footer-brand w-inline-block"><img src={BuildAudienceLogo} loading="lazy" alt="logo" className="image-7" /></a>
                    <div className="footer-block-two">
                        <div className="footer-title">Company</div>
                        <a href="!#" className="footer-link-two">How it works</a>
                        <a href="!#" className="footer-link-two">About</a>
                        <a href="!#" className="footer-link-two">Docs</a>
                    </div>
                    <div className="footer-block-two">
                        <div className="footer-title">Quick Link</div>
                        <a href="!#" className="footer-link-two">Pricing</a>
                        <a href="!#" className="footer-link-two">Resources</a>
                    </div>
                    <div className="footer-form w-form">
                        <form id="wf-form-Footer-Form" name="wf-form-Footer-Form" data-name="Footer Form" method="get" className="footer-form-container">
                            <div className="footer-title">Subscribe</div>
                            <div className="footer-form-block">
                                <input type="email" className="footer-form-field w-input" maxLength={256} name="Footer-Email-2" data-name="Footer Email 2" aria-label="Get product updates" placeholder="Subscribe to Newsletter" id="Footer-Email-2" required />
                                <input type="submit" defaultValue data-wait="Please wait..." className="footer-form-submit w-button" style={{}} />
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