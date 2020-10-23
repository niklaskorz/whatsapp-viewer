import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { dbPromise } from "../../api/database";
import { schema } from "../../api/schema";

async function createHandler() {
  await dbPromise;

  const apolloServer = new ApolloServer({ schema: await schema });
  return apolloServer.createHandler({ path: "/api/graphql" });
}

const handler = createHandler();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const h = await handler;
  await h(req, res);
};
