import { urlAPI } from "../helpers/urlAPI";

export const getAllCounters = async (typeCall) => {
    let url = '';
    if (typeCall === undefined) {
        url = urlAPI();
    } else {
        url = `${'http://localhost:3000' + urlAPI()}`;
    }
    const method = 'get';
    const resp = await fetch(url, { method });
    const counters = {
        status: resp.status,
        data: resp.status === 200 ? await resp.json() : []
    };
    return counters;
}