import type { NextApiRequest, NextApiResponse } from 'next'
import { isNum, isEnum } from '../../helpers/check';
import { SideType } from './../../models/SideType';
import ResModel from '../../models/ResModel'
import withCheck from '../../middlewares/index'

const checkInputs = (req: NextApiRequest): boolean => {
  const { amount, type, length, width, joints, fabricWidth, fabricAmount }: any = req.body;
  const numCheck = isNum(amount) && isNum(length) && isNum(width) && isNum(joints) &&isNum(fabricWidth) && isNum(fabricAmount)
  const typeCheck = isEnum(type, SideType)
  return numCheck && typeCheck
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }

  if (!checkInputs(req)) {
    return res.status(400).json({ message: 'Invalid inputs' })
  }
}

export default withCheck(handler, checkInputs)