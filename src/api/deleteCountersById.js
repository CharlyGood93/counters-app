import { urlAPI } from "../helpers/urlAPI"

export const deleteCountersById = async (id) => {
    const url = urlAPI();
    const request = {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    };
    const resp = await fetch(url, request);
    const deleteCounters = {
        status: resp.status
    };
    console.log(deleteCounters);
    return deleteCounters;

}