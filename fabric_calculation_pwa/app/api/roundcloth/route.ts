import withCheck from '@utils/withCheck';
import { RoundclothModel } from '@models/Roundcloth.model';
import { RequestValidator, RouteHandler, SideType } from '@utils/types';
import { isNum, isNotZero, isEnum } from '@utils/check';
import { NextResponse } from 'next/server';

const checkInputs: RequestValidator = (req) => {
  const { amount, diameter, fabricWidth, fabricAmount, type } = req.content;
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

const handler: RouteHandler = (req) => {
  const { amount, fabricWidth, fabricAmount, type }: RoundclothModel = req.content
  let { diameter }: RoundclothModel = req.content
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
    return NextResponse.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)), extras: { sideLength } }, { status: 200 })
  } else {
    amountResult = Math.floor(fabricAmount * 36 / (sideLength[1] * ((radius - fabricWidth) * 2 / fabricWidth) + (diameter + sideLength[0])) / 1.03);
    return NextResponse.json({ amount: Number(amountResult.toFixed(1)), extras: { sideLength } }, { status: 200 })
  }
}

export const POST = withCheck(handler, checkInputs)

export const GET = () => NextResponse.json({ message: 'Method GET not allowed' }, { status: 400 })