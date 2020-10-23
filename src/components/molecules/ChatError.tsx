import React from "react";
import formatError from "../../formatError";
import CenteredContainer from "../atoms/CenteredContainer";
import ErrorMessage from "../atoms/ErrorMessage";

interface Props {
  errorMessage: string;
}

export default class ChatError extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <CenteredContainer>
        <ErrorMessage>{formatError(this.props.errorMessage)}</ErrorMessage>
      </CenteredContainer>
    );
  }
}
