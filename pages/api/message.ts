import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase();

  const listCollection = await db.collection("list")
  
  const {query:{msg, sendBy} = {}} = req;

  if (msg && sendBy) {
    listCollection.insertOne({msg, sendBy});
  }

  const result = await listCollection
    .find({},{projection:{_id:0}})
    .toArray()
  ;

  res.status(200).json(result);
}