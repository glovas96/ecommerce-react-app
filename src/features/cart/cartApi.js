import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

// Load user cart from Firestore
export const loadUserCart = async (userId) => {
    const ref = doc(db, "carts", userId);
    const snap = await getDoc(ref);

    return snap.exists() ? snap.data().items : [];
};

// Save user cart to Firestore
export const saveUserCart = async (userId, items) => {
    const ref = doc(db, "carts", userId);
    await setDoc(ref, { items });
};