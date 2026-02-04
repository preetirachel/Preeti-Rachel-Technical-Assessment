import { fetchFinancialInstruments } from './financialApi';

describe('fetchFinancialInstruments', () => {
    test('returns array of financial instruments', async () => {
        const result = await fetchFinancialInstruments();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        expect(result[0]).toHaveProperty('ticker');
        expect(result[0]).toHaveProperty('price');
        expect(result[0]).toHaveProperty('assetClass');
    });

    test('all instruments have valid asset classes', async () => {
        const result = await fetchFinancialInstruments();
        const validClasses = ['Equities', 'Macro', 'Credit'];
        result.forEach(instrument => {
            expect(validClasses).toContain(instrument.assetClass);
        });
    });
});
