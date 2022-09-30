export enum TubeType {
  Small = "Small",
  Big = "Big"
}

export enum FabricType {
  Satin = "Satin",
  Poplin = "Poplin"
}

export type WeightAmountModel = {
  tube: string,
  fabric: string,
  weight: number
}