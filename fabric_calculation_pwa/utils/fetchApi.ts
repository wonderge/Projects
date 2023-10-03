import { ResType } from "./types";

const fetchApi = async (endpoint: string, payload: { [key: string]: number | string | Array<number> }): Promise<ResType> => {
  const body = JSON.stringify(payload);
  const res: Response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  return {
    status: res.status,
    result: await res.json()
  };
}

export default fetchApi;