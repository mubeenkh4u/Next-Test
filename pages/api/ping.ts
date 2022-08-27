// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
  message?: string; // optional since it's not always present (use ? for optional)
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Method", req.method); // adding "Method" in quotes helps us look at console logs to know what stuff I am getting back.
  console.log("Query", req.query);
  console.log("Body", req.body);
  res.status(200).json({ status: "John Doe" });
}
