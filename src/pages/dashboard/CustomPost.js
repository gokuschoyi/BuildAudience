import React from 'react'
import { Box, } from '@mui/material'
import Header from '../../components/global/Header'
import CustomPostSteps from '../../components/custom_post/CustomPostSteps';
import ToggleSwitch from '../../components/custom_post/CP_components/ToggleSwitch';

const CustomPost = () => {
    const [mediaType, setMediaType] = React.useState('image');
    const toggleMedia = (e) => {
        const type = e.target.checked;
        if (type) {
            setMediaType('video');
        }
        else {
            setMediaType('image');
        }
        console.log(type);
    }
    const imageSteps = ['Select post type', 'Select a quote', 'Select an image', 'Select one Image', 'Save'];
    const videoSteps = ['Select post type', 'Select a quote', 'Select a video', 'Save'];
    return (
        <Box height='100%' width='-webkit-fill-available'>
            <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Header title={"Custom Post"} subtitle={"Create your custom post"} />
                <ToggleSwitch onChange={(event) => toggleMedia(event)} />
            </Box>

            {mediaType === 'image'
                ?
                <CustomPostSteps steps={imageSteps} />
                :
                <CustomPostSteps steps={videoSteps} />}

        </Box>
    )
}

export default CustomPost