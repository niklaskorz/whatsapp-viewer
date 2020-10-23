import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType({
  description: "A user is a user, not much left to say here",
})
@Entity({ name: "wa_contacts" })
export class User {
  @Field(() => Int)
  @PrimaryColumn("integer", { name: "_id" })
  id: number;

  @Field()
  @Column("text")
  jid: string;

  @Field({ nullable: true })
  @Column("text")
  status: string;

  @Field({ nullable: true })
  @Column("text", { name: "display_name" })
  displayName: string;

  @Field({ nullable: true })
  @Column("text", { name: "wa_name" })
  name: string;
}
