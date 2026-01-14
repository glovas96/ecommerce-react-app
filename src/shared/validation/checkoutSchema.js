import { z } from 'zod';

// Customer name validation
const nameRules = z
  .string()
  .nonempty('Name is required')
  .min(5, 'Name must be at least 5 characters')
  .regex(/^[A-Za-z][A-Za-z\s]+$/, 'Name must contain only English letters');

// Phone validation pattern
const phoneRules = z
  .string()
  .nonempty('Phone number is required')
  .regex(/^\+?\d{10,15}$/, 'Phone must be 10–15 digits and may start with +');

// City validation rules
const cityRules = z
  .string()
  .nonempty('City is required')
  .min(2, 'City must be at least 2 characters')
  .regex(/^[A-Za-z][A-Za-z\s-]+$/, 'City can contain only letters');

// Street validation rules
const streetRules = z
  .string()
  .nonempty('Street is required')
  .min(5, 'Street must be at least 5 characters')
  .regex(/^[A-Za-z]/, 'Street must start with a letter')
  .regex(/^[A-Za-z0-9][A-Za-z0-9\s\-.,]+$/, 'Street may include letters, numbers');

// ZIP code must match postal format
const zipRules = z
  .string()
  .nonempty('ZIP code is required')
  .regex(/^\d{5,6}$/, 'ZIP must be 5 or 6 digits');

export const checkoutSchema = z.object({
  name: nameRules,
  phone: phoneRules,
  city: cityRules,
  street: streetRules,
  zip: zipRules,
});
