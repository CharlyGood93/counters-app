import { getAllCounters } from "../../api/getAllCounters";
import '@testing-library/jest-dom';

describe('Testing getAllCounters', () => {
    
    test('Should return a 200 status ', async () => {
        const counters = await getAllCounters('test');
        expect(counters.status).toBe(200);
    });

    test('Should return a list of counters ', async () => {
        const counters = await getAllCounters('test');
        expect(counters.data).not.toHaveLength(0);
    });
});
