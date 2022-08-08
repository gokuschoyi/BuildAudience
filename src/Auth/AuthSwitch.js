import React, { useState } from "react";
import Login from './Login/Login';
import Signup from './Signup/Signup';

function AuthSwitch() {
    let [isLogin, setIsLogin] = useState("Login");
    const changeAuth = () => {
        setIsLogin(isLogin === "Login" ? "Signup" : "Login");
    }
    console.log(isLogin)

    if (isLogin === "Login") {
        return (
            <Login changeAuthMode={changeAuth} />
        )
    }
    if (isLogin === "Signup") {
        return (
            <Signup changeAuthMode={changeAuth} />
        )
    }
}

export default AuthSwitch;