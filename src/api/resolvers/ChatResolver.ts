import { Arg, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { In, Not, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Chat } from "../models/Chat";
import { GroupParticipant } from "../models/GroupParticipant";
import { Message } from "../models/Message";
import { User } from "../models/User";

@Resolver(() => Chat)
export class RoomResolver {
  constructor(
    @InjectRepository(Message, "msgstore")
    private messageRepository: Repository<Message>,
    @InjectRepository(Chat, "msgstore")
    private chatRepository: Repository<Chat>,
    @InjectRepository(GroupParticipant, "msgstore")
    private groupParticipantRepository: Repository<GroupParticipant>,
    @InjectRepository(User, "wa") private userRepository: Repository<User>
  ) {}

  @Query(() => [Chat], {
    description: "Queries all chats",
  })
  async chats(): Promise<Chat[]> {
    return await this.chatRepository.find({ order: { sortTimestamp: "DESC" } });
  }

  @Query(() => Chat, {
    description: "Queries a chat by id",
    nullable: true,
  })
  async chat(@Arg("id", () => Int) id: number): Promise<Chat | null> {
    return (await this.chatRepository.findOne(id)) || null;
  }

  @FieldResolver(() => [Message])
  async messages(
    @Root() chat: Chat,
    @Arg("skip", () => Int, { nullable: true }) skip?: number
  ): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { jid: chat.jid, status: Not(6) },
      order: { timestamp: "DESC" },
      skip,
      take: 20,
      relations: ["media"],
    });
  }

  @FieldResolver(() => User)
  async user(@Root() chat: Chat): Promise<User> {
    return (
      (await this.userRepository.findOne({ id: chat.jid })) ||
      new User(chat.jid)
    );
  }

  @FieldResolver(() => [User])
  async members(@Root() chat: Chat): Promise<User[]> {
    if (!chat.jid.endsWith("@g.us")) {
      return [];
    }
    const members = await this.groupParticipantRepository.find({
      groupJid: chat.jid,
    });
    const users = await this.userRepository.find({
      id: In(members.map((m) => m.jid)),
    });
    return members.map(
      (m) => users.find((u) => u.id === m.jid) || new User(m.jid)
    );
  }
}
