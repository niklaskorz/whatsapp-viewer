import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { dbPromise } from "../../../api/database";
import { Message } from "../../../api/models/Message";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id } = req.query;

  await dbPromise;

  const repository = getRepository(Message, "msgstore");
  const rawId = id instanceof Array ? id[0] : id;
  const parsedId = parseInt(rawId);
  const msg = await repository.findOne(parsedId);

  if (msg?.thumbnail) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    res.send(msg.thumbnail);
  } else {
    res.statusCode = 404;
    res.send("Not found");
  }
};
