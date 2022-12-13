import React from 'react'
import { Box, Grid, Typography, Card, CardMedia } from '@mui/material'
import bg from '../../../assets/bg.png'
const BlogContentHolder2 = (props) => {
    const {title, content} = props
    return (
        <Box justifyContent='center' display='flex' m={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Box p={2}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="240"
                                    src={bg}
                                    alt="green iguana"
                                />
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box justifyContent='center' display='flex'>
                            <Box pl={1.5}>
                                <Typography variant='h3' mt={3} mb={3}>{title}</Typography>
                                <Typography variant='body1' sx={{ textAlign: 'justify' }}>{content}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
    )
}

export default BlogContentHolder2