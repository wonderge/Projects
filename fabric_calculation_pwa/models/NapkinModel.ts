export enum NapkinType {
  Hemmed = "Hemmed",
  Marrow = "Marrow"
}

export type NapkinModel = {
  amount: number,
  length: number,
  width: number,
  type: NapkinType,
  fabricWidth: number,
  fabricAmount: number
}