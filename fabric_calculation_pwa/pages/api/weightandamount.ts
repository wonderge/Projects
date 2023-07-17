import type { NextApiRequest, NextApiResponse } from 'next';
import withCheck from '../../middlewares/withCheck';
import { FabricType, TubeType, WeightAmountModel } from '../../models/WeightAmount.model';
import { Data } from '../../types/ResType';
import { isEnum, isNum } from '../../utils/helpers/check';

const checkInputs = (req: NextApiRequest): boolean => {
  const { tube, fabric, weight } = req.body;
  return isEnum(tube, TubeType) && isEnum(fabric, FabricType) && isNum(weight)
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { tube, fabric, weight }: WeightAmountModel = req.body
  const tubeWeight = tube === TubeType.Small ? 220 : 270
  const fabricWeight = fabric === FabricType.Satin ? 210 : 250
  const weightInGrams = weight * 1000

  const result = (weightInGrams - tubeWeight) / fabricWeight
  res.json({ result: Number(result.toFixed(1)) })
}

export default withCheck(handler, checkInputs)