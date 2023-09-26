import withCheck from '@utils/withCheck';
import { ClipModel } from '@models/Clip.model';
import { isNum, isNotZero } from '@utils/check';
import { NextResponse } from 'next/server';
import { RequestValidator, RouteHandler } from '@utils/types';

const checkInputs: RequestValidator = (req) => {
  const { amount, length, width, fabricWidth, skirtAmount, skirtLength } = req.content;
  return isNum(amount, length, width, fabricWidth, skirtAmount, skirtLength) && isNotZero(amount, length, width, fabricWidth, skirtAmount, skirtLength);
}

const handler: RouteHandler = (req) => {
  const { amount, length, width, fabricWidth, skirtAmount, skirtLength }: ClipModel = req.content
  const yards = ((amount * skirtLength * skirtAmount) / Math.floor(fabricWidth / length) * width / 36) * 1.03 + 0.1
  const meters = ((amount * skirtLength * skirtAmount) / Math.floor(fabricWidth / length) * width / 39) * 1.03 + 0.1

  return NextResponse.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)) }, { status: 200 })
}

export const POST = withCheck(handler, checkInputs)

export const GET = () => NextResponse.json({ message: 'Method GET not allowed' }, { status: 400 })