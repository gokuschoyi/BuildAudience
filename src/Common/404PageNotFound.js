import React, { useEffect } from 'react'
import Lottie from "lottie-react";
import PageNotFoundLottie from './PageNotFound';
function PageNotFound() {
    const lottieRef = React.useRef()
    useEffect(() => {
        lottieRef.current.setSpeed(0.5);
    });
    ;

    return (
        <div style={{ 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'black', 
            backgroundSize:'auto' 
            }}>
            <Lottie lottieRef={lottieRef} animationData={PageNotFoundLottie} loop={true} style={{ objectFit: 'cover' }} />
        </div>
    )
}

export default PageNotFound