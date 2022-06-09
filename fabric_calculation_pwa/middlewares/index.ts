import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import ResModel from "../models/ResModel";

export default (handler: NextApiHandler<ResModel>, checkInputs: (req: NextApiRequest) => boolean) => (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }

  if (!checkInputs(req)) {
    return res.status(400).json({ message: 'Invalid inputs' })
  }

  return handler(req, res)
}