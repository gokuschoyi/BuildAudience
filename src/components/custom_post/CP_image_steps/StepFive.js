import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
const StepFive = (props) => {
    const { author, quote, image } = props;
    console.log(props)
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                        <img src={image}
                            alt="final" width="100%" height="100%" />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box width='80%' sx={{ flexDirection: 'column', display: 'flex' }}>
                        <Typography
                            variant='h5'
                            sx={{ fontWeight: 'bold', color: '#000000', marginBottom: '1rem' }} name="author" value={author}
                        >
                            {author}
                        </Typography>
                        <Typography
                            variant='body1'
                            sx={{ color: '#000000', marginBottom: '1rem' }} name="quote" value={quote}
                        >
                            {quote}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default StepFive