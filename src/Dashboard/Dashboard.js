import React, { useMemo, useEffect } from "react";
import DashboardNavbar from "./Common/DashboardNavbar";
import NavigationMenu from "./Common/NavigationMenu";
import Footer from "../Common/Footer";
function Dashboard() {

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
    return (
        <>
            <div className="page-wrapper">
                <DashboardNavbar />
                <div className="wf-section">
                    <NavigationMenu />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Dashboard;