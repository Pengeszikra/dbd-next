import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase();

  const list = await db.collection("list").find({},{projection:{_id:0}}).toArray();

  res.status(200).json({ list });
}