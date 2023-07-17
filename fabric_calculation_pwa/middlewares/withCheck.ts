import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Data } from "../types/ResType";
import getLabels from "../utils/i18n/labels";

export default (handler: NextApiHandler<Data>, checkInputs: (req: NextApiRequest) => boolean) => (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { locale } = req.query;
  const lang = Array.isArray(locale) ? locale[0] : locale;
  const { Invalid_Inputs } = getLabels(lang);
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  if (!checkInputs(req)) {
    return res.status(400).json({ message: Invalid_Inputs });
  }

  return handler(req, res);
}