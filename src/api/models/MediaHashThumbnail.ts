import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "media_hash_thumbnail" })
export class MediaHashThumbnail {
  @PrimaryColumn("text", { name: "media_hash" })
  mediaHash: string;

  @Column("blob")
  thumbnail: Buffer;
}
