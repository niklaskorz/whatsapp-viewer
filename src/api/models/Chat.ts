import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType({
  description:
    "A chat contains information about the messages sent into the chat and " +
    "the users participating in the chat's conversation",
})
@Entity({ name: "chat_view" })
export class Chat {
  @Field(() => Int)
  @PrimaryColumn("integer", { name: "_id" })
  id: number;

  @Field()
  @Column("text", { name: "raw_string_jid" })
  jid: string;

  @Field({ nullable: true })
  @Column("text")
  subject: string;

  @Column("integer")
  created_timestamp: number;

  @Column("integer", { name: "sort_timestamp" })
  sortTimestamp: number;

  @Field(() => Date, { nullable: true })
  createdAt(): Date | null {
    return this.created_timestamp ? new Date(this.created_timestamp) : null;
  }

  @Field(() => Date)
  updatedAt(): Date {
    return new Date(this.sortTimestamp);
  }
}
