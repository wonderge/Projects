import { isNotZero } from './../../utils/helpers/check';
import type { NextApiRequest, NextApiResponse } from 'next'
import { isNum } from '../../utils/helpers/check'
import withCheck from '../../middlewares/withCheck'
import { ClipModel } from '../../models/ClipModel'
import ResModel from '../../models/ResModel'

const checkInputs = (req: NextApiRequest): boolean => {
  const { amount, length, width, fabricWidth, skirtAmount, skirtLength } = req.body;
  return isNum(amount, length, width, fabricWidth, skirtAmount, skirtLength) && isNotZero(amount, length, width, fabricWidth, skirtAmount, skirtLength);
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  const { amount, length, width, fabricWidth, skirtAmount, skirtLength }: ClipModel = req.body
  const yards = ((amount * skirtLength * skirtAmount) / Math.floor(fabricWidth / length) * width / 36) * 1.03 + 0.1
  const meters = ((amount * skirtLength * skirtAmount) / Math.floor(fabricWidth / length) * width / 39) * 1.03 + 0.1

  res.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)) })
}

export default withCheck(handler, checkInputs)