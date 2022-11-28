import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
/* import { Link } from "react-router-dom"; */
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

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    /* console.log({selected,title}) */
    return (
        <MenuItem
            active={selected === title}
            style={{
                backgroundColor: selected === title ? colors.black[300] : "transparent",
                color: theme.palette.background,
            }}
            onClick={() => setSelected(title)}
            icon={icon}
            
        >
            <Typography>{title}</Typography>
            {/* <Link to={to} /> */}
        </MenuItem>
    );
};

const SidebarC = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    console.log(theme.palette.mode);
    /* console.log(colors.black[400]) */

    useEffect(() => {
        if(sm){
            setIsCollapsed(true)
        }
        else{
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
                    '& .MuiTypography-root':{
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
                                sx={{height:'72px'}}
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
                                sx={{height:'72px'}}	
                            >
                                <IconButton sx={{marginTop:'20%'}} onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}

                        {/* {!isCollapsed && (
                            <Box mb="25px">
                                <Box textAlign="center">
                                    <Typography
                                        variant="h2"
                                        color={colors.blue[400]}
                                        fontWeight="bold"
                                        sx={{ m: "10px 0 0 0" }}
                                    >
                                        Ed Roh
                                    </Typography>
                                    <Typography variant="h5" color={colors.yellow[500]}>
                                        VP Fancy Admin
                                    </Typography>
                                </Box>
                            </Box>
                        )} */}

                        <Box paddingLeft={isCollapsed ? undefined : "0%"}>
                            <Item
                                title="Dashboard"
                                to="/"
                                icon={<HomeOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Typography
                                variant="h6"
                                
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Tools
                            </Typography>
                            <Item
                                title="Quick Posts"
                                to="/quickpost"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Custom Posts"
                                to="/custompost"
                                icon={<ContactsOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Blog Posts"
                                to="/blogpost"
                                icon={<ReceiptOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Projects"
                                to="/projects"
                                icon={<ReceiptOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography
                                variant="h6"
                                
                                sx={{ m: "15px 0 5px 20px",  }}
                            >
                                Pages
                            </Typography>
                            <Item
                                title="Profile Form"
                                to="/form"
                                icon={<PersonOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Calendar"
                                to="/calendar"
                                icon={<CalendarTodayOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="FAQ Page"
                                to="/faq"
                                icon={<HelpOutlineOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography
                                variant="h6"
                                
                                sx={{ m: "15px 0 5px 20px" }}
                            >
                                Charts
                            </Typography>
                            <Item
                                title="Bar Chart"
                                to="/bar"
                                icon={<BarChartOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Pie Chart"
                                to="/pie"
                                icon={<PieChartOutlineOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Line Chart"
                                to="/line"
                                icon={<TimelineOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Geography Chart"
                                to="/geography"
                                icon={<MapOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </Box>
                    </Menu>
                </Sidebar>
            </Box>
        </div>
    );
};

export default SidebarC;