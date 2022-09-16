import React, { useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify';
import BlogPostNavbar from '../BlogPostnavbar'
import Footer from '../../../Common/Footer'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bg from '../../../images/Untitled-design-1.png'
import Image1 from '../../../images/photo-1561480643-94fba607e578.jpeg'
import Image2 from '../../../images/photo-1543336472-fcf478c443db.jpeg'
import Image3 from '../../../images/photo-1507646227500-4d389b0012be.jpeg'
import Image4 from '../../../images/pexels-photo-167699.jpeg'
import Image5 from '../../../images/Untitled-design-1.png'
function BlogPost() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => {
        const WEBFLOW_PAGE_ID = '62e8d4ab87f0bd93beab0ab6'
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
    const history = useNavigate();


    const { blogPostdata } = useSelector(state => state.blogPost)

    useEffect(() => {
        if (blogPostdata === '') {
            history("/Dashboard")
        }
    }, [blogPostdata, history])

    var bg = blogPostdata?.data?.main_image?.image === undefined ? Image5 : blogPostdata?.data?.main_image.image

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="body-6">
                <BlogPostNavbar />
                {blogPostdata === '' ? <div className="section-3 wf-section">
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <h2 className="blog_section_headings">Nothing to See Here</h2>
                        </div>
                    </div>
                </div> :
                    <>
                        <div className="section-3 wf-section" style={{ backgroundImage: "url(" + bg + ")" }}>
                            <div className="w-container">
                                <h1 className="heading-2"><strong>{blogPostdata.data.title}</strong></h1>
                            </div>
                        </div>

                        <div className="container" style={{ paddingTop: '60px' }}>
                            <div className="row justify-content-center">
                                <div className="col-10">
                                    <h2 className="blog_section_headings">Introduction</h2>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-10">
                                    <p className="blogh_section_body">{blogPostdata.data.intro}</p>
                                </div>
                            </div>
                        </div>
                        <div className="blog_sections wf-section">
                            <div className="container">
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-lg-4 col-md-8 col-sm-8">
                                        <img src={blogPostdata?.data?.blog_sections[0]?.image?.image !== undefined ? blogPostdata.data.blog_sections[0].image.image : Image1}
                                            loading="lazy"
                                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 46vw, (max-width: 991px) 229.328125px, 299.984375px"
                                            alt=""
                                            className="blog_section_images" />
                                    </div>
                                    <div className="col-lg-6 col-md-10 col-sm-10">
                                        <h2><strong className="blog_section_headings">{blogPostdata.data.blog_sections[0].header}</strong></h2>
                                        <p className="blogh_section_body">{blogPostdata.data.blog_sections[0].content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="blog_sections wf-section">
                            <div className="container">
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-lg-6 col-md-10 col-sm-10">
                                        <h2><strong className="blog_section_headings">{blogPostdata.data.blog_sections[1].header}</strong></h2>
                                        <p className="blogh_section_body">{blogPostdata.data.blog_sections[1].content}</p>
                                    </div>
                                    <div className="col-lg-4 col-md-8 col-sm-8">
                                        <img src={blogPostdata?.data?.blog_sections[1]?.image?.image !== undefined ? blogPostdata.data.blog_sections[1].image.image : Image2}
                                            loading="lazy"
                                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 46vw, (max-width: 991px) 229.328125px, 299.984375px"
                                            alt=""
                                            className="blog_section_images" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="blog_sections wf-section">
                            <div className="container">
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-lg-4 col-md-8 col-sm-8">
                                        <img src={blogPostdata?.data?.blog_sections[2]?.image?.image !== undefined ? blogPostdata.data.blog_sections[2].image.image : Image3}
                                            loading="lazy"
                                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 46vw, (max-width: 991px) 229.328125px, 299.984375px"
                                            alt=""
                                            className="blog_section_images" />
                                    </div>
                                    <div className="col-lg-6 col-md-10 col-sm-10">
                                        <h2><strong className="blog_section_headings">{blogPostdata.data.blog_sections[2].header}</strong></h2>
                                        <p className="blogh_section_body">{blogPostdata.data.blog_sections[2].content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="blog_sections wf-section">
                            <div className="container">
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-lg-6 col-md-10 col-sm-10">
                                        <h2><strong className="blog_section_headings">{blogPostdata.data.blog_sections[3].header}</strong></h2>
                                        <p className="blogh_section_body">{blogPostdata.data.blog_sections[3].content}</p>
                                    </div>
                                    <div className="col-lg-4 col-md-8 col-sm-8">
                                        <img src={blogPostdata?.data?.blog_sections[3]?.image?.image !== undefined ? blogPostdata.data.blog_sections[3].image.image : Image4}
                                            loading="lazy"
                                            sizes="(max-width: 479px) 100vw, (max-width: 767px) 46vw, (max-width: 991px) 229.328125px, 299.984375px"
                                            alt=""
                                            className="blog_section_images" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-10">
                                    <p className="blogh_section_body">{blogPostdata.data.cta}</p>
                                </div>
                            </div>
                        </div>
                    </>
                }
                <Footer />
            </div >
        </>
    )
}

export default BlogPost