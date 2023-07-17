type ResType = {
  status: number,
  data: Data
}

type Data = {
  yards?: number,
  meters?: number,
  amount?: number,
  message?: string,
  required?: number,
  result?: number,
  extras?: any
}

export default ResType