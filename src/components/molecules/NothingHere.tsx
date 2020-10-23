import React from "react";
import CenteredContainer from "../atoms/CenteredContainer";

export default class NothingHere extends React.Component {
  render(): React.ReactNode {
    return (
      <CenteredContainer>
        <p>Welcome! Select a chat from the sidebar to get started.</p>
      </CenteredContainer>
    );
  }
}
