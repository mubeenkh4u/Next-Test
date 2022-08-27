// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
  message?: string; // optional since it's not always present (use ? for optional)
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Method", req.method); // adding "Method" in quotes helps us look at console logs to know what stuff I am getting back.
  console.log("Query", req.query);
  const search = req.query.search || "pikachu";
  const endpoint = req.query.endpoint || "pokemon";
  console.log("Body", req.body);

  const pokedata = await fetch(
    `https://pokeapi.co/api/v2/${endpoint}/${search}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      if (endpoint != "pokemon") {
        return data;
      } else {
        const pokemon: any = {
          name: data.name,
          id: data.id,
          moves: data.moves.map((move: any) => move.move.name),
        };
        return pokemon;
      }
    });
  res.status(200).json({ status: "Success", message: pokedata });
}
