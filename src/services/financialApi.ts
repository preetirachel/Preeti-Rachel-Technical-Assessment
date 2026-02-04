import sampleData from "./sampleData.json";

export interface FinancialInstrument {
  ticker: string;
  price: number;
  assetClass: "Equities" | "Macro" | "Credit";
}

export const fetchFinancialInstruments = async (): Promise<
  FinancialInstrument[]
> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return sampleData as FinancialInstrument[];
};
