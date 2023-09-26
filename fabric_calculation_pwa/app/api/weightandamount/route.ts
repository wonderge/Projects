import withCheck from '@utils/withCheck';
import { FabricType, TubeType, WeightAmountModel } from '@models/WeightAmount.model';
import { isEnum, isNum } from '@utils/check';
import { NextResponse } from 'next/server';
import { RequestValidator, RouteHandler } from '@utils/types';

const checkInputs: RequestValidator = (req) => {
  const { tube, fabric, weight } = req.content;
  return isEnum(tube, TubeType) && isEnum(fabric, FabricType) && isNum(weight)
}

const handler: RouteHandler = (req) => {
  const { tube, fabric, weight }: WeightAmountModel = req.content
  const tubeWeight = tube === TubeType.Small ? 220 : 270
  const fabricWeight = fabric === FabricType.Satin ? 210 : 250
  const weightInGrams = weight * 1000

  const result = (weightInGrams - tubeWeight) / fabricWeight
  return NextResponse.json({ result: Number(result.toFixed(1)) }, { status: 200 })
}

export const POST = withCheck(handler, checkInputs)

export const GET = () => NextResponse.json({ message: 'Method GET not allowed' }, { status: 400 })