// Independent from danfo.tsx and danfo2.tsx

import * as dfd from "danfojs";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const df = new dfd.DataFrame(
    { pig: [20, 18, 489, 675, 1776], horse: [4, 25, 281, 600, 1900] },
    { index: [1990, 1997, 2003, 2009, 2014] }
  );
  df.head().print();
  return res.status(200).json({ status: "success", df: dfd.toJSON(df) });
}
