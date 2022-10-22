import ResModel from "../../models/ResModel";

const fetchApi = async (endpoint: string, payload: { [key: string]: number | string }): Promise<ResModel> => {
  const body = JSON.stringify(payload);
  const res: Response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  return await res.json();
}

export default fetchApi;