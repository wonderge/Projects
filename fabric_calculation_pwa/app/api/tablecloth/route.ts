import { TableclothModel } from '@models/Tablecloth.model';
import { isEnum, isNotZero, isNum } from '@utils/check';
import { RequestValidator, RouteHandler, SideType } from '@utils/types';
import withCheck from '@utils/withCheck';
import { NextResponse } from 'next/server';

const checkInputs: RequestValidator = (req) => {
  const { amount, type, length, width, joints, fabricWidth, fabricAmount } = req.content;
  const numCheck = isNum(amount, length, width, fabricWidth, fabricAmount);
  const nonZeroCheck = isNotZero(amount, length, width, fabricWidth) || isNotZero(length, width, fabricWidth, fabricAmount)
  const typeCheck = isEnum(type, SideType);
  const jointsCheck = joints === 0 || joints === 1 || joints === 2
  return numCheck && typeCheck && jointsCheck && nonZeroCheck;
}

const handler: RouteHandler = (req) => {
  const { amount, type, joints, fabricWidth, fabricAmount }: TableclothModel = req.content;
  let { length, width }: TableclothModel = req.content;

  const fcalc = fabricAmount === 0;
  let ratio = 0, leftover, pieces, meters = -1, yards = -1, amountResult = -1;

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
    return NextResponse.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)) }, { status: 200 })
  } else {
    amountResult = Math.floor(fabricAmount / 1.03 * 36 / length / ratio);
    return NextResponse.json({ amount: Number(amountResult.toFixed(1)) }, { status: 200 })
  }
}

export const POST = withCheck(handler, checkInputs)

export const GET = () => NextResponse.json({ message: 'Method GET not allowed' }, { status: 400 })