import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import BuildAudienceLogo from '../../images/5.png';
function DashboardNavbar() {
    const [template, setTemplate] = React.useState('');
    const [templateName, setTemplateName] = React.useState('');
    useEffect(() => {
        setTemplate(window.location.pathname.slice(1));
        console.log(template);
    }, [template]);

    useEffect(() => {
        if (template === 'BlogPost1') {
            setTemplateName('Template 1');
        }
        else if (template === 'BlogPost2') {
            setTemplateName('Template 2');
        }
        else if (template === 'BlogPost3') {
            setTemplateName('Template 3');
        }
    }, [template]);

    const { blogPostdata } = useSelector(state => state.blogPost);

    const saveBlogPost = useCallback(async () => {
        const token = sessionStorage.getItem('userTokenSession');
        /* const token = localStorage.getItem('userTokenLocal').slice(1, -1); */
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var blogData = {
            template: template,
            data: blogPostdata.data
        }
        console.log(token)
        console.log(blogData)
        let saveBlogPost = await axios.post(process.env.REACT_APP_BURL + '/blog_post/save', blogData, config)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [blogPostdata, template]);

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
                                <div className="dropdown">
                                    <button className="button-primary w-button dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {templateName}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" href="/BlogPost1">Template 1</a></li>
                                        <li><a className="dropdown-item" href="/BlogPost2">Template 2</a></li>
                                        <li><a className="dropdown-item" href="/BlogPost3">Template 3</a></li>
                                    </ul>
                                </div>

                            </li>
                            <li className="mobile-margin-top-11">
                                <button className="button-primary w-button" style={{ margin: '5px' }} onClick={saveBlogPost}>Save</button>
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