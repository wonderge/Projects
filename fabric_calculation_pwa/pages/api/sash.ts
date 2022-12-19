import type { NextApiRequest, NextApiResponse } from 'next';
import withCheck from '../../middlewares/withCheck';
import ResModel from '../../models/ResModel';
import { isEnum, isNum } from '../../utils/helpers/check';
import { SashModel } from './../../models/SashModel';
import { EndType } from './../../models/SideType';

const checkInputs = (req: NextApiRequest): boolean => {
  const { amount, length, width, fabricWidth, type } = req.body;
  const numCheck = isNum(amount, length, width, fabricWidth);
  const typeCheck = isEnum(type, EndType);
  return numCheck && typeCheck;
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  const { amount, width, fabricWidth, type }: SashModel = req.body
  let { length }: SashModel = req.body

  if (type === EndType.Slant) {
    length += width
  }

  const ratio = Math.floor(fabricWidth / width)
  const yards = (Math.ceil(amount / ratio) * length / 36) * 1.03 + 0.1
  const meters = (Math.ceil(amount / ratio) * length / 39) * 1.03 + 0.1

  return res.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)) })
}

export default withCheck(handler, checkInputs)