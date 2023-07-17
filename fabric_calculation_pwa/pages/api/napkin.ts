import type { NextApiRequest, NextApiResponse } from 'next';
import withCheck from '../../middlewares/withCheck';
import { NapkinModel } from '../../models/Napkin.model';
import { SideType } from '../../types/SideType';
import { isEnum, isNum } from '../../utils/helpers/check';
import { isNotZero } from './../../utils/helpers/check';
import { Data } from '../../types/ResType';

const checkInputs = (req: NextApiRequest): boolean => {
  const { amount, type, length, width, fabricWidth, fabricAmount }: any = req.body;
  const numCheck = isNum(amount, length, width, fabricWidth, fabricAmount);
  const nonZeroCheck = isNotZero(amount, length, width, fabricWidth) || isNotZero(length, width, fabricWidth, fabricAmount);
  const typeCheck = isEnum(type, SideType);
  return numCheck && typeCheck && nonZeroCheck;
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { amount, type, fabricWidth, fabricAmount }: NapkinModel = req.body;
  let { length, width }: NapkinModel = req.body;
  let meters = 0, yards = 0, amountResult = 0;

  if (type === SideType.Hemmed) {
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
    return res.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)) })
  } else {
    amountResult = Math.floor(fabricAmount * 36 / args[1] * Math.floor(fabricWidth / args[0]) / 1.03);
    return res.json({ amount: Number(amountResult.toFixed(1)) })
  }
}

export default withCheck(handler, checkInputs)