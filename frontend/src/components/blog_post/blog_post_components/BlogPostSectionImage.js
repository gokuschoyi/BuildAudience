import React from 'react'
import { Box, Card, CardMedia } from '@mui/material'
const BlogPostSectionImage = (props) => {
    const { content } = props
    return (
        <Box display='flex' alignContent='center' flexWrap='wrap' p={2}>
            <Card>
                <CardMedia
                    component="img"
                    height="240"
                    src={`${content.image.image}`}
                    alt={`${content.image.user_name}`}
                />
            </Card>
        </Box>
    )
}

export default BlogPostSectionImage