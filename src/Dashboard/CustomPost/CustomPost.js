import React, { useEffect, useMemo } from "react";
import DashboardNavbar from "../Common/DashboardNavbar";
import Footer from "../../Common/Footer";
import PhotoGallery from "./PhotoGallery";
import FinalPhotoGallery from "./FinalPhotoGallery";
function CustomPost() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => {
        const WEBFLOW_PAGE_ID = '62e88b73fbcb3a42622e64de'
        const WEBFLOW_SITE_ID = '62c7a74dd5c3fb4c886564d2'

        var doc = document.getElementsByTagName("html")[0]
        doc.setAttribute('data-wf-page', WEBFLOW_PAGE_ID)
        doc.setAttribute('data-wf-site', WEBFLOW_SITE_ID)
    });

    useEffect(() => {
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
        window.Webflow && window.Webflow.require('ix2').init();
        document.dispatchEvent(new Event('readystatechange'))
    })
    return (
        <>
            <div className="body-5">
                <DashboardNavbar />
                <div className="form-full-3">
                    <div className="form-wrapper-2 w-form">
                        <form id="email-form" name="email-form" data-name="Email Form" redirect="/success" data-redirect="/success" method="get">
                            <div data-delay={4000} data-animation="cross" className="slider-2 w-slider" data-autoplay="false" data-easing="ease" data-hide-arrows="true" data-disable-swipe="true" data-autoplay-limit={0} data-nav-spacing={3} data-duration={240} data-infinite="false">
                                <div className="mask-2 w-slider-mask">
                                    <div data-w-id="f2b31280-0b97-8741-e941-32cae7d49717" className="slide-2 w-slide">
                                        <div className="slider-content-wrap">
                                            <div className="form-content">
                                                <div className="form-title-wrap">
                                                    <div className="form-section-title">Let's get started</div>
                                                    <p className="form-paragraph">Please fill in the details below so that we can generate an<br />awesome post for you.<br /></p>
                                                </div>
                                                <div className="form-wrap-2 extra-space">
                                                    <label htmlFor="Name" className="field-label-11">Enter Tagline</label>
                                                    <input type="text" className="text-field-3 w-input" maxLength={256} name="Name" data-name="Name" placeholder="eg. Nike - Just Do It" id="Name" />
                                                    <label htmlFor="day" className="field-label-11">Category</label>
                                                    <select id="day" name="day" data-name="day" required className="form-field select-field wide w-select">
                                                        <option value>Select a Category</option>
                                                        <option value="Anxiety">Anxiety</option>
                                                        <option value="Change">Change</option>
                                                        <option value="Choice">Choice</option>
                                                        <option value="Confidence">Confidence</option>
                                                        <option value="Courage">Courage</option>
                                                        <option value="Death">Death</option>
                                                        <option value="Dreams">Dreams</option>
                                                        <option value="Excellence">Excellence</option>
                                                        <option value="Failure">Failure</option>
                                                        <option value="Fairness">Fairness</option>
                                                        <option value="Fear">Fear</option>
                                                        <option value="Forgiveness">Forgiveness</option>
                                                        <option value="Freedom">Freedom</option>
                                                        <option value="Future">Future</option>
                                                        <option value="Happiness">Happiness</option>
                                                        <option value="Inspiration">Inspiration</option>
                                                        <option value="Kindness">Kindness</option>
                                                        <option value="Leadership">Leadership</option>
                                                        <option value="Life">Life</option>
                                                        <option value="Living">Living</option>
                                                        <option value="Love">Love</option>
                                                        <option value="Pain">Pain</option>
                                                        <option value="Past">Past</option>
                                                        <option value="Success">Success</option>
                                                        <option value="Time">Time</option>
                                                        <option value="Today">Today</option>
                                                        <option value="Truth">Truth</option>
                                                        <option value="Work">Work</option>
                                                        <option value="Technology">Technology</option>
                                                        <option value="Naval Ravikant">Naval Ravikant</option>
                                                    </select>
                                                    <label htmlFor="day-2" className="field-label-11">Post</label>
                                                    <select id="day-2" name="day-2" data-name="Day 2" required className="form-field select-field wide w-select">
                                                        <option value>Select Post Medium</option>
                                                        <option value="Facebook">Facebook</option>
                                                        <option value="Instagram">Instagram</option>
                                                        <option value="Story">Story</option>
                                                    </select>
                                                    <label htmlFor="day-2" className="field-label-11">Media Type</label>
                                                    <select id="day-2" name="day-2" data-name="Day 2" required className="form-field select-field wide w-select">
                                                        <option value>Select Media Type</option>
                                                        <option value="Image">Image</option>
                                                        <option value="Video">Video</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div style={{ opacity: 0 }} className="title-left" />
                                            <div style={{ opacity: 0 }} className="details-right"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e89cc8ffdfdb_1.svg" alt="CounterImage" className="counter-image" />
                                                <div className="text-counter">1 / 5</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-w-id="f2b31280-0b97-8741-e941-32cae7d49734" className="slide-2 w-slide">
                                        <div className="slider-content-wrap">
                                            <div className="form-content-3">
                                                <div style={{ WebkitTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', opacity: 0 }} className="form-title-wrap-2">
                                                    <div className="form-section-title-2">Quote</div>
                                                    <p className="paragraph-3"><strong>You play the hand you're dealt. I think the game's worthwhile.</strong><br /></p>
                                                    <div>
                                                        <div className="text-block-12">Christopher Reeve</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="!#" className="button-11 w-button">Regenerate Quote</a>
                                            <div style={{ opacity: 0 }} className="title-left" />
                                            <div style={{ opacity: 0 }} className="details-right"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e854afffdfda_2.svg" alt="counterImage" className="counter-image" />
                                                <div className="text-counter">2 / 5</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-w-id="f2b31280-0b97-8741-e941-32cae7d4974b" className="slide-2 w-slide">
                                        <div className="slider-content-wrap">
                                            <div className="form-content-3">
                                                <div style={{ WebkitTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', opacity: 0 }} className="form-title-wrap-2">
                                                    <div className="form-section-title-2">Select an Image</div>
                                                </div>
                                                <div className="div-block-15">
                                                    <div>
                                                        <input type="text" className="text-field-4 w-input" maxLength={256} name="field" data-name="Field" placeholder="Search Image" id="field" required />
                                                    </div>
                                                    <div>
                                                        <a href="!#" className="button-12 w-button">Search</a>
                                                    </div>
                                                </div>
                                                <div style={{ overflow: 'scroll', height: '400px' }}>
                                                    <PhotoGallery />
                                                </div>
                                                <div className="div-block-14">
                                                    <a href="!#" className="button-2 w-button">Load More</a>
                                                </div>
                                            </div>
                                            <div style={{ opacity: 0 }} className="details-right"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e820deffdfd8_3.svg" alt="counterImage" className="counter-image" />
                                                <div className="text-counter">3 / 5</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-w-id="f2b31280-0b97-8741-e941-32cae7d49763" className="slide-2 w-slide">
                                        <div className="slider-content-wrap">
                                            <div className="form-content-3">
                                                <div className="form-title-wrap-2">
                                                    <div className="form-section-title-2">Posts</div>
                                                    <p className="paragraph-3">doggo<br /></p>
                                                    <div>Select an Image to generate your post</div>
                                                </div>
                                                <div>
                                                    <FinalPhotoGallery />
                                                </div>
                                            </div>
                                            <div style={{ opacity: 0 }} className="details-right"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e86aaeffdfd7_4.svg" alt="imageCounter" className="counter-image" />
                                                <div className="text-counter">4 / 5</div>
                                            </div>
                                            <div style={{ opacity: 0 }} className="title-left" />
                                        </div>
                                    </div>
                                    <div data-w-id="f2b31280-0b97-8741-e941-32cae7d4977d" className="slide-2 w-slide">
                                        <div className="slider-content-wrap">
                                            <div className="form-content-3 final">
                                                <div style={{ WebkitTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, 25PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', opacity: 0 }} className="form-title-wrap-2">
                                                    <div className="form-section-title-2">Create Post</div>
                                                    <p className="paragraph-3">Click Save and we will Notify you when your post is created.<br /></p>
                                                    <p className="paragraph-3"><strong>You play the hand you're dealt. I think the game's worthwhile.</strong><br /></p>
                                                    <p className="paragraph-3">#cardgames #fun #familytime #unwind #relaxation #enjoyment #passion #worthwhile #handpicked #challenging<br /></p>
                                                    <div>
                                                        <img
                                                            src="images/dog4.jpg"
                                                            loading="lazy"
                                                            srcSet="images/dog4-p-500.jpg 500w, images/dog4-p-800.jpg 800w, images/dog4-p-1080.jpg 1080w, images/dog4-p-1600.jpg 1600w, images/dog4-p-2000.jpg 2000w, images/dog4-p-2600.jpg 2600w, images/dog4.jpg 2888w"
                                                            sizes="(max-width: 479px) 27vw, (max-width: 767px) 25vw, 210px"
                                                            alt="dog"
                                                            className="image-24" /></div>
                                                </div>
                                                <input type="submit" defaultValue="Save" data-wait="Working on that..." wait="Calculating Nash Equilibrium..." data-ix="show-content-onslide" className="submit-button-4 w-button" />
                                            </div>
                                            <div style={{ opacity: 0 }} className="title-left" />
                                            <div style={{ opacity: 0 }} className="details-right"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e8f1dbffdfd6_6.svg" alt="CounterImage" className="counter-image" />
                                                <div className="text-counter">5 / 5</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="line-bottom" />
                                <div className="previous w-slider-arrow-left"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e8d55effdfd0_arrow.svg" alt="" className="arrow-2" />
                                    <div className="previous-button-2">Previous</div>
                                </div>
                                <div className="next w-slider-arrow-right">
                                    <div className="next-button-2">Next</div>
                                </div>
                            </div>
                            {/*  <div className="mobile-nav-bottom" /> */}
                        </form>
                        <div className="success-message w-form-done">
                            <div>Thanks! I have received your form submission, I'll get back to you shortly!</div>
                        </div>
                        <div className="error-message w-form-fail">
                            <div>Oops! Something went wrong while submitting the form</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CustomPost;