import { z } from "zod";

// Strict validation similar to Ozon/WB
export const checkoutSchema = z.object({
    name: z
        .string()
        .min(2, "Name is too short")
        .regex(/^[A-Za-z\s-]+$/, "Name must contain only letters"),

    phone: z
        .string()
        .regex(/^\+?\d{10,15}$/, "Invalid phone number"),

    city: z
        .string()
        .min(2, "City is too short")
        .regex(/^[A-Za-z\s-]+$/, "City must contain only letters"),

    street: z
        .string()
        .min(3, "Street is too short"),

    zip: z
        .string()
        .regex(/^\d{4,10}$/, "ZIP must contain only digits"),
});