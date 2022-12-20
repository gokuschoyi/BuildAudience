import React from 'react'
import { Box, Grid, useTheme } from '@mui/material'
import BlogPostSectionContent from '../blog_post_components/BlogPostSectionContent'
import BlogPostSectionImage from '../blog_post_components/BlogPostSectionImage'
const BlogContentHolder3 = (props) => {
    const { content } = props
    const theme = useTheme()
    return (
        <Box
            justifyContent='center'
            display='flex' m={1}
            backgroundColor={`${theme.palette.secondary.main}`}
            borderRadius={2}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <BlogPostSectionContent content={content} />
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BlogPostSectionImage content={content} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default BlogContentHolder3