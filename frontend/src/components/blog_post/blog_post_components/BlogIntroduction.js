import React from 'react'
import { Box, Typography } from '@mui/material'
const BlogIntroduction = (props) => {
    const { introTitle, content } = props
    return (
        <Box justifyContent='center' display='flex'>
            <Box width='80%'>
                <Typography variant='h3' mt={3} mb={3}>{introTitle}</Typography>
                <Typography variant='body1' sx={{ textAlign: 'justify' }}>{content}</Typography>
            </Box>
        </Box>
    )
}

export default BlogIntroduction