import type { NextApiRequest, NextApiResponse } from 'next'
import { isEnum, isNum } from '../../helpers/check';
import withCheck from '../../middlewares/withCheck'
import ResModel from '../../models/ResModel';
import { FabricType, TubeType, WeightAmountModel } from '../../models/WeightAmountModel';

const checkInputs = (req: NextApiRequest): boolean => {
  const { tube, fabric, weight } = req.body;
  return isEnum(tube, TubeType) && isEnum(fabric, FabricType) && isNum(weight)
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  const { tube, fabric, weight }: WeightAmountModel = req.body
  const tubeWeight = tube === TubeType.Small ? 220 : 270
  const fabricWeight = fabric === FabricType.Satin ? 210 : 250
  const weightInGrams = weight * 1000

  const result = (weight - tubeWeight) / fabricWeight
  res.json({ result: result.toFixed(1) })
}

export default withCheck(handler, checkInputs)