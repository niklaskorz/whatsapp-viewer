import { buildSchema } from "type-graphql";
import Container from "typedi";
import { RoomResolver } from "./resolvers/ChatResolver";
import { MessageResolver } from "./resolvers/MessageResolver";
import { UserResolver } from "./resolvers/UserResolver";

export const schema = buildSchema({
  resolvers: [MessageResolver, RoomResolver, UserResolver],
  container: Container,
});
