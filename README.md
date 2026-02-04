# Financial Instruments Assessment

## Quick Start

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

View test coverage:

```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

## Project Structure

- **components/FinancialTable.tsx** - Table component withn the sorting logic
- **services/financialApi.ts** -This function fetches the data from sampledata.json
- Test files are added for all files
- I have added null checks, error handling and used typescript to handle code stability
