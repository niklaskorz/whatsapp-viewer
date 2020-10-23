import * as colors from '../../colors';
import React from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';
import Link from 'next/link'

const ActionBar = styled.div`
  flex-shrink: 0;
  display: flex;
  margin: 10px;
  margin-bottom: 0;
  font-size: 0.8em;
`;

const Action = styled.button`
  border: none;
  background: transparent;
  border: 1px solid ${colors.darkSecondaryText};
  color: ${colors.darkSecondaryText};
  flex: 1;
  appearance: none;
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 0.75em;

  transition: 0.1s ease color, 0.1s ease background;

  :hover {
    background: ${colors.darkSecondaryText};
    color: ${colors.darkSecondary};
  }
`;
Action.defaultProps = {
  type: 'button',
};

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
  user: User|null;
}

interface Props {
  chats: ChatData[];
  activeChatId?: number;
}

export default function ChatList(props: Props) {
  const { chats, activeChatId } = props;

  return (
    <SideBar title="Chats">
      <List>
        {chats.map(chat => (
          <li key={chat.id}>
            <Link
              href={`/chats/${chat.id}`}
              passHref
            >
              <ItemLink
                className={chat.id === activeChatId ? 'active' : ''}
              >
                {chat.subject || chat.user?.displayName || chat.user?.name || chat.jid}
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
