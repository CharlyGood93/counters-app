import { urlAPI } from "../helpers/urlAPI";

export const updateCountersById = async (id, opt) => {

    const url = `${urlAPI() + '/' + opt}`;
    const request = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    };
    const resp = await fetch(url, request);
    const updateCounters = {
        status: resp.status,
        data: resp.status === 200 ? await resp.json() : []
    };
    return updateCounters;
}