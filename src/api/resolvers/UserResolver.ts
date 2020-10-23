import { Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";
import { User } from "../models/User";

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(Message, "msgstore")
    private messageRepository: Repository<Message>,
    @InjectRepository(Chat, "msgstore")
    private chatRepository: Repository<Chat>,
    @InjectRepository(User, "wa")
    private userRepository: Repository<User>
  ) {}
}
