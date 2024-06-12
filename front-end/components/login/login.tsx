"use client";

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import '../../styles/main/login.scss';

function Homepage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };



    return (

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            className="login-background" // Add this line
            sx={{ background: '#1347C9' }}
        >
            <Typography variant="h4" component="h1" gutterBottom className='header-login'>
                User Login
            </Typography>
            <Box
                component="form"
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="300px"
                gap="16px"
                sx={{ color: '#FFFFFF', fontFamily: 'inter' }}
            >
                <TextField
                    className='email-sty'
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    className='email-sty'
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ color: '#FFFFFF' }}
                />
                <Button
                    className='login-button'
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    fullWidth
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
}

export default Homepage;
