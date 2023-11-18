import * as bcrypt from 'bcrypt';

const encodePassword = (rawPassword: string) => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
};

const comparePasswords = (rawPassword: string, hash: string) => {
  return bcrypt.compareSync(rawPassword, hash);
};

export { encodePassword, comparePasswords };
