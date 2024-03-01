import dotenv from "dotenv";

dotenv.config();

export const SALTOS_BCRYPT: number = process.env.SALTOS
  ? parseInt(process.env.SALTOS, 10)
  : 10;
