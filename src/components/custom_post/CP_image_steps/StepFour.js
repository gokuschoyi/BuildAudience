import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Button, Box, Card, CardActions, CardMedia } from '@mui/material'
import { styled } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';

const StepFour = (props) => {
    const { stepFourInfo, setStepFourInfo, images } = props;

    const SelectButton = styled(Button)(({ theme }) => ({
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '30px',
        minWidth: 'auto',
        padding: '6px 6px',
        ':hover': {
            backgroundColor: theme.palette.secondary.main,
            opacity: 0.75,
        }
    }));

    const checkButton = (event) => {
        var removeClickedStyle = Array.from(document.getElementsByClassName('checkButton'))
        removeClickedStyle.forEach((item) => {
            item.classList.remove("selected")
        })
        event.currentTarget.classList.add("selected")

        const url = event.currentTarget.getAttribute('data-slink')
        /* console.log(event.currentTarget) */
        var id = event.currentTarget.name

        var key = images.map(function (e) { return e.label; }).indexOf(id);
        const { label } = images[key]

        setStepFourInfo({ ...stepFourInfo, key: key, label: label, imgPath: url })
    }

    useEffect (() => {
        /* console.log(stepFourInfo) */
        if(stepFourInfo.imgPath !== ''){
            var setSelected = document.getElementsByName(stepFourInfo.label)
            setSelected[0].classList.add("selected")
        }
    })

    const CardHolder = (info) => {
        /* console.log(info.item) */
        return (
            <Card>
                <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={`${info.item.imgPath}`}
                        alt={info.item.label}></img>
                </CardMedia>
                <CardActions sx={{ justifyContent: 'end' }}>
                    <SelectButton
                        className="checkButton"
                        name={info.item.label}
                        onClick={(event) => checkButton(event)}
                        data-slink={`${info.item.imgPath}`}
                    >
                        <DoneIcon sx={{ width: '18px', height: '18px' }} />
                    </SelectButton>
                </CardActions>
            </Card>
        )
    }



    return (
        <Box className='test2' justifyContent='center' display='flex'>
            <Box width='80%'>
                <Carousel autoPlay={false} height='300px' sx={{ justifyContent: 'center' }} fullHeightHover={false}>
                    {
                        images.map((item, i) => <CardHolder key={i} item={item} />)
                    }
                </Carousel>
            </Box>
        </Box>
    )
}

export default StepFour