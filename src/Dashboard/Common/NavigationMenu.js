/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo } from "react";
import SelectTagInput from "../../Dashboard/BlogPost/SelectTagInput";
import plus from '../../images/addIcon.png';
import project1 from '../../images/pexels-photo-539711-1.jpeg';
import project2 from '../../images/beautiful-bloom-blooming-979932.jpg';
import project3 from '../../images/pexels-photo-167699.jpeg'
function NavigationMenu() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => {
        const WEBFLOW_PAGE_ID = '62e09f1bbfb10386a27822d7'
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

    function quickImagePost() {
        console.log("quickImagePost function called");

    }

    return (
        <div data-duration-in="300" data-duration-out="100" data-current="Blog" data-easing="ease" className="tabs-2 w-tabs">
            <div className="navigation-menu-2 w-tab-menu">
                <a data-w-tab="ImagePost" className="navigation-item w-inline-block w-tab-link w--current">
                    <div className="text-block-13">Quick Post</div>
                </a>
                <a data-w-tab="VideoPost" className="navigation-item w-inline-block w-tab-link">
                    <div className="text-block-14">Custom Post</div>
                </a>
                <a data-w-tab="Blog" className="navigation-item w-inline-block w-tab-link">
                    <div className="text-block-15">Blog Post</div>
                </a>
                <a data-w-tab="MyProjects" className="navigation-item w-inline-block w-tab-link">
                    <div className="text-block-16">My Project</div>
                </a>
            </div>
            <div className="dash-tab-wrapper w-tab-content">
                <div data-w-tab="ImagePost" className="dashboard-section w-tab-pane">
                    <div className="container-13">
                        <h1 className="heading-18">Quick Post </h1>
                        <div className="dash-row">
                            <a href="#" className="white-box link-box paper-box w-inline-block">
                                <div className="box-padding paper-padding">
                                    <h3 className="doc-heading">Quick Image Post</h3>
                                    <img
                                        sizes="60px"
                                        width={60}
                                        src={plus}
                                        loading="lazy"
                                        alt="plusicon"
                                        className="image-18" />
                                </div>
                            </a>
                            <a href="#" className="white-box link-box paper-box w-inline-block">
                                <div className="box-padding paper-padding">
                                    <h3 className="doc-heading">Quick Video  Post</h3>
                                    <img
                                        sizes="60px"
                                        width={60}
                                        src={plus}
                                        loading="lazy"
                                        alt="plusicon"
                                        className="image-18" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div data-w-tab="VideoPost" className="dashboard-section w-tab-pane">
                    <div className="container-13">
                        <h1 className="heading-18">Custom Post </h1>
                        <div className="dash-row">
                            <a href="/CustomPost" className="white-box link-box paper-box w-inline-block">
                                <div className="box-padding paper-padding">
                                    <h3 className="doc-heading">Custom Post</h3>
                                    <img
                                        sizes="60px"
                                        width={60}
                                        src={plus}
                                        loading="lazy"
                                        alt="plusicon"
                                        className="image-18" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div data-w-tab="Blog" className="dashboard-section w-tab-pane w--tab-active">
                    <div className="container-18 w-container">
                        <div className="form-wrap w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-4">
                                <div className="ios-style-reset w-embed">
                                    <style dangerouslySetInnerHTML={{ __html: "\n input[type=text],\n input[type=email],\n input[type=tel] {\n /* Removes innershadow on form fields on iOS */\n border-radius: 0;\n                        -webkit-appearance: none;\n                        -moz-appearance: none;\n                        appearance: none;\n                      }\n                    " }} />
                                </div>
                                <h1 className="form-heading">Blog Generation</h1>
                                <div className="field-wrap">
                                    <SelectTagInput />
                                </div>
                                <div className="field-wrap">
                                    {/* <label htmlFor="name" className="form-field-label">Article URL</label> */}
                                    <input type="text" className="form-field w-input" autoComplete="off" maxLength={256} name="name" data-name="name" placeholder="Enter a URL" id="name" required />
                                </div>
                                <div className="orfield">
                                    <h3 className="heading-24">OR</h3>
                                </div>
                                <div className="field-wrap">
                                    {/* <label htmlFor="day" className="form-field-label">Select</label> */}
                                    <select id="day" name="day" data-name="day" required className="form-field select-field wide w-select">
                                        <option value>Select From Saved Article</option>
                                        <option value="Monday">https://www.agegracefullyamerica.com/technology-help/</option>
                                        <option value="Tuesday">https://www.internetsociety.org/issues/technology/</option>
                                        <option value="Wednesday">https://www.computerweekly.com/blogs</option>
                                        <option value="Thursday">https://www.gartner.com/en/information-technology/insights/information-technology-blogs</option>
                                    </select>
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
                    <div className="container-15 w-container">
                        <a href="/BlogPost" className="button-3 w-button">Submit</a>
                    </div>
                </div>
                <div data-w-tab="MyProjects" className="dashboard-section w-tab-pane">
                    <div className="container-13">
                        <h3 className="heading-20">Projects</h3>
                        <div className="project-grid">
                            <div className="template-left">
                                <div className="white-box full-width">
                                    <div className="box-padding">
                                        <img
                                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 87vw, (max-width: 991px) 90vw, 25vw"
                                            loading="lazy"
                                            src={project1}
                                            alt="project 1" />
                                        <h4 className="heading-19">Buzz - Fly High</h4>
                                        <h4 className="heading-21"><strong className="bold-text-5">The most efficient way of rendering the poor
                                            harm...</strong></h4>
                                        <h4 className="heading-21">#imitation #rich #poor #harmless #efficiency #teaching #wanting
                                            #socialmedia #hashtags</h4>
                                        <div className="project-message"><strong className="bold-text-6">Author - Carlos Ruiz Zafon</strong></div>
                                    </div>
                                </div>
                            </div>
                            <div className="template-left">
                                <div className="white-box full-width">
                                    <div className="box-padding">
                                        <img
                                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 87vw, (max-width: 991px) 90vw, 25vw"
                                            loading="lazy"
                                            src={project2}
                                            alt="project2" />
                                        <h4 className="heading-19">Buzz - Fly High</h4>
                                        <h4 className="bold-text-5"><strong className="heading-21">The most efficient way of rendering the poor
                                            harm...</strong></h4>
                                        <h4 className="heading-21">#imitation #rich #poor #harmless #efficiency #teaching #wanting
                                            #socialmedia #hashtags</h4>
                                        <div className="project-message"><strong>Author - Carlos Ruiz Zafon</strong></div>
                                    </div>
                                </div>
                            </div>
                            <div className="template-left">
                                <div className="white-box full-width">
                                    <div className="box-padding">
                                        <img
                                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 87vw, (max-width: 991px) 90vw, 25vw"
                                            loading="lazy"
                                            src={project3}
                                            alt="project3" />
                                        <h4 className="heading-19">Buzz - Fly High</h4>
                                        <h4 className="bold-text-5"><strong className="heading-21">The most efficient way of rendering the poor
                                            harm...</strong></h4>
                                        <h4 className="heading-21">#imitation #rich #poor #harmless #efficiency #teaching #wanting
                                            #socialmedia #hashtags</h4>
                                        <div className="project-message"><strong>Author - Carlos Ruiz Zafon</strong></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavigationMenu;