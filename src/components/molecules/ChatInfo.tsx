import React from "react";
import styled from "styled-components";
import * as colors from "../../colors";
import SideBar from "./SideBar";

const SubTitle = styled.h3`
  font-size: 0.9em;
  margin: 0;
  font-weight: normal;
  margin-top: 10px;
  padding: 0 15px;
`;

const ChatIdText = styled.input`
  appearance: none;
  border: none;
  border-radius: 2px;
  padding: 5px;
  margin: 10px 15px;
  color: ${colors.primaryText};
  background: ${colors.secondary};
  font-size: 0.8em;
  text-align: center;
`;

const List = styled.ul`
  display: block;
  margin: 0;
  padding: 10px 0;
  overflow: auto;
  flex: 1;
  font-size: 0.8em;
`;

const Item = styled.li`
  display: block;
  padding: 10px 15px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: ${colors.darkSecondaryText};
`;

interface User {
  id: number;
  jid: string;
  name: string | null;
  displayName: string | null;
}

interface ChatData {
  id: number;
  jid: string;
  members: User[];
}

interface Props {
  chat: ChatData;
}

const selectOnFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
  // Work around a bug in Microsoft Edge that prevents selecting text
  // inside the focus event handler:
  // https://stackoverflow.com/questions/38487059/selecting-all-content-of-text-input-on-focus-in-microsoft-edge
  const t = e.currentTarget;
  setTimeout(() => t.select(), 0);
};

export default function ChatInfo(props: Props): JSX.Element {
  const { chat } = props;

  return (
    <SideBar title="About this chat">
      <SubTitle>Chat ID</SubTitle>
      <ChatIdText
        type="text"
        readOnly
        onFocus={selectOnFocus}
        value={chat.jid}
      />
      {chat.members.length > 0 && (
        <>
          <SubTitle>Members ({chat.members.length + 1})</SubTitle>
          <List>
            {chat.members.map((user) => (
              <Item key={user.id}>
                {user.displayName || user.name || user.jid}
              </Item>
            ))}
            <Item>You</Item>
          </List>
        </>
      )}
    </SideBar>
  );
}
