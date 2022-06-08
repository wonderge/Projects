import type { NextApiRequest, NextApiResponse } from 'next'
import { isEnum, isNum } from '../../helpers/check';
import { NapkinModel, NapkinType } from '../../models/NapkinModel';
import type ResModel from '../../models/ResModel';

const checkInputs = (req: NextApiRequest) => {
  const { amount, type, length, width, fabricWidth, fabricAmount }: any = req.body;
  const numCheck = isNum(amount) && isNum(length) && isNum(width) && isNum(fabricWidth) && isNum(fabricAmount)
  const typeCheck = isEnum(type, NapkinType)
  return numCheck && typeCheck
}

export default (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }

  if (!checkInputs(req)) {
    return res.status(400).json({ message: 'Invalid inputs' })
  }

  const { amount, type, fabricWidth, fabricAmount }: NapkinModel = req.body;
  let { length, width }: NapkinModel = req.body;
  let meters = 0, yards = 0, amountResult = 0;

  if (type === NapkinType.Hemmed) {
    length += 1.5;
    width += 1.5;
  }

  const fcalc = fabricAmount === 0;

  let args = [];
  if (fabricWidth % length < fabricWidth % width) {
    args = [length, width]
  } else {
    args = [width, length]
  }

  if (fcalc) {
    yards = (Math.ceil(amount / Math.floor(fabricWidth / args[0])) * args[1] / 36) * 1.03 + 0.1;
    meters = (Math.ceil(amount / Math.floor(fabricWidth / args[0])) * args[1] / 39) * 1.03 + 0.1;
  } else {
    amountResult = Math.floor(fabricAmount * 36 / args[1] * Math.floor(fabricWidth / args[0]) / 1.03);
  }

  res.json({ yards: yards.toFixed(1).toString(), meters: meters.toFixed(1).toString(), amount: amountResult.toFixed(1).toString() })
}