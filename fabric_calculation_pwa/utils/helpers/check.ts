import { TubeType, FabricType } from './../../models/WeightAmountModel';
import { SideType, EndType } from './../../models/SideType';
export const isNum = (...values: any[]): boolean => {
  return values.every(value => typeof(value) === 'number');
}

export const isNotZero = (...values: any[]): boolean => {
  return values.every(value => value !== 0);
}

type SupportedEnums = typeof SideType | typeof EndType | typeof TubeType | typeof FabricType

export const isEnum = (value: any, enumClass: SupportedEnums): boolean => {
  for (let item in enumClass) {
    if (value === item) {
      return true;
    }
  }

  return false;
}