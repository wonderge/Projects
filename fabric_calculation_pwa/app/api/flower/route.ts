import withCheck from '@utils/withCheck';
import { FlowerModel } from '@models/Flower.model';
import { isNum } from '@utils/check';
import { NextResponse } from 'next/server';
import { RequestValidator, RouteHandler } from '@utils/types';

const checkInputs: RequestValidator = (req)=> {
  const { amount, length, width } = req.content;
  const arrayCheck = Array.isArray(amount);
  const numCheck = isNum(...amount, length, width);
  return arrayCheck && numCheck;
}

const handler: RouteHandler = (req) => {
  const { amount, length, width }: FlowerModel = req.content
  const paperArea = length * width

  let area: number[] = []
  area[0] = 9 * 1152 + 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
  area[1] = 8 * 896 + 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
  area[2] = 7 * 700 + 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
  area[3] = 6 * 528 + 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
  area[4] = 5 * 462 + 8 * 360 + 6 * 255 + 3 * 156 + 4 * 132;
  area[5] = 6 * 196 + 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
  area[6] = 5 * 144 + 6 * 121 + 3 * 72 + 5 * 56;
  area[7] = 6 * 56 + 5 * 42 + 3 * 30 + 3 * 25;
  area[8] = 6 * 42 + 5 * 30 + 5 * 25 + 16;

  let required = 0
  for (let i = 0; i < amount.length; i++) {
    required += area[i] / paperArea * amount[i]
  }
  required = required * 1.03 + 0.1

  return NextResponse.json({ required: Number(required.toFixed(1)) }, { status: 200 })
}

export const POST = withCheck(handler, checkInputs)

export const GET = () => NextResponse.json({ message: 'Method GET not allowed' }, { status: 400 })