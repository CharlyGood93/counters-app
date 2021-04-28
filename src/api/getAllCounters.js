import { urlAPI } from "../helpers/urlAPI";

export const getAllCounters = async () => {
    const url = urlAPI();
    const method = 'get';
    const resp = await fetch(url, { method });
    const counters = {
        status: resp.status,
        data: await resp.json()
    }
    return counters;
}