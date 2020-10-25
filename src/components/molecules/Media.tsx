import React from "react";
import styled from "styled-components";

const Image = styled.img`
  display: block;
  max-width: 500px;
  max-height: 500px;
  min-width: 200px;
  min-height: 200px;
  width: auto;
  height: auto;
  margin-top: 10px;
`;

const Video = styled.video`
  display: block;
  max-width: 500px;
  max-height: 500px;
  min-width: 200px;
  min-height: 200px;
  width: auto;
  height: auto;
  margin-top: 10px;
`;

const Sticker = styled.img`
  display: block;
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
  margin-top: 10px;
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
  Gif = "Gif",
  Sticker = "Sticker",
}

export interface Props {
  type: MediaType;
  thumbnailId: number;
  filePath?: string;
}

export default function Media({
  type,
  thumbnailId,
  filePath,
}: Props): JSX.Element {
  if (!filePath) {
    return <i>{type} has no file path</i>;
  }

  switch (type) {
    case MediaType.Image:
      return (
        <a target="_blank" rel="noreferrer" href={`/api/${filePath}`}>
          <Image
            onError={(e) => {
              e.currentTarget.src = `/api/thumbnail/${thumbnailId}`;
            }}
            src={`/api/${filePath}`}
          />
        </a>
      );
    case MediaType.Audio:
      return <audio controls src={`/api/${filePath}`} />;
    case MediaType.Video:
      return (
        <Video
          controls
          poster={`/api/thumbnail/${thumbnailId}`}
          src={`/api/${filePath}`}
        />
      );
    case MediaType.Gif:
      return (
        <Video
          muted
          loop
          autoPlay
          poster={`/api/thumbnail/${thumbnailId}`}
          src={`/api/${filePath}`}
        />
      );
    case MediaType.Sticker:
      return <Sticker src={`/api/${filePath}`} />;
  }

  return <i>{type} (not implemented)</i>;
}
