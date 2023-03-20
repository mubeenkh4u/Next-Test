// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Faker, faker } from "@faker-js/faker";
import * as dfd from "danfojs";

// type Data = {
//   status: string;
//   message?: string; // optional since it's not always present (use ? for optional)
// };
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer " + process.env.HUBSPOT_TOKEN,
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("----------------------------------------------------");
  console.log("Method", req.method); // adding "Method" in quotes helps us look at console logs to know what stuff I am getting back.
  console.log("Query", req.query);
  const baseUrl = "https://api.hubapi.com";
  const query = req.query.query || "";
  const limit = req.query.limit || 10;
  const endpoint = req.query.endpoint;
  const entity = req.query.entity || "contacts";
  console.log("Body", req.body);
  if (endpoint === "search") {
    const crmdata = await fetch(
      // await is returning Unexpected token < in JSON at position 0
      `${baseUrl}/crm/v3/objects/${entity}/${endpoint}`,
      // https://api.hubapi.com/crm/v3/objects/contacts/search
      {
        method: "POST",
        headers,
        body: JSON.stringify({ query, limit }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
    return res.status(200).json(crmdata.results);
  }
  if (endpoint === "batch") {
    let contacts = [];
    let count = req.query.count || 10;
    for (let i = 0; i < count; i++) {
      const company = faker.company.name();
      const firstname = faker.name.firstName();
      const lastname = faker.name.lastName();
      const email = faker.internet.email();
      const phone = faker.phone.number();
      contacts.push({
        properties: {
          firstname,
          lastname,
          email,
          company,
          phone,
        },
      });
    }
    const body = JSON.stringify({ inputs: contacts });
    console.log("hubspot batch creation", body);
    const crmdata = await fetch(
      `${baseUrl}/crm/v3/objects/${entity}/batch/create`,
      {
        method: "POST",
        headers,
        body,
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res.status(200).json(crmdata.results);
  }
  if (endpoint === "create") {
    const body = req.query.fake
      ? JSON.stringify({
          properties: {
            email: faker.internet.email(),
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
          },
        })
      : req.query.email
      ? JSON.stringify({
          properties: {
            email: req.query.email,
            firstname: req.query.firstname,
            lastname: req.query.lastname,
            company: req.query.company,
          },
        })
      : JSON.stringify(req.body);
    console.log("hubspotrequestbody", body);
    const crmdata = await fetch(`${baseUrl}/crm/v3/objects/${entity}`, {
      method: "POST",
      headers,
      body,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res.status(200).json(crmdata.results);
  }
  return res.status(400).json({ status: "Error", message: "Invalid endpoint" });
}
