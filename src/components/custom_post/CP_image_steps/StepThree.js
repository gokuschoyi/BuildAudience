import React, { useEffect } from 'react'
import { Box, ImageList, ImageListItem, ListSubheader, useTheme, Button } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';

const StepThree = (props) => {
    const { itemData, stepThreeInfo, setStepThreeInfo, mediaType } = props;

    const theme = useTheme();
    var col = 6;
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    const columnSize = (type) => ({
        ...(type === 'Image'
            ? {
                Sm: 2,
                Md: 3,
                Lg: 4,
                Xl: 6,
            }
            :
            {
                Sm: 1,
                Md: 1,
                Lg: 2,
                Xl: 2,
            }
        )
    })
    /* var cols = columnSize(mediaType);
    console.log(cols) */

    if (sm) {
        col = columnSize(mediaType).Sm;
    }
    else if (md) {
        col = columnSize(mediaType).Md;
    }
    else if (lg) {
        col = columnSize(mediaType).Lg;
    }
    else {
        col = columnSize(mediaType).Xl;
    }

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

    const selectedImageLink = (event) => {
        var removeClickedStyle = Array.from(document.getElementsByClassName('selectLinkButton'))
        removeClickedStyle.forEach((item) => {
            item.classList.remove("selected")
        })
        /* console.log(removeClickedStyle) */
        event.currentTarget.classList.add("selected")
        /* console.log(event.currentTarget.classList) */

        const url = event.currentTarget.getAttribute('data-link')
        var id = event.currentTarget.name

        var key = itemData.map(function (e) { return e.author; }).indexOf(id);
        const { author, title } = itemData[key]
        /* console.log({ id, key, author, title }) */

        setStepThreeInfo({ ...stepThreeInfo, url: url, key: key, author: author, title: title })
        /* console.log(event.currentTarget.getAttribute('data-link')); */
    }

    useEffect(() => {
        console.log(stepThreeInfo)
        if (stepThreeInfo.url !== '') {
            var setSelected = document.getElementsByName(stepThreeInfo.author)
            setSelected[0].classList.add("selected")
        }
        else {
            return
        }
    }, [stepThreeInfo])

    /* console.log(mediaType) */

    return (
        <Box sx={{ display: 'flex' }}>
            <ImageList sx={{ width: '100%', height: 450 }} cols={col}>
                <ImageListItem key="Subheader" cols={col}>
                    <ListSubheader component="div">Select an Image</ListSubheader>
                </ImageListItem>
                {itemData.map((item) => (
                    <ImageListItem key={item.url} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
                        {mediaType === 'Image'
                            ?
                            <img
                                src={`${item.url}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            :
                            <video
                                src={`${item.url}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                                loop
                                muted
                            />}
                        <Box position='absolute' m={1} >
                            <SelectButton
                                className='selectLinkButton'
                                aria-label={`info about ${item.title}`}
                                name={item.author}
                                onClick={(event) => selectedImageLink(event)}
                                data-link={`${item.url}`}
                            >
                                <DoneIcon sx={{ width: '18px', height: '18px' }} />
                            </SelectButton>
                        </Box>
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    )
}

export default StepThree