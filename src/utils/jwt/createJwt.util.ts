import jwt from "jsonwebtoken";
import { SECRET_WORD_JWT } from "../../constants/SECRETWORD_JWT";
import { Token } from "./model";

export const createJwt = (user: Token) => {
  return jwt.sign(user, SECRET_WORD_JWT);
};
