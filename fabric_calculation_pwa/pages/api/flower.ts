import type { NextApiRequest, NextApiResponse } from 'next'
import { FlowerModel } from './../../models/FlowerModel';
import { isNum } from '../../helpers/check'
import withCheck from '../../middlewares/withCheck'
import ResModel from '../../models/ResModel'

const checkInputs = (req: NextApiRequest): boolean => {
  const { amount, length, width } = req.body
  const arrayCheck = Array.isArray(amount) && amount.every(e => isNum(e))
  const numCheck = isNum(length) && isNum(width)
  return arrayCheck && numCheck
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  const { amount, length, width }: FlowerModel = req.body
  const paperArea = length * width

  let area: number[] = []
  area[0] = 9 * 1152 + 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
  area[1] = 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
  area[2] = 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
  area[3] = 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
  area[4] = 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
  area[5] = 6 * 196 + 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
  area[6] = 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
  area[7] = 6 * 56 + 5 * 42 + 3 * 30 + 3 * 25;
  area[8] = 6 * 42 + 5 * 30 + 5 * 25 + 16;

  let required = 0
  for (let i = 0; i < amount.length; i++) {
    required += area[i] / paperArea * amount[i]
  }
  required = required * 1.03 + 0.1

  res.json({ required: Number(required.toFixed(1)) })
}

export default withCheck(handler, checkInputs)