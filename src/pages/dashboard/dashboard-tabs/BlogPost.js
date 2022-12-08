import React from 'react'
import { Box, TextField, Tooltip, IconButton, TextareaAutosize, Button } from '@mui/material'
import Header from '../../../components/global/Header'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const BlogPost = (props) => {
    const blogPostData = {
        p_desc: '',
        ref_url: '',
    }
    const [blogPost, setBlogPost] = React.useState(blogPostData);
    const { p_desc, ref_url } = blogPost;

    const handleChange = (e) => {
        setBlogPost({ ...blogPost, [e.target.name]: e.target.value });
    }

    const processBlog = () => {
        console.log('processBlog');
        console.log(blogPost)
    }

    return (
        <Box height='100%' width='-webkit-fill-available'>
            <Header title={props.tab} />
            <Box justifyContent='center' display='flex' flexDirection='column' alignItems='center'>
                <Box width='80%' display='flex' p={3} alignItems='center'>
                    <TextareaAutosize
                        aria-label="input description"
                        minRows={10}
                        placeholder="Short Description"
                        style={{ width: '100%' }}
                        name='p_desc'
                        value={p_desc}
                        onChange={handleChange}
                    />
                    <Tooltip title="Provide details as to what the blog should be about. This is like a reference material for the Blog post generator">
                        <IconButton>
                            <InfoOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box width='80%' display='flex' p={3}>
                    <TextField
                        label="Input URL"
                        id="standard-size-small"
                        placeholder='Enter the URL to reference from'
                        size="small"
                        variant="standard"
                        sx={{ width: '100%' }}
                        name='ref_url'
                        value={ref_url}
                        onChange={handleChange}
                    />
                    <Tooltip title="Paste a single URL to reference from and generate your blog">
                        <IconButton sx={{ width: 'fit-content' }}>
                            <InfoOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box display='flex' justifyContent='center' p={4}>
                <Button variant="outlined" href="#outlined-buttons" onClick={processBlog}>
                    Submit
                </Button>
            </Box>
        </Box>
    )
}

export default BlogPost