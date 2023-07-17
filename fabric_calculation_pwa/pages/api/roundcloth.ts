import type { NextApiRequest, NextApiResponse } from 'next';
import withCheck from '../../middlewares/withCheck';
import { RoundclothModel } from '../../models/Roundcloth.model';
import { Data } from '../../types/ResType';
import { SideType } from '../../types/SideType';
import { isNum } from '../../utils/helpers/check';
import { isNotZero, isEnum } from './../../utils/helpers/check';

const checkInputs = (req: NextApiRequest): boolean => {
  const { amount, diameter, fabricWidth, fabricAmount, type } = req.body;
  const numcheck = isNum(amount, diameter, fabricWidth, fabricAmount);
  const nonZeroCheck = isNotZero(amount, diameter, fabricWidth) || isNotZero(diameter, fabricWidth, fabricAmount);
  const typeCheck = isEnum(type, SideType)
  return numcheck && nonZeroCheck && typeCheck;
}

const calculateSidePieceLength = (fabricWidth: number, diameter: number, radius: number, halfFabricWidth: number): number[] => {
  let sideLength = [0, 0]

  if (diameter / fabricWidth < 1) {
    return [0, 0]
  } else if (diameter / fabricWidth < 2) {
    sideLength[0] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(halfFabricWidth, 2)) * 2)
  } else {
    sideLength[0] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(halfFabricWidth, 2)) * 2)
    sideLength[1] = Math.ceil(Math.sqrt(Math.pow(radius, 2) - Math.pow(fabricWidth, 2)) * 2)
  }

  return sideLength
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { amount, fabricWidth, fabricAmount, type }: RoundclothModel = req.body
  let { diameter }: RoundclothModel = req.body
  const radius = diameter / 2
  const halfFabricWidth = fabricWidth / 2
  const sideLength = calculateSidePieceLength(fabricWidth, diameter, radius, halfFabricWidth)

  let yards = -1, meters = -1, amountResult = -1

  if (type === SideType.Hemmed) {
    diameter += 1.5;
  }

  const fcalc = fabricAmount === 0

  if (fcalc) {
    if ((diameter / fabricWidth) < 1) {
      yards = diameter * amount / 36;
      meters = diameter * amount / 39;
    } else if ((diameter / fabricWidth) < 2) {
      yards = ((diameter + sideLength[0]) * amount + sideLength[0] * Math.ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 36;
      meters = ((diameter + sideLength[0]) * amount + sideLength[0] * Math.ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 39;
    } else {
      yards = ((diameter + sideLength[0]) * amount + sideLength[1] * Math.ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 36;
      meters = ((diameter + sideLength[0]) * amount + sideLength[1] * Math.ceil((radius - fabricWidth) * 2 * amount / fabricWidth)) / 39;
    }
    return res.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)), extras: { sideLength } })
  } else {
    amountResult = Math.floor(fabricAmount * 36 / (sideLength[1] * ((radius - fabricWidth) * 2 / fabricWidth) + (diameter + sideLength[0])) / 1.03);
    return res.json({ amount: Number(amountResult.toFixed(1)), extras: { sideLength } })
  }
}

export default withCheck(handler, checkInputs)