import { NextApiRequest, NextApiResponse } from "next"
import handler from "serve-handler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  req.url = req.url?.replace("/api/Media/", "/");
  await handler(req, res, {
      public: "backup/Media",
  })
};
