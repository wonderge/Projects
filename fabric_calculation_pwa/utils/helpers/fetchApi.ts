import ResType from "../../types/ResType";

const fetchApi = async (endpoint: string, payload: { [key: string]: number | string | Array<number> }, locale: string | undefined): Promise<ResType> => {
  const body = JSON.stringify(payload);
  const res: Response = await fetch(`${endpoint}?locale=${locale}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  return await res.json();
}

export default fetchApi;