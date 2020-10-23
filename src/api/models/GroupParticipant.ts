import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: "group_participants" })
export class GroupParticipant {
  @PrimaryColumn("integer", {name: "_id"})
  id: number;

  @Column("text", {name: "gjid"})
  groupJid: string;

  @Column("text")
  jid: string;
}
