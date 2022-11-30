import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import Header from '../../components/global/Header'
import { Item } from '../../components/Item'
import CustomPostSteps from '../../components/custom_post/step_holder/CustomPostSteps';

const CustomPost = () => {
    const [mediaType, setMediaType] = React.useState('image');

    const toggleMediaType = (type) => {
        setMediaType(type);
    }

    const imageSteps = ['Select post type', 'Select a quote', 'Select an image', 'Select one Image', 'Save'];
    const videoSteps = ['Select post type', 'Select a quote', 'Select a video', 'Save'];
    return (
        <Box height='100%' width='-webkit-fill-available'>
            <Header title={"Custom Post"} subtitle={"Create your custom post"} />

            <Grid p={3} container justifyContent="center" alignItems="center" spacing={2} textAlign='center'>
                <Grid item xs={6}>
                    <Item>
                        <Button
                            onClick={() => toggleMediaType('image')}
                            sx={{
                                width: '100%',
                                backgroundColor: (mediaType === 'image' ? '#ffe4c4' : '#ffffff')
                            }}
                            size="small"
                            endIcon={<ImageIcon />}
                        >
                            Image Post
                        </Button>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <Button
                            onClick={() => toggleMediaType('video')}
                            sx={{
                                width: '100%',
                                backgroundColor: (mediaType === 'video' ? '#ffe4c4' : '#ffffff')
                            }}
                            size="small"
                            endIcon={<ImageIcon />}
                        >
                            Video Post
                        </Button>
                    </Item>
                </Grid>
            </Grid>

            {mediaType === 'image'
                ?
                <CustomPostSteps steps={imageSteps} />
                :
                <CustomPostSteps steps={videoSteps} />}

        </Box>
    )
}

export default CustomPost