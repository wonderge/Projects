import { SideType } from '@utils/types';

export type TableclothModel = {
  amount: number,
  length: number,
  width: number,
  type: SideType,
  joints: number,
  fabricWidth: number,
  fabricAmount: number
}