import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "Phone must be a valid 10-digit number"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    vehicleType: z
        .string()
        .optional()
        .default("bike"),
    currentLocation: z
        .object({
            latitude: z.number().optional().default(0),
            longitude: z.number().optional().default(0),
        }).optional(),

});

export const loginSchema = z.object({
    identifier: z
        .string()
        .min(3, "Identifier is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateStatusSchema = z.object({
    status: z.enum(['available', 'busy', 'offline'], {
        errorMap: () => ({ message: "Status must be one of 'available', 'busy', or 'offline'" }),
    }),
});

export const updateLocationSchema = z.object({
    latitude: z.number({
        required_error: "Latitude is required",
    }),
    longitude: z.number({
        required_error: "Longitude is required",
    }),
});
