import gql from "graphql-tag";
import Linkify from "linkifyjs/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useApolloClient, useQuery } from "@apollo/client";
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
  id: string;
  name: string | null;
  displayName: string | null;
}

interface Message {
  id: number;
  createdAt: string;
  data: string | null;
  author: User | null;

  mediaCaption: string | null;
  mediaName: string | null;
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
      name
      displayName
    }

    mediaCaption
    mediaName
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
        name
        displayName
      }
      members {
        id
        name
        displayName
      }
      messages {
        ...ChatMessage
      }
    }
  }
`;

const MessageQuery = gql`
  ${ChatMessageFragment}

  query MessageQuery($jid: String!, $skip: Int!) {
    messages(jid: $jid, skip: $skip) {
      ...ChatMessage
    }
  }
`;

interface QueryVariables {
  chatId: number;
}

export default function Chat(props: Props): JSX.Element {
  const messageContainer = useRef<HTMLDivElement>(null);

  const client = useApolloClient();
  const { data, error, loading } = useQuery<Response, QueryVariables>(
    ChatQuery,
    {
      variables: {
        chatId: props.chatId,
      },
    }
  );
  const [loadFrom, setLoadFrom] = useState<number>();
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    setLoadFrom(undefined);
    if (messageContainer.current) {
      messageContainer.current.scrollTop = 0;
    }
  }, [props.chatId]);
  useEffect(() => {
    if (data?.chat) {
      setMessages(data.chat.messages);
    }
  }, [data]);
  useEffect(() => {
    if (!loadFrom || !data?.chat) {
      return;
    }
    let abort = false;
    client
      .query<{ messages: Message[] }>({
        query: MessageQuery,
        variables: { jid: data.chat.jid, skip: loadFrom },
      })
      .then((result) => {
        if (abort) {
          return;
        }
        if (result.data && !abort) {
          setMessages([...messages, ...result.data.messages]);
        }
      });
    return () => {
      abort = true;
    };
  }, [loadFrom]);

  const onMessagesScroll = useCallback<React.UIEventHandler<HTMLDivElement>>(
    (e) => {
      const target = e.currentTarget;
      const height = target.getBoundingClientRect().height;
      const scrollBottom = target.scrollTop - height;
      if (target.scrollHeight + scrollBottom <= 2000) {
        const loadNext = messages.length;
        if (loadNext !== loadFrom) {
          console.log("Time to load");
          setLoadFrom(loadNext);
        }
      }
    },
    [messages, loadFrom]
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
          {messages.map((message) => (
            <MessageWrapper
              key={message.id}
              data-message-id={message.id}
              data-author-id={message.author?.id}
              viewerIsAuthor={!message.author}
            >
              <Message viewerIsAuthor={!message.author}>
                <MessageHeader>
                  <MessageAuthor>
                    {message.author?.displayName ||
                      message.author?.name ||
                      message.author?.id ||
                      "You"}
                  </MessageAuthor>
                  <MessageDate title={message.id.toString()}>
                    {new Date(message.createdAt).toLocaleString()}
                  </MessageDate>
                </MessageHeader>
                {message.mediaType !== MediaType.None && (
                  <Media
                    type={message.mediaType}
                    thumbnailId={message.id}
                    filePath={message.media?.filePath}
                  />
                )}
                {message.mediaCaption && (
                  <MessageText
                    style={
                      message.media
                        ? undefined
                        : { fontSize: "0.9em", fontWeight: "bold" }
                    }
                  >
                    <Linkify>{message.mediaCaption}</Linkify>
                  </MessageText>
                )}
                {message.mediaName && !message.media && (
                  <MessageText style={{ fontSize: "0.8em" }}>
                    <Linkify>{message.mediaName}</Linkify>
                  </MessageText>
                )}
                {message.data && (
                  <MessageText>
                    <Linkify>{message.data}</Linkify>
                  </MessageText>
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
