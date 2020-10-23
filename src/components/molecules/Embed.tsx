import React from "react";
import styled from "styled-components";

const IframeContainer = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
  width: 500px;
  max-width: 100%;
  margin-top: 20px;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const Image = styled.img`
  display: block;
  max-width: 500px;
  max-height: 500px;
  width: auto;
  height: auto;
  margin-top: 20px;
`;

enum EmbedType {
  Youtube = "Youtube",
  Alugha = "Alugha",
  Image = "Image",
}

export interface Props {
  type: EmbedType;
  src: string;
  onLoad(): void;
}

export default class Embed extends React.Component<Props> {
  render(): React.ReactNode {
    const { type, src, onLoad } = this.props;
    switch (type) {
      case EmbedType.Alugha:
        return (
          <IframeContainer>
            <Iframe
              allowFullScreen
              src={`https://alugha.com/embed/web-player?v=${src}`}
              onLoad={onLoad}
            />
          </IframeContainer>
        );
      case EmbedType.Youtube:
        return (
          <IframeContainer>
            <Iframe
              allowFullScreen
              src={`https://www.youtube.com/embed/${src}`}
              onLoad={onLoad}
            />
          </IframeContainer>
        );
      case EmbedType.Image:
        return <Image onLoad={onLoad} src={src} alt="Embedded image" />;
      default:
        return null;
    }
  }
}
