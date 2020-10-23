import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

export enum MediaType {
  None = "0",
  Image = "1",
  Audio = "2",
  Video = "3",
  Contact = "4",
  Location = "5",
  Call = "8",
  Document = "9",
  GroupCall = "10",
  AltVideo = "13",
  Deleted = "15",
  Sticker = "20",
}

registerEnumType(MediaType, {
  name: "MediaType",
});

@ObjectType()
@Entity({ name: "message_media" })
export class MessageMedia {
  @Field(() => Int)
  @PrimaryColumn("integer", { name: "message_row_id" })
  id: number;

  @Field()
  @Column("text", { name: "file_path" })
  filePath: string;
}

@ObjectType()
@Entity({ name: "messages" })
export class Message {
  @Field(() => Int)
  @PrimaryColumn("integer", { name: "_id" })
  id: number;

  @Field({ nullable: true })
  @Column("text")
  data: string;

  @Field()
  @Column("text", { name: "key_remote_jid" })
  jid: string;

  @Column("integer", { name: "key_from_me" })
  fromMe: number;

  @Column("text", { name: "remote_resource" })
  remoteResource: string;

  @Column("int")
  timestamp: number;

  @Field(() => MediaType)
  @Column("text", { name: "media_wa_type" })
  mediaType: MediaType;

  @Field({ nullable: true })
  @Column("text", { name: "media_mime_type" })
  mediaMimeType: string;

  @Field({ nullable: true })
  @Column("text", { name: "media_hash" })
  mediaHash: string;

  @Field(() => MessageMedia, { nullable: true })
  @OneToOne(() => MessageMedia)
  @JoinColumn({ name: "_id" })
  media: MessageMedia;

  @Field(() => Date)
  createdAt(): Date {
    return new Date(this.timestamp);
  }
}
