import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={handleRegister}>
            <h1>Register</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Create account</button>
        </form>
    );
};

export default RegisterPage;
