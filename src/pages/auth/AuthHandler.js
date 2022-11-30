import React from 'react'
import bgImage from '../../assets/login_bg.png'
import { Box } from "@mui/material";

import Login from './auth-pages/Login';
import Signup from './auth-pages/Signup';

const AuthHandler = () => {
    const [authSwitch, setAuthSwitch] = React.useState('login');

    const handleAuthSwitch = (value) => {
        /* console.log({authSwitch, value}); */
        setAuthSwitch(value);
    }
    
    return (
        <Box width='100%' height='100%' justifyContent='center' sx={{ display: 'flex', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundImage: `url(${bgImage})` }}>
            {authSwitch === 'login'
                ?
                <Login handleAuthSwitch={handleAuthSwitch} />
                :
                <Signup handleAuthSwitch={handleAuthSwitch} />}
        </Box>
    )
}

export default AuthHandler