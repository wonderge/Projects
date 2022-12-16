import { isNotZero } from './../../utils/helpers/check';
import { ButtonCurtainModel } from './../../models/ButtonCurtainModel';
import type { NextApiRequest, NextApiResponse } from 'next'
import { isNum } from '../../utils/helpers/check';
import withCheck from '../../middlewares/withCheck'
import ResModel from '../../models/ResModel';

const checkInputs = (req: NextApiRequest): boolean => {
  const { amount, height, patternSize, fabricWidth } = req.body;
  return isNum(amount, height, patternSize, fabricWidth) && isNotZero(amount, height, patternSize, fabricWidth);
}

const getCircleSize = (side: number, length: number, start: number, end: number): number => {
  length -= 2 * side;
  for (let i = start; i <= end; i++) {
    let circleSize = length / i;
    if (Math.round(circleSize)  % 2 != 0) {
      let size = Math.floor(length / side);
      if (size <= end) {
        return size;
      }
    }
  }
  return 0;
}

const handler = (req: NextApiRequest, res: NextApiResponse<ResModel>) => {
  const { amount, patternSize, fabricWidth }: ButtonCurtainModel = req.body;
  let { height }: ButtonCurtainModel = req.body;
  if (patternSize != 0) {
    height = patternSize * Math.ceil(height / patternSize)
  }

  height += 14;
  let yards = (height * amount / 36) * 1.03 + 0.1;
  let meters = (height * amount / 39) * 1.03 + 0.1;

  let length = fabricWidth * 2.54 - 12
  let sizes: number[] = []
  sizes.push(getCircleSize(5, length, 15, 17));
  sizes.push(getCircleSize(6, length, 18, 20));
  sizes.push(getCircleSize(7, length, 21, 22));

  let side = 5;
  let extras: { sides: number[], sizes: number[], buttonAmounts: number[] } = { sides: [], sizes: [], buttonAmounts: [] }
  sizes.forEach(size => {
    if (size != 0) {
      let newLength = length - 2 * side;
      let buttonAmount = Math.floor(newLength / size) + 1;
      extras.sides.push(side);
      extras.sizes.push(size);
      extras.buttonAmounts.push(buttonAmount);
    }
    side++;
  });
  res.json({ yards: Number(yards.toFixed(1)), meters: Number(meters.toFixed(1)), extras: extras })
}

export default withCheck(handler, checkInputs)