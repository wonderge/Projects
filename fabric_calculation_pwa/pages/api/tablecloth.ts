import { TableclothModel } from './../../models/TableclothModel';
import type { NextApiRequest, NextApiResponse } from 'next'
import { isNum, isEnum } from '../../helpers/check';
import { SideType } from './../../models/SideType';
import ResModel from '../../models/ResModel';
import preCheck from '../../middlewares/precheck';

const checkInputs = (req: NextApiRequest): boolean => {
  const { amount, type, length, width, joints, fabricWidth, fabricAmount }: any = req.body;
  const numCheck = isNum(amount) && isNum(length) && isNum(width) && isNum(fabricWidth) && isNum(fabricAmount);
  const typeCheck = isEnum(type, SideType);
  const jointsCheck = joints === 0 || joints === 1 || joints === 2
  return numCheck && typeCheck && jointsCheck;
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  const { amount, type, joints, fabricWidth, fabricAmount }: TableclothModel = req.body;
  let { length, width }: TableclothModel = req.body;

  const fcalc = fabricAmount === 0;
  let ratio = 0, leftover, pieces, meters = 0, yards = 0, amountResult = 0;

  if (type == SideType.Hemmed) {
    length += 1.5;
    width += 1.5;
  }

  if (joints === 0) {
    ratio = 1;
  } else if (joints === 2) {
    leftover = width - fabricWidth;
    pieces = Math.floor(fabricWidth / leftover);
    ratio = (fabricWidth + (fabricWidth / pieces)) / fabricWidth;
  } else {
    leftover = (width - fabricWidth) / 2;
    pieces = Math.floor(fabricWidth / leftover);
    ratio = (fabricWidth + (fabricWidth / pieces) * 2) / fabricWidth;
  }

  if (fcalc) {
    yards = (Math.ceil(ratio * amount) * length / 36) * 1.03 + 0.1;
    meters = (Math.ceil(ratio * amount) * length / 39) * 1.03 + 0.1;

    if (joints === 0 && width > fabricWidth) {
      yards = 0;
      meters = 0;
    }
  } else {
    amountResult = Math.floor(fabricAmount / 1.03 * 36 / length / ratio);
  }

  return res.json({ yards: yards.toFixed(1), meters: meters.toFixed(1), amount: amountResult.toFixed(1) })
}

export default preCheck(handler, checkInputs)