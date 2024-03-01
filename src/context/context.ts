import { verifyToken } from "../utils/jwt/verifyJwt.util";
import { GraphQLError } from "graphql";

export default async ({ req, _res }: any) => {
  if (req.body.operationName === "IntrospectionQuery") {
    return {};
  }
  if (
    req.body.query.includes("regUser") ||
    req.body.query.includes("loginUser")
  ) {
    return {};
  }
  const token = req.headers.authorization || "";
  const user = await verifyToken(token);
  if (!user) {
    throw new GraphQLError("No se a inicado sesión", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
  return { user };
};
