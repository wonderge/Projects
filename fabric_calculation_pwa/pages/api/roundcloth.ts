import { isNotZero } from './../../utils/helpers/check';
import { RoundclothModel } from './../../models/RoundclothModel';
import type { NextApiRequest, NextApiResponse } from 'next'
import { isNum } from '../../utils/helpers/check'
import withCheck from '../../middlewares/withCheck'
import ResModel from '../../models/ResModel'

const checkInputs = (req: NextApiRequest): boolean => {
  const { amount, diameter, fabricWidth, fabricAmount } = req.body;
  return isNum(amount, diameter, fabricWidth, fabricAmount) && (isNotZero(amount, diameter, fabricWidth) || isNotZero(diameter, fabricWidth, fabricAmount));
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

const handler = (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  const { amount, diameter, fabricWidth, fabricAmount }: RoundclothModel = req.body
  const radius = diameter / 2
  const halfFabricWidth =  fabricWidth / 2
  const sideLength = calculateSidePieceLength(fabricWidth, diameter, radius, halfFabricWidth)

  let yards = 0, meters = 0, amountResult = 0

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
  } else {
    amountResult = Math.floor(fabricAmount * 36 / (sideLength[1] * ((radius - fabricWidth) * 2 / fabricWidth) + (diameter + sideLength[0])) / 1.03);
  }

  return res.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)), amount: Number(amountResult.toFixed(1)), extras: { sideLength } })
}

export default withCheck(handler, checkInputs)