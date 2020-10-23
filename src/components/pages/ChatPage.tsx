import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Loading from "../molecules/Loading";
import NothingHere from "../molecules/NothingHere";
import ChatList, { ChatData } from "../molecules/ChatList";
import Chat from "../organisms/Chat";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

interface Response {
  chats: ChatData[];
}

const ChatPageQuery = gql`
  query ChatPageQuery {
    chats {
      id
      jid
      subject
      user {
        id
        name
        displayName
      }
    }
  }
`;

export default function ChatPage(): JSX.Element | string | null {
  const { data, loading, error } = useQuery<Response>(ChatPageQuery);
  const router = useRouter();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return error.message;
  }
  if (!data) {
    return null;
  }

  const ids = router.query.id;
  const id = ids instanceof Array ? ids[0] : ids;
  const parsedId = id ? parseInt(id) : undefined;

  return (
    <Container>
      <ChatList chats={data.chats} activeChatId={parsedId} />
      {parsedId ? <Chat chatId={parsedId} /> : <NothingHere />}
    </Container>
  );
}
