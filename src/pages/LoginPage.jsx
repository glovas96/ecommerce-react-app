import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

import { Box, TextField, Button, Typography } from "@mui/material";

const LoginPage = () => {
    const [email, setEmail] = useState(""); // email input
    const [password, setPassword] = useState(""); // password input
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password); // login user
        navigate("/"); // redirect after login
    };

    return (
        <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 300,
                mx: "auto",
                mt: 5,
            }}
        >
            <Typography variant="h4" textAlign="center">
                Login
            </Typography>

            <TextField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />

            <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />

            <Button type="submit" variant="contained" size="large">
                Sign in
            </Button>
        </Box>
    );
};

export default LoginPage;

