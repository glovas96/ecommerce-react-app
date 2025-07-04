import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

import { Box, TextField, Button, Typography } from "@mui/material";

const RegisterPage = () => {
    const [email, setEmail] = useState(""); // email input
    const [password, setPassword] = useState(""); // password input
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password); // create user
        navigate("/"); // redirect after register
    };

    return (
        <Box
            component="form"
            onSubmit={handleRegister}
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
                Register
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
                Create account
            </Button>
        </Box>
    );
};

export default RegisterPage;

