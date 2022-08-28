// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   status: string;
//   message?: string; // optional since it's not always present (use ? for optional)
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hapikey = process.env.HUBSPOT_TOKEN;
  console.log("Method", req.method); // adding "Method" in quotes helps us look at console logs to know what stuff I am getting back.
  console.log("Query", req.query);
  const baseUrl = "https://api.hubapi.com";
  const search = req.query.search || "";
  const entity = req.query.entity || "contacts";
  console.log("Body", req.body);
  const crmdata = await fetch(
    // await is returning Unexpected token < in JSON at position 0
    `${baseUrl}/crm/v3/objects/${entity}/search`,
    // https://api.hubapi.com/crm/v3/objects/contacts/search
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + hapikey,
      },
      body: JSON.stringify({ query: search }),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  res.status(200).json({ status: "Success", message: crmdata });
}
