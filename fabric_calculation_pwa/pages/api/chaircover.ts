import type { NextApiRequest, NextApiResponse } from 'next'
import { ChaircoverModel } from './../../models/ChaircoverModel';
import { isNum } from '../../helpers/check'
import precheck from '../../middlewares/precheck'
import ResModel from '../../models/ResModel'

const checkInputs = (req: NextApiRequest) => {
  const { amount, fabricWidth, a, b, c, d, e, f, g, h } = req.body
  return isNum(amount) && isNum(fabricWidth) && isNum(a) && isNum(b) && isNum(c) && isNum(d) && isNum(e) && isNum(f) && isNum(g) && isNum(h)
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  const { fabricWidth, a, b, c, e, f, g }: ChaircoverModel = req.body
  let { amount, d, h }: ChaircoverModel = req.body
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

  res.json({ yards: yards.toFixed(1), meters: meters.toFixed(1) })
}

export default precheck(handler, checkInputs)