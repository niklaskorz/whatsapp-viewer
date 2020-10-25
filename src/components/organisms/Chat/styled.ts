import styled from "styled-components";
import * as colors from "../../../colors";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

export const Header = styled.header`
  background: ${colors.primary};
  color: ${colors.primaryText};
  padding: 15px;
  text-align: center;
  flex-shrink: 0;
  z-index: 2;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border-top: 2px solid transparent;
  border-bottom: 2px solid ${colors.secondary};
`;

export const Messages = styled.div`
  flex: 1;
  padding: 10px 40px;
  overflow: auto;
  background: ${colors.primary};

  display: flex;
  flex-direction: column-reverse;
`;

export const MessageHeader = styled.header`
  display: flex;
  font-weight: bold;
  margin-bottom: 10px;
  align-items: baseline;
`;

export const MessageAuthor = styled.div`
  font-size: 0.9em;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const MessageDate = styled.div`
  font-size: 0.7em;
  flex-shrink: 0;
  margin-left: 10px;
  color: ${colors.secondaryText};
`;

export const MessageText = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 800px;
  margin-top: 10px;
`;

export interface MessageProps {
  viewerIsAuthor: boolean;
}

export const Message = styled.div<MessageProps>`
  display: inline-block;
  background: #fff;
  color: #000;
  padding: 15px;
  margin: 10px 0;
  margin-right: auto;
  max-width: 100%;
  border-radius: 10px;
  line-height: 1.5;
  text-align: left;

  ${(props) => props.viewerIsAuthor && "background: " + colors.secondary};
`;

export const MessageWrapper = styled.div<MessageProps>`
  ${(props) => props.viewerIsAuthor && "text-align: right"};
`;

export const NewMessageContainer = styled.div`
  display: flex;
  background: ${colors.primary};
  padding: 10px;
  z-index: 2;
  border-top: 2px solid ${colors.secondary};
`;

export const MessageInputContainer = styled.div`
  flex: 1;
  padding: 10px;
  background: #fff;
  color: #000;
  border-radius: 2px;
`;

export const MessageInput = styled.input`
  display: block;
  appearance: none;
  width: 100%;
  overflow-y: auto;
  padding: 0;
  outline: none;
  border: none;
  resize: none;
`;

export const MessageSendButton = styled.button`
  flex-shrink: 0;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #555;
  color: #fff;
  cursor: pointer;

  :disabled {
    cursor: not-allowed;
  }
`;
