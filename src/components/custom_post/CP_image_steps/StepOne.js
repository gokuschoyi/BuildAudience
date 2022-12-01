import React from 'react'
import { Box, TextField, Button } from '@mui/material'
import CPInput from '../CP_components/CPInput'
const StepOne = (props) => {
    const { stepOneInfo, setStepOneInfo } = props;
    const categoriesOption = [
        'Anxiety',
        'Change',
        'Choice',
        'Confidence',
        'Courage',
        'Death',
        'Dreams',
        'Excellence',
        'Failure',
        'Fairness',
        'Fear',
        'Forgiveness',
        'Freedom',
        'Future',
        'Happiness',
        'Inspiration',
        'Kindness',
        'Leadership',
        'Life',
        'Living',
        'Love',
        'Pain',
        'Past',
        'Success',
        'Time',
        'Today',
        'Truth',
        'Work',
        'Technology',
        'Naval Ravikant',
    ]

    const postTypeOption = [
        'Facebook',
        'Instagram',
        'Story'
    ]

    const mediaTypeOption = [
        'Image',
        'Video'
    ]

    /* console.log(stepOneInfo); */

    const { tagline, category, postType, mediaType } = stepOneInfo;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStepOneInfo({ ...stepOneInfo, [name]: value })
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box width='80%' sx={{ flexDirection: 'column', display: 'flex' }}>
                <TextField sx={{ m: 1 }} size="small" id="standard-basic" label="Enter a tagline" variant="outlined" value={tagline} onChange={handleChange} name="tagline" />

                <CPInput label="Select a category" value={category} onChange={handleChange} options={categoriesOption} name="category" />
                <CPInput label="Post Type" value={postType} onChange={handleChange} options={postTypeOption} name="postType" />
                <CPInput label="Media Type" value={mediaType} onChange={handleChange} options={mediaTypeOption} name="mediaType" />
            </Box>
            <Button >submit</Button>
        </Box>
    )
}

export default StepOne