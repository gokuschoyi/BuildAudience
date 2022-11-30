import React from 'react'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material'
import QPH from '../assets/QP_Horizontal.jpg'
import QPS from '../assets/QP_Square.jpg'
import QPV from '../assets/QP_Vertical.jpg'
const MediaHolder = (props) => {
    const {name} = props;
    return (
        <Card >
            <CardMedia
                component="img"
                height='500px'
                image={QPV}
                alt="green iguana"
                sx={{objectFit: 'contain'}}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Save</Button>
                <Button size="small">Download</Button>
            </CardActions>
        </Card>
    )
}

export default MediaHolder