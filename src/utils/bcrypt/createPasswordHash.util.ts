import bcrypt from "bcrypt";
import { SALTOS_BCRYPT } from "../../constants/SALTOS_BCRYPT";

export const createPasswordHash = (password: string) => {
    return bcrypt.hashSync(password, SALTOS_BCRYPT)
}
