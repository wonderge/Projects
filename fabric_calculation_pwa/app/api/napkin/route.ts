import { NapkinModel } from '@models/Napkin.model';
import { isEnum, isNotZero, isNum } from '@utils/check';
import { RequestValidator, RouteHandler, SideType } from '@utils/types';
import withCheck from '@utils/withCheck';
import { NextResponse } from 'next/server';

const checkInputs: RequestValidator = (req) => {
  const { amount, type, length, width, fabricWidth, fabricAmount } = req.content;
  const numCheck = isNum(amount, length, width, fabricWidth, fabricAmount);
  const nonZeroCheck = isNotZero(amount, length, width, fabricWidth) || isNotZero(length, width, fabricWidth, fabricAmount);
  const typeCheck = isEnum(type, SideType);
  return numCheck && typeCheck && nonZeroCheck;
}

const handler: RouteHandler = (req) => {
  const { amount, type, fabricWidth, fabricAmount }: NapkinModel = req.content;
  let { length, width }: NapkinModel = req.content;
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
    return NextResponse.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)) }, { status: 200 })
  } else {
    amountResult = Math.floor(fabricAmount * 36 / args[1] * Math.floor(fabricWidth / args[0]) / 1.03);
    return NextResponse.json({ amount: Number(amountResult.toFixed(1)) }, { status: 200 })
  }
}

export const POST = withCheck(handler, checkInputs)

export const GET = () => Response.json({ message: 'Method GET not allowed' }, { status: 400 })