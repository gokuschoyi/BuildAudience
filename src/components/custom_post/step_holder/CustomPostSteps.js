import React from 'react'
import { Box, Stepper, Step, StepLabel, Button, Typography, StepContent, useTheme } from '@mui/material'

const CustomPostSteps = (props) => {
    const { steps } = props;
    const theme = useTheme();

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

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
    return (
        <Box p={3} sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                            <StepContent>
                                <Typography>Step {activeStep + 1}</Typography>
                            </StepContent>
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
                    {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
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