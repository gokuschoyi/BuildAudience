import React, { useEffect, useMemo } from "react";
import DashboardNavbar from "../Common/DashboardNavbar";
import Footer from "../../Common/Footer";
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import StepFive from "./Steps/StepFive";
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

    const [tagLine, setTagLine] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [post, setPost] = React.useState('');
    const [mediaType, setMediaType] = React.useState('');
    const [step, setStep] = React.useState(1);

    const incrementStep = () => {
        setStep(step + 1);
    };

    const decrementStep = () => {
        setStep(step - 1);
    }

    console.log("step count" + step);

    function nextStep() {
        /* var tagline = document.getElementById("day")
        console.log(tagline.value)
        console.log(tagLine + category + post + mediaType) */
        /* if (tagLine === '' || category === '' || post === '' || mediaType === '') {
            alert("Please fill all the fields");
        } */
        var data = {
            tagLine: tagLine,
            category: category,
            post: post,
            mediaType: mediaType
        }
        console.log(data)
    }

    var data = {
        tagLine: tagLine,
        category: category,
        post: post,
        mediaType: mediaType
    }
    if (step === 2) {
        console.log(data)
    }

    const tagLineHandler = (e) => {
        setTagLine(e.target.value)
    }
    const categoryHandler = (e) => {
        setCategory(e.target.value)
    }
    const postHandler = (e) => {
        setPost(e.target.value)
    }
    const mediaTypeHandler = (e) => {
        setMediaType(e.target.value)
    }

    return (
        <>
            <div className="body-5">
                <DashboardNavbar />
                <div className="form-full-3">
                    <div className="form-wrapper-2 w-form">
                        <form id="email-form" type="submit" name="email-form" data-name="Email Form" redirect="/success" data-redirect="/success" method="get">
                            <div data-delay={4000} data-animation="cross" className="slider-2 w-slider" data-autoplay="false" data-easing="ease" data-hide-arrows="true" data-disable-swipe="true" data-autoplay-limit={0} data-nav-spacing={3} data-duration={240} data-infinite="false">
                                <div className="mask-2 w-slider-mask">
                                    <StepOne tagLineHandler={tagLineHandler} categoryHandler={categoryHandler} postHandler={postHandler} mediaTypeHandler={mediaTypeHandler} />
                                    <StepTwo />
                                    <StepThree />
                                    <StepFour />
                                    <StepFive />
                                </div>
                                <div className="line-bottom" />
                                <div className="previous w-slider-arrow-left"><img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e8d55effdfd0_arrow.svg" alt="" className="arrow-2" />
                                    <div className="previous-button-2" onClick={decrementStep}>Previous</div>
                                </div>
                                <div className="next w-slider-arrow-right">
                                    <div className="next-button-2" onClick={incrementStep}>Next</div>
                                </div>
                            </div>
                            {/*  <div className="mobile-nav-bottom" /> */}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CustomPost;