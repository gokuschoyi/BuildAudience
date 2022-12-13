import React from 'react'
import { Box, Typography } from '@mui/material'
const BlogCover = (props) => {
    const { bg, title } = props
    return (
        <Box sx={{
            display: 'flex',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: `url(${bg})`
        }}
            height='50vh'
            width='-webkit-fill-available'
            justifyContent='center'
            alignItems='center'
        >
            <Typography variant='h1'>{title}</Typography>
        </Box>
    )
}

export default BlogCover