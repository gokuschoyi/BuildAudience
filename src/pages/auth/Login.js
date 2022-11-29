import React from 'react'
import { Box, Button, TextField, Grid, Stack, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";

const Login = (props) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const theme = useTheme();

    return (
        <Box m="20px" p="10px" sx={{ display: 'flex', flexDirection: 'column', margin: 'auto', backgroundColor: '#ffffff', borderRadius: '20px' }}>
            <Grid item xs={12} mt='20px' mb='20px'>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h2" fontWeight='bold' color={theme.palette.secondary.main}>Login</Typography>
                    <Typography onClick={() => props.handleAuthSwitch('signup')} variant="body1" sx={{ textDecoration: 'none', cursor: 'pointer' }} color="primary">
                        Don&apos;t have an account?
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
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 14" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ gridColumn: "span 14" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Login
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>

    );
}

const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string()
        .required('No password provided.')
        .min(6, 'Password is too short - should be 6 chars minimum.')
});
const initialValues = {
    email: "",
    password: "",
};

export default Login