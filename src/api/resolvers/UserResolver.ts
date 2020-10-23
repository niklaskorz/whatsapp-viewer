import {
  FieldResolver,
  Resolver,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Message, Chat, User } from '../models';

@Resolver(of => User)
export class UserResolver {
  constructor(
    @InjectRepository(Message, "msgstore")
    private messageRepository: Repository<Message>,
    @InjectRepository(Chat, "msgstore")
    private chatRepository: Repository<Chat>,
    @InjectRepository(User, "wa")
    private userRepository: Repository<User>,
  ) {}
}
