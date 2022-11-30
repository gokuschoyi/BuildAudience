import React, { useState, useRef } from 'react'
import Header from '../../components/global/Header'
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import VideocamIcon from '@mui/icons-material/Videocam';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Button } from '@mui/material'
import Grid from '@mui/material/Grid';
import MediaHolder from '../../components/MediaHolder';
import { Item } from '../../components/Item';
const QuickPost = (props) => {
    const [postType, setPostType] = useState('');

    const togglePostType = (type) => {
        setPostType(type);
    }

    const mediaFile = useRef(null);

    const handleClick = () => {
        togglePostType('upload');
        mediaFile.current.click();
    }

    const handleMediaFile = (e) => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) {
            return;
        }

        console.log('fileObj is', fileObj);

        // 👇️ reset file input
        e.target.value = null;

        // 👇️ is now empty
        /* console.log(e.target.files); */

        // 👇️ can still access file object here
        /* console.log(fileObj); */
        console.log(fileObj.name);
    }

    console.log(postType);

    return (
        <Box  height='100%' width='-webkit-fill-available'>
            <Header title={props.tab} />
            <Box p={2} sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item p={2} xs={12} md={4} lg={4}>
                        <Grid item xs={12} sx={{ margin: '20px' }}>
                            <Item>
                                <Button
                                    onClick={() => togglePostType('image')}
                                    sx={{
                                        width: '100%',
                                        backgroundColor: (postType === 'image' ? '#ffe4c4' : '#ffffff')
                                    }}
                                    size="small"
                                    endIcon={<PhotoCameraBackIcon />}
                                >
                                    Image Post
                                </Button>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sx={{ margin: '20px' }}>
                            <Item>
                                <Button
                                    onClick={() => togglePostType('video')}
                                    sx={{
                                        width: '100%',
                                        backgroundColor: (postType === 'video' ? '#ffe4c4' : '#ffffff')
                                    }}
                                    size="small"
                                    endIcon={<VideocamIcon />}
                                >
                                    Video Post
                                </Button>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sx={{ margin: '20px' }}>
                            <Item>
                                <input
                                    style={{ display: 'none' }}
                                    ref={mediaFile}
                                    type="file"
                                    onChange={handleMediaFile}
                                ></input>
                                <Button
                                    onClick={handleClick}
                                    sx={{
                                        width: '100%',
                                        backgroundColor: (postType === 'upload' ? '#ffe4c4' : '#ffffff')
                                    }}
                                    size="small"
                                    endIcon={<FileUploadIcon />}
                                >
                                    Upload Media
                                </Button>
                            </Item>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} md={8} lg={8}>
                        <Grid item xs={12} sx={{ margin: '20px' }}>
                            {postType === 'image'
                                ?
                                <MediaHolder name='image' />
                                :
                                <MediaHolder name='video' />}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    )
}

export default QuickPost