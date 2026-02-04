
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { fetchFinancialInstruments } from './services/financialApi';

jest.mock('./services/financialApi');

describe('App', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays loading state initially', () => {
        fetchFinancialInstruments.mockReturnValue(new Promise(() => { }));
        render(<App />);
        expect(screen.getByText('Loading...')).toBeVisible();
    });

    test('displays financial instruments after loading', async () => {
        const mockData = [
            { ticker: 'BETA', price: 3791.37, assetClass: 'Equities' },
            { ticker: 'ALPHA', price: 3150.67, assetClass: 'Credit' },
        ];
        fetchFinancialInstruments.mockResolvedValue(mockData);

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('BETA')).toBeVisible();
        });
    });

    test('renders title', async () => {
        fetchFinancialInstruments.mockResolvedValue([]);
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('Financial Instruments')).toBeVisible();
        });
    });
});
