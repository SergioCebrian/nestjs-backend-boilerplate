import { User } from '@modules/users/entities/user.entity';

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;
