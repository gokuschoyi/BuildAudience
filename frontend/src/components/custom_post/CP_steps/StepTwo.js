import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay';
const StepTwo = (props) => {
    const { stepTwoInfo, setStepTwoInfo, quotes } = props;
    const { author, quote, key } = stepTwoInfo;

    const regenerateQuote = () => {

        if (key === quotes.length - 1) {
            const { author, quote } = quotes[0];
            setStepTwoInfo({ ...stepTwoInfo, author: author, quote: quote, key: 0 });
        }
        else {
            var count = key
            count++;
            /* console.log('regenerate' + count); */
            const { author, quote } = quotes[count];
            /* console.log({ author, quote }); */
            const k = quotes.indexOf(quotes[count]);
            setStepTwoInfo({ ...stepTwoInfo, author: author, quote: quote, key: k });
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
            <Box>
                <IconButton aria-label="delete" onClick={regenerateQuote} >
                    <ReplayIcon sx={{ width: '20px', height: '20px' }} />
                </IconButton>
            </Box>
        </Box>
    )
}

export default StepTwo