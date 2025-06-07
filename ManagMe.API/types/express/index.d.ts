import { UserPayload } from "../user/user";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}
