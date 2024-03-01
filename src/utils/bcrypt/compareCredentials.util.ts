import bcrypt from "bcrypt";

export const comparePassword = (password: string, passwordReq: string) => {
  return bcrypt.compareSync(passwordReq, password);
};
