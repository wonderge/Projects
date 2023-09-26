import withCheck from '@utils/withCheck';
import { CurtainModel } from '@models/Curtain.model';
import { isNum, isNotZero } from '@utils/check';
import { RequestValidator, RouteHandler } from '@utils/types';
import { NextResponse } from 'next/server';

const checkInputs: RequestValidator = (req) => {
  const { amount, length, height, fabricWidth, multiple, cuts } = req.content;
  return isNum(amount, length, height, fabricWidth, multiple, cuts) && isNotZero(amount, length, height, fabricWidth, multiple);
}

const handler: RouteHandler = (req) => {
  const { amount, length, height, fabricWidth, multiple, cuts }: CurtainModel = req.content

  let fabricWidthAmount = 0

  if (cuts === 0) {
    fabricWidthAmount = (height * multiple + 5) / fabricWidth
  } else if (cuts === 0) {
    fabricWidthAmount = (height * multiple + 10) / fabricWidth
  }
  fabricWidthAmount = round(amount, fabricWidthAmount)

  const yards = (fabricWidthAmount * (length + 14) / 36) * 1.03 + 0.1
  const meters = (fabricWidthAmount * (length + 14) / 39) * 1.03 + 0.1

  return NextResponse.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)) }, { status: 200 })
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