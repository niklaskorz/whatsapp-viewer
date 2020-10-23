import formatError from '../../formatError';
import React from 'react';
import CenteredContainer from '../atoms/CenteredContainer';
import ErrorMessage from '../atoms/ErrorMessage';

interface Props {
  errorMessage: string;
}

export default class ChatError extends React.Component<Props> {
  render() {
    return (
      <CenteredContainer>
        <ErrorMessage>{formatError(this.props.errorMessage)}</ErrorMessage>
      </CenteredContainer>
    );
  }
}
