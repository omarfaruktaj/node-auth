import mongoose from 'mongoose';
import { isEmail } from 'validator';
import { IUser, ProviderEnum, UserRoles } from '../interfaces';

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      minlength: [2, 'Name must be at least 2 characters long.'],
      maxlength: [50, 'Name cannot exceed 50 characters.'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => isEmail(value),
        message: 'Invalid email address.',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [6, 'Password must be at least 6 characters long.'],
      select: false,
    },
    roles: {
      type: String,
      enum: {
        values: Object.values(UserRoles),
        message: 'Role is either: ' + Object.values(UserRoles).join(', '),
      },
      default: UserRoles.USER,
    },
    profilePicture: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+\..+/.test(v);
        },
        message: 'Invalid URL for profile picture',
      },
    },
    emailVerifiedAt: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpires: {
      type: Date,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
    passwordChangedAt: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
    provider: {
      type: String,
      enum: Object.values(ProviderEnum),
      default: ProviderEnum.EMAIL_PASSWORD,
    },
    providerId: {
      type: String,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
