import React, { useState } from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar';
import SidebarC from '../components/global/SideBar';
import Topbar from '../components/global/TopBar';
import { Outlet } from 'react-router-dom';
const Dashboard = (props) => {
    const [isSidebar, setIsSidebar] = useState(true);
    /* const colors = tokens(theme.palette.mode);
    console.log(colors.yellow[200]); */
    /* console.log(props.color); */
    return (
        <>
            <ProSidebarProvider>
                <SidebarC isSidebar={isSidebar} />
            </ProSidebarProvider>
            <main className="content"
                style={{
                    backgroundColor: props.color,
                }}
            >
                <Topbar setIsSidebar={setIsSidebar} />
                <Outlet />
            </main>
        </>
    )
}

export default Dashboard