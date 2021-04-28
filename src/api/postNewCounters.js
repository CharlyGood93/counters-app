import { urlAPI } from "../helpers/urlAPI";

export const postNewCounters = async (name) => {
    const url = urlAPI();
    const request = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: name })
    }
    const resp = await fetch(url, request);
    const newCounters = {
        status: resp.status,
        data: await resp.json()
    }
    console.log(newCounters);
    return newCounters;
}