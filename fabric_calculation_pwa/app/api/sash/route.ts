import { NextResponse } from 'next/server';
import withCheck from '@utils/withCheck';
import { SashModel } from '@models/Sash.model';
import { EndType, RequestValidator, RouteHandler } from '@utils/types';
import { isEnum, isNum } from '@utils/check';

const checkInputs: RequestValidator = (req) => {
  const { amount, length, width, fabricWidth, type } = req.content;
  const numCheck = isNum(amount, length, width, fabricWidth);
  const typeCheck = isEnum(type, EndType);
  return numCheck && typeCheck;
}

const handler: RouteHandler = (req) => {
  const { amount, width, fabricWidth, type }: SashModel = req.content
  let { length }: SashModel = req.content

  if (type === EndType.Slant) {
    length += width
  }

  const ratio = Math.floor(fabricWidth / width)
  const yards = (Math.ceil(amount / ratio) * length / 36) * 1.03 + 0.1
  const meters = (Math.ceil(amount / ratio) * length / 39) * 1.03 + 0.1

  return NextResponse.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)) }, { status: 200 })
}

export const POST = withCheck(handler, checkInputs)

export const GET = () => NextResponse.json({ message: 'Method GET not allowed' }, { status: 400 })