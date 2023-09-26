import withCheck from '@utils/withCheck';
import { ChaircoverModel } from '@models/Chaircover.model';
import { isNum, isNotZero } from '@utils/check';
import { NextResponse } from 'next/server';
import { RequestValidator, RouteHandler } from '@utils/types';

const checkInputs: RequestValidator = (req) => {
  const { amount, fabricWidth, a, b, c, d, e, f, g, h } = req.content;
  return isNum(amount, fabricWidth, a, b, c, d, e, f, g, h) && isNotZero(amount, fabricWidth, a, b, c, d, e, f, g, h);
}

const handler: RouteHandler = (req) => {
  const { fabricWidth, a, b, c, e, f, g }: ChaircoverModel = req.content
  let { amount, d, h }: ChaircoverModel = req.content
  let lengths: number[] = [], ratios: number[] = []

  if (a > h) {
    h = a
  }

  if (a > d) {
    d = a
  }

  let ratio = 0
  lengths.push(b + c)
  ratio = Math.floor(fabricWidth / h)
  ratio += Math.floor((fabricWidth - ratio * h) / d)
  ratios.push(ratio)

  lengths.push(b + e)
  ratio = Math.floor(fabricWidth / d)
  ratio += Math.floor((fabricWidth - ratio * d) / h)
  ratios.push(ratio)

  if (f + 2 * g > 60) {
    lengths.push(f + 2 * g)
    ratios.push(Math.floor(fabricWidth / c))
  } else {
    lengths.push(c)
    ratios.push(Math.floor(fabricWidth / (f + 2 * g)))
  }

  const firstRatio = ratios[0]
  amount += firstRatio - (amount % firstRatio)

  const size = lengths.length
  let total = 0

  for (let i = 0; i < size; i++) {
    total += (lengths[i] / ratios[i]) * amount
  }

  const meters = (total / 39) * 1.03 + 0.1
  const yards = (total / 36) * 1.03 + 0.1

  return NextResponse.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)) }, { status: 200 })
}

export const POST = withCheck(handler, checkInputs)

export const GET = () => NextResponse.json({ message: 'Method GET not allowed' }, { status: 400 })