import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, } from 'typeorm';
import { GroupParticipant } from './GroupParticipant';

@ObjectType({
  description:
    'A chat contains information about the messages sent into the chat and ' +
    "the users participating in the chat's conversation",
})
@Entity({ name: "chat_list" })
export class Chat {
  @Field(type => Int)
  @PrimaryColumn("integer", {name: "_id"})
  id: number;

  @Field()
  @Column("text", {name: "key_remote_jid"})
  jid: string;

  @Field({nullable: true})
  @Column("text")
  subject: string;

  @Column("integer")
  creation: number;

  @Column("integer", {name: "sort_timestamp"})
  sortTimestamp: number;

  @Field(type => Date, {nullable: true})
  createdAt(): Date|null {
    return this.creation ? new Date(this.creation) : null;
  }

  @Field(type => Date)
  updatedAt(): Date {
    return new Date(this.sortTimestamp);
  }
}
