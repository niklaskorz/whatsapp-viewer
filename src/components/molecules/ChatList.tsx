import React from "react";
import styled from "styled-components";
import Link from "next/link";
import * as colors from "../../colors";
import SideBar from "./SideBar";

const List = styled.ul`
  display: block;
  margin: 0;
  padding: 10px 0;
  overflow: auto;
  flex: 1;
  font-size: 0.8em;
`;

const ItemLink = styled.a`
  display: block;
  padding: 10px 15px;
  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: ${colors.darkSecondaryText};
  text-decoration: none;
  transition: 0.1s ease color, 0.1s ease background;

  :hover,
  &.active {
    background: ${colors.darkSecondary};
    color: ${colors.darkPrimaryText};
  }
`;

const Footer = styled.footer`
  border-top: 2px solid ${colors.darkSecondary};
  border-bottom: 2px solid transparent;
  font-size: 0.8em;
  display: flex;
  align-items: center;
  height: 56px;
`;

const Viewer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 10px 5px;
  margin-left: 15px;
  flex: 1;
`;

interface User {
  id: number;
  name: string | null;
  displayName: string | null;
}

export interface ChatData {
  id: number;
  jid: string;
  subject: string;
  user: User | null;
}

interface Props {
  chats: ChatData[];
  activeChatId?: number;
}

export default function ChatList(props: Props): JSX.Element {
  const { chats, activeChatId } = props;

  return (
    <SideBar title="Chats">
      <List>
        {chats.map((chat) => (
          <li key={chat.id}>
            <Link href={`/chats/${chat.id}`} passHref>
              <ItemLink className={chat.id === activeChatId ? "active" : ""}>
                {chat.subject ||
                  chat.user?.displayName ||
                  chat.user?.name ||
                  chat.jid}
              </ItemLink>
            </Link>
          </li>
        ))}
      </List>
      <Footer>
        <Viewer>WhatsApp Viewer</Viewer>
      </Footer>
    </SideBar>
  );
}
