import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const contacts = [];
  // const randomName = faker.name.fullName(); // Rowan Nikolaus
  // const randomCompany = faker.company.bs();
  // const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
  console.log("Method", req.method); // adding "Method" in quotes helps us look at console logs to know what stuff I am getting back.
  console.log("Query", req.query);
  console.log("Body", req.body);
  let count = req.query.count || 10;
  for (let i = 0; i < count; i++) {
    const companyname = faker.company.name();
    const name = faker.name.fullName();
    contacts.push({
      name,
      email: faker.internet.email(),
      companyname,
      companyemail:
        name.toLowerCase().replace(/ /g, "") +
        "@" +
        companyname.toLowerCase().replace(/ /g, "").replace(/,/g, "") +
        ".com",
      companysuffix: faker.company.companySuffix(),
    });
  }
  res.status(200).json(contacts);
}
