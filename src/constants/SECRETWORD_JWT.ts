import dotenv from "dotenv";

dotenv.config();

export const SECRET_WORD_JWT: string = process.env.SECRETWORD ?? "";
