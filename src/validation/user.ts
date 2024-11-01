import z from 'zod';
import { UserRoles } from '../interfaces';

export const userSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(50, { message: 'Must be at most 50 characters long' }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Must be at least 8 characters long' })
    .max(128, { message: 'Must be at most 128 characters long' }),
  roles: z.nativeEnum(UserRoles, {
    invalid_type_error: 'Invalid role type',
    required_error: 'Role is required',
  }),
  profilePicture: z
    .string()
    .url({ message: 'Invalid URL for profile picture' })
    .optional(),
  verified: z.date().optional(),
  verificationToken: z.string().optional(),
  resetToken: z.string().optional(),
  resetTokenExpires: z.date().optional(),
  passwordChangedAt: z.date().optional(),
});
