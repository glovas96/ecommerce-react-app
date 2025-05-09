import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const useAuthListener = () => {
    const [user, setUser] = useState(null); // current authenticated user
    const [loading, setLoading] = useState(true); // auth state loading flag

    useEffect(() => {
        // subscribe to Firebase Auth state changes
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser ?? null); // set user or null
            setLoading(false); // auth state resolved
        });

        return () => unsub(); // cleanup subscription
    }, []);

    return { user, loading }; // expose user and loading state
};
