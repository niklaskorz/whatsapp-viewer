import { Arg, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";
import { User } from "../models/User";

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    @InjectRepository(Message, "msgstore")
    private messageRepository: Repository<Message>,
    @InjectRepository(Chat, "msgstore")
    private chatRepository: Repository<Chat>,
    @InjectRepository(User, "wa") private userRepository: Repository<User>
  ) {}

  @Query(() => Message, {
    description: "A message",
    nullable: true,
  })
  async message(@Arg("id", () => Int) id: number): Promise<Message | null> {
    return (
      (await this.messageRepository.findOne(id, { relations: ["media"] })) ||
      null
    );
  }

  @FieldResolver(() => User, { nullable: true })
  async author(@Root() message: Message): Promise<User | null> {
    if (message.fromMe) {
      return null;
    }
    return (
      (await this.userRepository.findOne({
        jid: message.jid.endsWith("@g.us")
          ? message.remoteResource
          : message.jid,
      })) || null
    );
  }
}
