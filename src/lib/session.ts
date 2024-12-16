import { Session, User } from "lucia";

export interface SessionContext {
  user: User | null;
  session: Session | null;
}