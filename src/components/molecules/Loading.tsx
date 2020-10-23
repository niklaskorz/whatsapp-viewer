import React from "react";
import CenteredContainer from "../atoms/CenteredContainer";
import Spinner from "../atoms/Spinner";

export default class Loading extends React.Component {
  render(): React.ReactNode {
    return (
      <CenteredContainer>
        <Spinner />
      </CenteredContainer>
    );
  }
}
