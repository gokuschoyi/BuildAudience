import React, { useEffect, useMemo } from 'react'
import DashboardNavbar from '../Common/DashboardNavbar'
import Footer from '../../Common/Footer'
import Image1 from '../../images/photo-1561480643-94fba607e578.jpeg'
import Image2 from '../../images/photo-1543336472-fcf478c443db.jpeg'
import Image3 from '../../images/photo-1507646227500-4d389b0012be.jpeg'
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
    return (
        <>
            <div className="body-6">
                <DashboardNavbar />
                <div className="section-3 wf-section">
                    <div className="w-container">
                        <h1 className="heading-2"><strong>How to get into software development.</strong></h1>
                    </div>
                </div>
                <div className="blog_sections wf-section">
                    <div className="w-container">
                        <h2 className="blog_section_headings">Heading</h2>
                        <p className="blogh_section_body">TekTorch is a company specializing in software development. They offer various services such as web development, app development, and software development. They have a blog where they write about various topics related to software development. In this blog post, they offer advice on how to get into software development. They suggest choosing a language and learning it in small, manageable chunks. This is good advice for those who are new to software development or for those who want to learn a new language. TekTorch offers various services that can help you learn a new language or improve your skills in software development.</p>
                    </div>
                </div>
                <div className="blog_sections wf-section">
                    <div className="w-container">
                        <div className="columns-7 w-row">
                            <div className="w-col w-col-8">
                                <h2><strong className="blog_section_headings">What is software development?</strong></h2>
                                <p className="blogh_section_body">Software development is the process of designing, creating, testing, and maintaining software applications. It involves the use of a variety of programming languages and tools to create and test software applications.The software development process can be divided into a number of stages, each of which requires different skills and knowledge. The most common stages are:<br /><br />1: Planning and requirements gathering: This stage involves understanding the needs of the user and determining what the software will do. It also involves creating a project plan and determining the resources that will be required.<br /><br />2: Design: This stage involves creating a blueprint for the software. This blueprint will describe the functionality of the software and how it will be organized.<br /><br />3: Implementation: This stage involves writing the code for the software. This code will be based on the design created in the previous stage.<br /><br />4: Testing: This stage involves testing the software to ensure that it works as intended. This testing can be done manually or using</p>
                            </div>
                            <div className="column-11 w-col w-col-4">
                                <img src={Image1}
                                    loading="lazy"
                                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 46vw, (max-width: 991px) 229.328125px, 299.984375px"
                                    alt=""
                                    className="blog_section_images" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blog_sections wf-section">
                    <div className="w-container">
                        <div className="columns-8 w-row">
                            <div className="w-col w-col-8">
                                <h2><strong>Why software development?</strong></h2>
                                <p className="blogh_section_body">A career in software development can be extremely rewarding, both professionally and personally. The software development field is constantly evolving, which means that there are always new challenges to keep you intellectually engaged. And, because software development plays such a critical role in our increasingly digital world, your work can have a real and lasting impact on people's lives.<br /><br />A career in software development also offers a great deal of flexibility. You can work remotely, set your own hours, and choose the projects that you work on. This can be a great way to achieve a work-life balance that works for you.<br /><br />Finally, a career in software development can be financially rewarding. With the demand for skilled software developers high, and the supply of qualified candidates relatively low, you can command a high salary in this field. If you're looking for a challenging, engaging, and rewarding career, then software development may be the perfect fit for you.</p>
                            </div>
                            <div className="w-col w-col-4">
                                <img src={Image2}
                                    loading="lazy"
                                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 46vw, (max-width: 991px) 229.328125px, 299.984375px"
                                    alt=""
                                    className="blog_section_images" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blog_sections wf-section">
                    <div className="w-container">
                        <div className="columns-9 w-row">
                            <div className="w-col w-col-8">
                                <h2><strong>How to get into software development?</strong></h2>
                                <p className="blogh_section_body">There are a few ways to get into software development. The most common way is to get a degree in computer science or a related field. However, there are other ways to get into the field. One way is to get a job as a software developer. Another way is to become a self-taught software developer.The most common way to become a software developer is to get a degree in computer science or a related field. A degree in computer science will give you the theoretical and practical knowledge you need to be a software developer. However, a degree is not required to become a software developer. There are many self-taught software developers out there.If you want to become a software developer, the best way to do it is to get a job as a software developer. This will give you the opportunity to learn the ropes and to see if it is the right career for you. If you are not sure if you want to become a software developer,</p>
                            </div>
                            <div className="w-col w-col-4">
                                <img src={Image3}
                                    loading="lazy"
                                    sizes="(max-width: 479px) 100vw, (max-width: 767px) 46vw, (max-width: 991px) 229.328125px, 299.984375px"
                                    alt=""
                                    className="blog_section_images" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="blog_sections wf-section">
                    <div className="w-container">
                        <h2><strong>What language to choose?</strong></h2>
                        <p className="blogh_section_body">There are many factors to consider when choosing a programming language for a project. The first step is to identify the problem that the program will solve and the target audience for the program. Once these two factors are understood, the next step is to select a language that is best suited for the problem and the target audience.There are many different programming languages available, each with its own strengths and weaknesses. For example, FORTRAN is a good choice for scientific or engineering applications because it is designed to produce code that is easy to read and understand. However, FORTRAN is not a good choice for applications that require a user interface because it does not have strong support for graphics.C++ is another popular programming language that is often used for large projects. C++ has many features that make it attractive to programmers, such as a large standard library, object-oriented programming, and a wide variety of programming paradigms. However, C++ can be difficult to learn</p>
                    </div>
                </div>
                <div className="blog_sections wf-section">
                    <div className="w-container">
                        <h2 className="blog_section_headings"><strong>How to learn the language?</strong></h2>
                        <p className="blogh_section_body">Assuming you would like tips on how to learn a language:Start with the basics. Don’t try to learn everything at once. <br /><br />1: Start with the basics like grammar and vocabulary.<br /><br />2: Find a method that works for you. Some people learn best by listening to audio tapes, others by reading books. Find a method that works for you and stick to it.<br /><br />3: Practice, practice, practice. The only way to really learn a language is to practice it as often as possible. Try to find opportunities to use the language in everyday life.<br /><br />4: Be patient. Learning a language takes time and patience. Don’t get discouraged if you don’t see results immediately. Just keep practicing and you will eventually get there.</p>
                    </div>
                </div>
                <Footer />
            </div >
        </>
    )
}

export default BlogPost