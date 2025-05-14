import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={handleLogin}>
            <h1>Login</h1>

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

            <button type="submit">Sign in</button>
        </form>
    );
};

export default LoginPage;
