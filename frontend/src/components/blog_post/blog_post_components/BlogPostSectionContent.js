import React from 'react'
import { Box, Typography } from '@mui/material'
const BlogPostSectionContent = (props) => {
    const { content } = props
    return (
        <Box justifyContent='center' display='flex'>
            <Box pl={1.5}>
                <Typography p={2} variant='h3' mt={3} mb={3}>{content.header}</Typography>
                <Typography p={2} variant='body1' sx={{ textAlign: 'justify' }}>{content.content}</Typography>
            </Box>
        </Box>
    )
}

export default BlogPostSectionContent