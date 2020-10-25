import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "message_thumbnails" })
export class MessageThumbnail {
  @PrimaryColumn("text", { name: "key_id" })
  id: string;

  @Column("blob")
  thumbnail: Buffer;
}
