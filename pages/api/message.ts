import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase();
  
  const {query:{msg, sendBy} = {}} = req;

  if (msg && sendBy) {
    await db.collection("list").insertOne({msg, sendBy});
  }

  const result = await db.collection("list")
    .find({})
    .sort({$natural:-1})
    .limit(22)
    .toArray()
  ;
 
  const resultWithId = result
    .map(({_id, ...rest}) => ({id: _id.toString(), ...rest}))
  ;

  res.status(200).json(resultWithId);
}