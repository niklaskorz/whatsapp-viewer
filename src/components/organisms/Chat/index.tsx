import gql from "graphql-tag";
import Linkify from "linkifyjs/react";
import React, { useCallback, useEffect, useRef } from "react";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import ChatError from "../../molecules/ChatError";
import Loading from "../../molecules/Loading";
import ChatInfo from "../../molecules/ChatInfo";
import Media, { MediaType } from "../../molecules/Media";
import {
  Header,
  Message,
  MessageAuthor,
  MessageDate,
  MessageHeader,
  MessageInput,
  MessageInputContainer,
  Messages,
  MessageSendButton,
  MessageText,
  MessageWrapper,
  NewMessageContainer,
  Section,
} from "./styled";

interface User {
  id: number;
  jid: string;
  name: string | null;
  displayName: string | null;
}

interface Message {
  id: number;
  createdAt: string;
  data: string | null;
  author: User | null;

  mediaType: MediaType;
  mediaMimeType?: string;
  mediaHash: string;
  media?: { id: number; filePath: string };
}

interface ChatData {
  id: number;
  jid: string;
  subject: string;
  user: User | null;
  messages: Message[];
  members: User[];
}

interface Response {
  chat: ChatData;
}

interface Props {
  chatId: number;
}

const ChatMessageFragment = gql`
  fragment ChatMessage on Message {
    id
    createdAt
    data
    author {
      id
      jid
      name
      displayName
    }

    mediaType
    mediaMimeType
    mediaHash
    media {
      id
      filePath
    }
  }
`;

const ChatQuery = gql`
  ${ChatMessageFragment}

  query ChatQuery($chatId: Int!) {
    chat(id: $chatId) {
      id
      jid
      subject
      user {
        id
        jid
        name
        displayName
      }
      members {
        id
        jid
        name
        displayName
      }
      messages {
        ...ChatMessage
      }
    }
  }
`;

interface QueryVariables {
  chatId: number;
}

export default function Chat(props: Props): JSX.Element {
  const messageContainer = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);

  const { data, error, loading } = useQuery<Response, QueryVariables>(
    ChatQuery,
    {
      variables: {
        chatId: props.chatId,
      },
    }
  );

  useEffect(() => {
    stickToBottom.current = true;
    if (messageContainer.current) {
      messageContainer.current.scrollTop = 0;
    }
  }, [props.chatId]);
  useEffect(() => {
    if (stickToBottom.current && messageContainer.current) {
      // messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
    }
  }, [data]);

  const onMessagesScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
    (e) => {
      const target = e.currentTarget;
      const height = target.getBoundingClientRect().height;
      const scrollBottom = target.scrollTop + height;

      stickToBottom.current = target.scrollHeight - scrollBottom <= 100;
    },
    []
  );

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ChatError errorMessage={error.message} />;
  }
  if (!data?.chat) {
    return <div>Chat not found</div>;
  }

  const { chat } = data;
  const subject =
    chat.subject || chat.user?.displayName || chat.user?.name || chat.jid;

  return (
    <React.Fragment>
      <Head>
        <title>{subject}</title>
      </Head>
      <Section>
        <Header title={subject}>{subject}</Header>
        <Messages ref={messageContainer} onScroll={onMessagesScroll}>
          {chat.messages.map((message) => (
            <MessageWrapper
              key={message.id}
              viewerIsAuthor={message.author == null}
            >
              <Message viewerIsAuthor={message.author == null}>
                <MessageHeader>
                  <MessageAuthor>
                    {message.author?.displayName ||
                      message.author?.name ||
                      message.author?.jid ||
                      "You"}
                  </MessageAuthor>
                  <MessageDate>
                    {new Date(message.createdAt).toLocaleString()}
                  </MessageDate>
                </MessageHeader>
                <MessageText
                  style={
                    message.data && message.data.length <= 3
                      ? { fontSize: "2em" }
                      : undefined
                  }
                >
                  <Linkify>{message.data}</Linkify>
                </MessageText>
                {message.mediaType !== MediaType.None && (
                  <Media
                    type={message.mediaType}
                    hash={message.mediaHash}
                    filePath={message.media?.filePath}
                  />
                )}
              </Message>
            </MessageWrapper>
          ))}
        </Messages>
        <NewMessageContainer>
          <MessageInputContainer>
            <MessageInput type="text" />
          </MessageInputContainer>
          <MessageSendButton type="button" disabled>
            Search
          </MessageSendButton>
        </NewMessageContainer>
      </Section>

      <ChatInfo chat={chat} />
    </React.Fragment>
  );
}
