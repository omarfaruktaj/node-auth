export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}

export enum ProviderEnum {
  GOOGLE = 'google',
  GITHUB = 'github',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  EMAIL_PASSWORD = 'email_password',
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  roles: UserRoles;
  profilePicture?: string;
  emailVerifiedAt?: Date;
  verificationToken?: string;
  resetToken?: string;
  resetTokenExpires?: Date;
  passwordChangedAt?: Date;
  verificationTokenExpires?: Date;
  deletedAt?: Date;
  provider: ProviderEnum;
  providerId: string;
}
