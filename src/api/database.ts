import "reflect-metadata";

import { Container } from 'typedi';
import * as typeorm from 'typeorm';
import { Message, MessageMedia, Chat, User } from './models';
import { GroupParticipant } from './models/GroupParticipant';
import { MediaHashThumbnail } from './models/MediaHashThumbnail';

typeorm.useContainer(Container);

const createConnection = async (options: typeorm.ConnectionOptions) => {
  const manager = typeorm.getConnectionManager();
  const name = options.name || "default"
  if (manager.has(name)) {
    await manager.get(name).close();
  }
  const connection = manager.create(options);
  await connection.connect();
  return connection;
}

const createConnections = (options: typeorm.ConnectionOptions[]) => Promise.all(options.map(createConnection));

export const dbPromise = createConnections([
  {
    name: 'msgstore',
    type: 'sqlite',
    database: "backup/msgstore.db",
    entities: [Message, MessageMedia, Chat, MediaHashThumbnail, GroupParticipant],
  },
  {
    name: 'wa',
    type: 'sqlite',
    database: "backup/wa.db",
    entities: [User],
  }
])