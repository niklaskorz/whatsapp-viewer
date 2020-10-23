import React from "react";
import styled from "styled-components";

const VideoContainer = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 56.25%;
  width: 500px;
  max-width: 100%;
  margin-top: 20px;
`;

const Video = styled.video`
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

const Sticker = styled.img`
  display: block;
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
  margin-top: 20px;
`;

export enum MediaType {
  None = "None",
  Image = "Image",
  Audio = "Audio",
  Video = "Video",
  Contact = "Contact",
  Location = "Location",
  Call = "Call",
  Document = "Document",
  GroupCall = "GroupCall",
  AltVideo = "AltVideo",
  Sticker = "Sticker",
}

export interface Props {
  type: MediaType;
  hash: string;
  filePath?: string;
  onLoad?(): void;
}

export default function Media({ type, hash, filePath }: Props): JSX.Element {
  if (
    !filePath &&
    [MediaType.Image, MediaType.Video, MediaType.Sticker].includes(type)
  ) {
    return <Image src={`/api/thumbnail/${encodeURIComponent(hash)}`} alt="" />;
  }

  switch (type) {
    case MediaType.Image:
      return <Image src={`/api/${filePath}`} />;
    case MediaType.Audio:
      return <audio controls src={`/api/${filePath}`} />;
    case MediaType.Video:
      return (
        <VideoContainer>
          <Video controls src={`/api/${filePath}`} />
        </VideoContainer>
      );
    case MediaType.Sticker:
      return <Sticker src={`/api/${filePath}`} />;
  }

  return <i>{type} (not implemented)</i>;
}
