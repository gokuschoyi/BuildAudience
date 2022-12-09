import React from 'react'
import { Box, Button, TextField, Grid, Stack, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";

const Signup = (props) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };
    const theme = useTheme();

    return (
        <Box m="20px" p="10px" sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', backgroundColor: '#ffffff', borderRadius: '20px' }}>
            <Grid item xs={12} mt='20px' mb='20px'>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h2" fontWeight='bold' color={theme.palette.secondary.main}>SIGNUP</Typography>
                    <Typography onClick={()=>props.handleAuthSwitch('login')} variant="body1" sx={{ textDecoration: 'none', cursor:'pointer' }} color="primary">
                        Already have an account?
                    </Typography>
                </Stack>
            </Grid>

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 14" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="email"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Display Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.displayName}
                                name="displayName"
                                error={!!touched.displayName && !!errors.displayName}
                                helperText={touched.displayName && errors.displayName}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Company Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.companyName}
                                name="companyName"
                                error={!!touched.companyName && !!errors.companyName}
                                helperText={touched.companyName && errors.companyName}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Signup
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>

    );
}

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    displayName: yup.string().required("required"),
    companyName: yup.string().required("required"),
});
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    displayName: "",
    companyName: "",
};

export default Signup