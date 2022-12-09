import React, { useEffect } from 'react'
import { Box, Stepper, Step, StepLabel, Button, Typography, useTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import StepOne from './CP_steps/StepOne';
import StepTwo from './CP_steps/StepTwo';
import StepThree from './CP_steps/StepThree';
import StepFour from './CP_steps/StepFour';
import StepFive from './CP_steps/StepFive';
const CustomPostSteps = (props) => {
    const { steps, mediaType } = props;
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const stepper = Array.from(document.getElementsByClassName('MuiStepper-root'))[0]
        /* console.log(stepper) */
        if (isSmallScreen) {
            stepper.classList.add('smallscreen-stepper')
            /* console.log("true") */
        }
        else {
            stepper.classList.remove('smallscreen-stepper')
            /* console.log("false") */
        }
    }, [isSmallScreen])


    const handleNext = () => {
        let newSkipped = skipped;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const quotes = [
        {
            author: 'Author 1',
            quote: 'random quote 1'
        },
        {
            author: 'Author 2',
            quote: 'random quote 2'
        },
        {
            author: 'Author 3',
            quote: 'random quote 3'
        },
        {
            author: 'Author 4',
            quote: 'random quote 4'
        },
        {
            author: 'Author 5',
            quote: 'random quote'
        }
    ]

    const stepThreeImageData = [
        {
            url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
            author: '@bkristastucchio',
        },
        {
            url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
            author: '@rollelflex_graphy726',
        },
        {
            url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
            author: '@helloimnik',
        },
        {
            url: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
            author: '@nolanissac',
        },
        {
            url: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
            author: '@hjrc33',
        },
        {
            url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
            author: '@arwinneil',
        },
        {
            url: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
            author: '@tjdragotta',
        },
        {
            url: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
            author: '@katie_wasserman',
        },
        {
            url: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
            author: '@silverdalex',
        },
        {
            url: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
            author: '@shelleypauls',
        },
        {
            url: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
            author: '@peterlaster',
        },
        {
            url: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
            author: '@southside_customs',
        },
    ];

    const stepThreeVideoData = [
        {
            url: 'https://player.vimeo.com/video/253578320?h=7dcf0dcb5a&byline=0&portrait=0',
            title: 'Video 1',
            author: 'Author 1'
        },
        {
            url: 'https://player.vimeo.com/video/295661926?h=b35319aab8',
            title: 'Video 2',
            author: 'Author 2'
        },
        {
            url: 'https://player.vimeo.com/video/212088035?h=9a06600e52',
            title: 'Video 3',
            author: 'Author 3'
        },
        {
            url: 'https://player.vimeo.com/video/202670196?h=aa309999a4',
            title: 'Video 4',
            author: 'Author 4'
        },
        {
            url: 'https://player.vimeo.com/video/186301089?h=61e0cf902a&color=E29F29',
            title: 'Video 5',
            author: 'Author 5'
        },
        {
            url: 'https://player.vimeo.com/video/199054980?h=88726d5544',
            title: 'Video 6',
            author: 'Author 6'
        },
    ]

    const itemData = mediaType === 'Image' ? stepThreeImageData : stepThreeVideoData;

    const images = [
        {
            label: 'San Francisco – Oakland Bay Bridge, United States',
            imgPath:
                'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            label: 'Bird',
            imgPath:
                'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
        },
        {
            label: 'Bali, Indonesia',
            imgPath:
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
        }
    ];

    const stepOneData = {
        tagline: '',
        category: '',
        postType: '',
        mediaType: mediaType,
    }

    const stepTwoData = {
        author: quotes[0].author,
        quote: quotes[0].quote,
        key: 0
    }

    const stepThreeData = {
        url: '',
        title: '',
        author: '',
        key: 0
    }

    const stepFourData = {
        label: '',
        imgPath: '',
        key: 0
    }

    const [stepOneInfo, setStepOneInfo] = React.useState(stepOneData)
    const [stepTwoInfo, setStepTwoInfo] = React.useState(stepTwoData)
    const [stepThreeInfo, setStepThreeInfo] = React.useState(stepThreeData)
    const [stepFourInfo, setStepFourInfo] = React.useState(stepFourData)
    /* console.log(stepOneInfo); */
    /* console.log(stepTwoInfo); */
    /* console.log(stepThreeInfo); */
    /* console.log(stepFourInfo); */

    const getStepContent = (step, type) => {
        if (step === 0) {
            return <StepOne stepOneInfo={stepOneInfo} setStepOneInfo={setStepOneInfo} />;
        }
        if (step === 1) {
            return <StepTwo stepTwoInfo={stepTwoInfo} setStepTwoInfo={setStepTwoInfo} quotes={quotes} />;
        }
        if (step === 2) {
            return <StepThree stepThreeInfo={stepThreeInfo} setStepThreeInfo={setStepThreeInfo} itemData={itemData} mediaType={mediaType} />;
        }
        if (step === 3 && type === 'Image') {
            return <StepFour stepFourInfo={stepFourInfo} setStepFourInfo={setStepFourInfo} images={images} />;
        }
        if (step === 3 && type === 'Video') {
            return <StepFive author={stepTwoInfo.author} quote={stepTwoInfo.quote} image={stepThreeInfo.url} />;
        }
        if (step === 4 && type === 'Image') {
            return <StepFive author={stepTwoInfo.author} quote={stepTwoInfo.quote} image={stepFourInfo.imgPath} />;
        }
    }
    /* console.log(activeStep + 1) */

    return (
        <Box p={3} sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} >
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={index} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button sx={{ backgroundColor: `${theme.palette.primary.main}`, color: `${theme.palette.secondary.main}` }} onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography>Step {activeStep + 1}</Typography>
                    <Box sx={{ mb: 2 }} className='test'>
                        {getStepContent(activeStep, mediaType)}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            onClick={handleBack}
                            sx={{
                                mr: 1,
                                color: `${theme.palette.secondary.main}`,
                                backgroundColor: `${theme.palette.primary.main}`,
                                display: (activeStep === 0 ? 'none' : 'block')
                            }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button
                            onClick={handleNext}
                            sx={{
                                backgroundColor: `${theme.palette.primary.main}`,
                                color: `${theme.palette.secondary.main}`
                            }}
                        >
                            {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    )
}

export default CustomPostSteps