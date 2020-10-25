import { Arg, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { Not, Repository } from "typeorm";
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

  @Query(() => [Message])
  async messages(
    @Arg("jid", () => String) jid: string,
    @Arg("skip", () => Int, { nullable: true }) skip?: number
  ): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { jid, status: Not(6) },
      order: { timestamp: "DESC" },
      skip,
      take: 20,
      relations: ["media"],
    });
  }

  @FieldResolver(() => User, { nullable: true })
  async author(@Root() message: Message): Promise<User | null> {
    if (message.fromMe) {
      return null;
    }
    const isGroup = message.jid.endsWith("@g.us");
    const id = isGroup ? message.remoteResource : message.jid;
    const user = await this.userRepository.findOne({ id });
    return user || new User(id);
  }
}
