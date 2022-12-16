import { isNotZero } from './../../utils/helpers/check';
import type { NextApiRequest, NextApiResponse } from 'next'
import { isNum } from '../../utils/helpers/check'
import withCheck from '../../middlewares/withCheck'
import { CurtainModel } from '../../models/CurtainModel'
import ResModel from '../../models/ResModel'

const checkInputs = (req: NextApiRequest): boolean => {
  const { amount, length, height, fabricWidth, multiple, cuts } = req.body;
  return isNum(amount, length, height, fabricWidth, multiple, cuts) && isNotZero(amount, length, height, fabricWidth, multiple);
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  const { amount, length, height, fabricWidth, multiple, cuts }: CurtainModel = req.body

  let fabricWidthAmount = 0

  if (cuts === 0) {
    fabricWidthAmount = (height * multiple + 5) / fabricWidth
  } else if (cuts === 1) {
    fabricWidthAmount = (height * multiple + 10) / fabricWidth
  }
  fabricWidthAmount = round(amount, fabricWidthAmount)

  const yards = (fabricWidthAmount * (length + 14) / 36) * 1.03 + 0.1
  const meters = (fabricWidthAmount * (length + 14) / 39) * 1.03 + 0.1

  res.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)) })
}

const round = (amount: number, fabricWidthAmount: number) => {
  const floor = Math.floor(fabricWidthAmount)
  const mid = floor + 0.5
  const ceil = Math.ceil(fabricWidthAmount)

  if (amount === 1) {
    if (fabricWidthAmount <= floor + 0.2) {
      return floor
    } else if (fabricWidthAmount > floor + 0.2 && fabricWidthAmount <= mid) {
      return mid
    }
  }

  if (fabricWidthAmount <= mid) {
    return mid
  } else {
    return ceil
  }
}

export default withCheck(handler, checkInputs)