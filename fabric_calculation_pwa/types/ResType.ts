export type ResType = {
  status: number,
  data: Data
}

export type Data = {
  yards?: number,
  meters?: number,
  amount?: number,
  message?: string,
  required?: number,
  result?: number,
  extras?: any
}