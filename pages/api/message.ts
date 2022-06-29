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
    .find({})
    .toArray()
  ;

  const resultWithId = result
    .map(({_id, ...rest}) => ({id: _id.toString(), ...rest}))
    .reverse()
  ;

  res.status(200).json(resultWithId);
}