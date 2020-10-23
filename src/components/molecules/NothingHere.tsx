import React from "react";
import CenteredContainer from "../atoms/CenteredContainer";

export default class NothingHere extends React.Component {
  render(): React.ReactNode {
    return (
      <CenteredContainer>
        <p>Welcome! Join a room or create a new one to get started.</p>
      </CenteredContainer>
    );
  }
}
