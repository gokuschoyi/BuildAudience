import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar';
import SidebarC from '../../components/global/SideBar';
import Topbar from '../../components/global/TopBar';
import { Outlet } from 'react-router-dom';
const Dashboard = (props) => {
    /* const colors = tokens(theme.palette.mode);
    console.log(colors.yellow[200]); */
    /* console.log(props.color); */

    return (
        <>
            <ProSidebarProvider>
                <SidebarC />
            </ProSidebarProvider>
            <main className="content"
                style={{
                    backgroundColor: props.color,
                }}
            >
                <Topbar />
                <Outlet />
            </main>
        </>
    )
}

export default Dashboard