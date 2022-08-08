import React, { useMemo, useEffect } from "react";
/* import Footer from "./Common/Footer"; */
import ImageFull from "./images/Technology-is-only-meaningful-when-it-reaches-the-people..png";
import ImageGrow from "./images/The-only-constant-in-the-technology-industry-is-change.-Marc-Benioff.png";
import ImageHeading from "./images/Add-a-heading.png";
import LandingPageNavbar from "./Common/LandingPageNavbar";
import Footer from "./Common/Footer";

function LandingPage() {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => {
    const WEBFLOW_PAGE_ID = '62cbbf2d4edab16ac09c6462'
    const WEBFLOW_SITE_ID = '62c7a74dd5c3fb4c886564d2'

    var doc = document.getElementsByTagName("html")[0]
    console.log(" test " + doc);
    doc.setAttribute('data-wf-page', WEBFLOW_PAGE_ID)
    doc.setAttribute('data-wf-site', WEBFLOW_SITE_ID)
    console.log(doc.getAttribute('data-wf-page'));
  });

  useEffect(() => {
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require('ix2').init();
    document.dispatchEvent(new Event('readystatechange'))
  })

  return (
    <div className="body-2">
      <LandingPageNavbar />
      <div
        id="Home"
        style={{ filter: "blur(0px)" }}
        className="section-5 wf-section"
      >
        <div className="div-block-5">
          <div className="div-block-6">
            <h1 className="dashboardhead">
              Build your Audience{" "}
              <span
                data-w-id="5934ee41-aadb-f55f-f928-3fcd566d8b60"
                style={{ filter: "hue-rotate(180deg) saturate(0%)" }}
                className="text-span-2"
              >
                Stress Free.
              </span>
            </h1>
            <div className="text-block">
              <strong className="bold-text-3">
                Reach more customers and grow your audience now.
              </strong>
            </div>
            <a
              data-w-id="90e348b9-5fb0-23d0-731b-abed537b964f"
              style={{ filter: "hue-rotate(335deg)" }}
              href="/Auth"
              className="button-3 w-button"
            >
              Get Started
            </a>
          </div>
          <div className="div-block-12">
            <img
              src={ImageFull}
              alt="Buildaudience Logo"
              className="image-10"
              data-w-id="7788b65e-5a4b-a8bc-1dff-f6a462cc0a90"
            />
          </div>
        </div>
      </div>
      <div
        id="about"
        style={{ filter: "blur(0px)" }}
        className="about wf-section"
      >
        <div className="w-container">
          <div className="div-block-7">
            <div className="div-block-9">
              <h1 id="about_heading" className="heading-6">
                Get the most out of your marketing efforts and grow your
                business.
              </h1>
              <div className="text-block-2">
                <strong className="bold-text">
                  Looking to grow your customer base? BuildAudience helps
                  businesses build an audience by providing them with simple
                  ,smart and easy to use services to create and distribute
                  engaging content.
                </strong>
              </div>
            </div>
            <div className="div-block-8">
              <div className="div-block-10">
                <img
                  src={ImageHeading}
                  loading="lazy"
                  width={430}
                  alt=""
                  className="image-10 new_image"
                />
              </div>
              <div className="div-block-13">
                <h1 className="heading-7">About</h1>
                <div className="text-block-17">
                  <strong className="bold-text-2">
                    If you're a small business owner, you know how important it
                    is to reach your target audience. But with so many marketing
                    options out there, it can be hard to know where to start.
                    That's where{" "}
                  </strong>
                  <span className="text-span-6">
                    <strong className="bold-text-2">buildaudience.me</strong>
                  </span>
                  <strong className="bold-text-2">
                    {" "}
                    comes in. <br />
                    <br />
                    It's easy to use, and it's affordable, so it's a great
                    option for businesses that are on a tight budget. Plus, it's
                    effective, so you can be sure that your marketing efforts
                    will actually pay off. Buildaudience.me is a marketing app
                    that helps businesses in creating promotional media. With
                    buildaudience.me, businesses can easily create beautiful,
                    engaging, and effective marketing content that drives
                    results.
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ filter: "blur(0px)" }} className="section-7 wf-section">
        <div>
          <div>
            <h1 className="heading-8">Make your marketing work for you!</h1>
            <div className="text-block-3">
              <strong className="bold-text-4">
                Get your message out there and grow your business.
              </strong>
            </div>
          </div>
        </div>
        <div className="div-block-11">
          <img
            src={ImageGrow}
            loading="lazy"
            width={799}
            sizes="(max-width: 991px) 100vw, 799px"
            alt=""
            className="image-15"
          />
        </div>
      </div>
      <div
        id="ContactUS"
        style={{ filter: "blur(0px)" }}
        className="contactus wf-section"
      >
        <div className="container-8 w-container">
          <div className="form-block-3 w-form">
            <form
              id="email-form"
              name="email-form"
              data-name="Email Form"
              /* method="get" */
              className="form"
            >
              <h1 className="heading-10">Contact us</h1>
              <label htmlFor="name" className="field-label">
                Name
              </label>
              <input
                type="email"
                className="w-input"
                maxLength={256}
                name="email-4"
                data-name="Email 4"
                placeholder
                id="email-4"
                required
              />
              <label htmlFor="email" className="field-label">
                Email Address
              </label>
              <input
                type="email"
                className="w-input"
                maxLength={256}
                name="email"
                data-name="Email"
                placeholder
                id="email"
                required
              />
              <label htmlFor="email-3" className="field-label">
                Contact
              </label>
              <input
                type="email"
                className="w-input"
                maxLength={256}
                n
                ame="email-2"
                data-name="Email 2"
                placeholder
                id="email-2"
                required
              />
              <label htmlFor="field" className="field-label">
                Message
              </label>
              <textarea
                placeholder="Enter your message"
                maxLength={5000}
                id="field"
                name="field"
                data-name="field"
                className="textarea w-input"
                defaultValue={""}
              />
              <input
                type="submit"
                defaultValue="Submit"
                data-wait="Please wait..."
                className="button-3 w-button"
              />
            </form>
            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
