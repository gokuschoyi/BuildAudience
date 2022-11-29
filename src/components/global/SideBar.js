import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../themes/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const SidebarC = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("");
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    /* console.log(theme.palette.mode); */
    /* console.log(colors.black[400]) */
    let pathname = useLocation().pathname
    console.log(pathname)

    useEffect(() => {
        if (sm) {
            setIsCollapsed(true)
        }
        else {
            setIsCollapsed(false)
        }
    }, [setIsCollapsed, sm])

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <Box
                sx={{
                    "& .sidebar-inner": {
                        background: `${theme.palette.secondary.main} !important`,
                    },
                    '& .menu-anchor': {
                        color: `${theme.palette.primary.main} !important`,
                    },
                    '& .menu-anchor:hover': {
                        backgroundColor: `${colors.grey[900]} !important`,
                    },
                    '& .menu-item:active': {
                        backgroundColor: `${theme.palette.background} !important`,
                    },
                    '& .MuiTypography-root': {
                        color: `${theme.palette.background} !important`,
                    }
                }}
            >
                <Sidebar width='300px' collapsed={isCollapsed} style={{ height: '100vh' }}>
                    <Menu iconshape="square">
                        {/* LOGO AND MENU ICON */}
                        {!isCollapsed ? (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                                sx={{ height: '72px' }}
                            >
                                <Typography variant="h3" color={theme.palette.primary.main}>
                                    BUILDAUDIENCE
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        ) : (
                            <Box
                                textAlign="center"
                                sx={{ height: '72px' }}
                            >
                                <IconButton sx={{ marginTop: '20%' }} onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}

                        <Box paddingLeft={isCollapsed ? undefined : "0%"}>
                            <MenuItem
                                active={selected === "dashboardTab"}
                                style={{
                                    backgroundColor: selected === "dashboardTab" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("dashboardTab")}
                                icon={<HomeOutlinedIcon />}
                                routerLink={<Link to="dashboardTab" />}
                            >
                                <Typography>Dashboard</Typography>
                            </MenuItem>

                            <Typography
                                variant="h6"
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Tools
                            </Typography>

                            <MenuItem
                                active={selected === "quickpost"}
                                style={{
                                    backgroundColor: selected === "quickpost" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("quickpost")}
                                icon={<PeopleOutlinedIcon />}
                                routerLink={<Link to="quickpost" />}
                            >
                                <Typography>Quick Post</Typography>
                            </MenuItem>

                            <MenuItem
                                active={selected === "custompost"}
                                style={{
                                    backgroundColor: selected === "custompost" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("custompost")}
                                icon={<ContactsOutlinedIcon />}
                                routerLink={<Link to="/" />}
                            >
                                <Typography>Custom Post</Typography>
                            </MenuItem>

                            <MenuItem
                                active={selected === "blogpost"}
                                style={{
                                    backgroundColor: selected === "blogpost" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("blogpost")}
                                icon={<ReceiptOutlinedIcon />}
                                routerLink={<Link to="/" />}
                            >
                                <Typography>Blog Post</Typography>
                            </MenuItem>

                            <MenuItem
                                active={selected === "projects"}
                                style={{
                                    backgroundColor: selected === "projects" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("projects")}
                                icon={<ReceiptOutlinedIcon />}
                                routerLink={<Link to="/" />}
                            >
                                <Typography>Projects</Typography>
                            </MenuItem>

                            <Typography
                                variant="h6"
                                sx={{ m: "15px 0 5px 20px", }}
                            >
                                Pages
                            </Typography>

                            <MenuItem
                                active={selected === "profileform"}
                                style={{
                                    backgroundColor: selected === "profileform" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("profileform")}
                                icon={<PersonOutlinedIcon />}
                                routerLink={<Link to="/" />}
                            >
                                <Typography>Profile Form</Typography>
                            </MenuItem>

                            <MenuItem
                                active={selected === "calender"}
                                style={{
                                    backgroundColor: selected === "calender" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("calender")}
                                icon={<CalendarTodayOutlinedIcon />}
                                routerLink={<Link to="/" />}
                            >
                                <Typography>Calender</Typography>
                            </MenuItem>

                            <MenuItem
                                active={selected === "faqpage"}
                                style={{
                                    backgroundColor: selected === "faqpage" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("faqpage")}
                                icon={<HelpOutlineOutlinedIcon />}
                                routerLink={<Link to="/" />}
                            >
                                <Typography>FAQ Page</Typography>
                            </MenuItem>

                            <Typography
                                variant="h6"
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Charts
                            </Typography>

                            <MenuItem
                                active={selected === "barchart"}
                                style={{
                                    backgroundColor: selected === "barchart" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("barchart")}
                                icon={<BarChartOutlinedIcon />}
                                routerLink={<Link to="/" />}
                            >
                                <Typography>Bar Chart</Typography>
                            </MenuItem>

                            <MenuItem
                                active={selected === "piechart"}
                                style={{
                                    backgroundColor: selected === "piechart" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("piechart")}
                                icon={<PieChartOutlineOutlinedIcon />}
                                routerLink={<Link to="/" />}
                            >
                                <Typography>Pie Chart</Typography>
                            </MenuItem>

                            <MenuItem
                                active={selected === "linechart"}
                                style={{
                                    backgroundColor: selected === "linechart" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("linechart")}
                                icon={<TimelineOutlinedIcon />}
                                routerLink={<Link to="/" />}
                            >
                                <Typography>Line Chart</Typography>
                            </MenuItem>

                            <MenuItem
                                active={selected === "geographychart"}
                                style={{
                                    backgroundColor: selected === "geographychart" ? colors.black[300] : "transparent",
                                    color: theme.palette.background,
                                }}
                                onClick={() => setSelected("geographychart")}
                                icon={<MapOutlinedIcon />}
                                routerLink={<Link to="/" />}
                            >
                                <Typography>Geography Chart</Typography>
                            </MenuItem>
                        </Box>
                    </Menu>
                </Sidebar>
            </Box>
        </div>
    );
};

export default SidebarC;