import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { dbPromise } from "../../../api/database";
import { MediaHashThumbnail } from "../../../api/models/MediaHashThumbnail";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { hash } = req.query;

  await dbPromise;

  const repository = getRepository(MediaHashThumbnail, "msgstore");
  const thumb = await repository.findOne(
    hash instanceof Array ? hash[0] : hash
  );

  if (thumb) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.send(thumb.thumbnail);
  } else {
    res.statusCode = 404;
    res.send("Not found");
  }
};
