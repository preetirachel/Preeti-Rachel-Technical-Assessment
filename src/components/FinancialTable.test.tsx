import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FinancialTable from "./FinancialTable";

const mockData: Array<{
  ticker: string;
  price: number;
  assetClass: "Equities" | "Macro" | "Credit";
}> = [
  { ticker: "BETA", price: 3791.37, assetClass: "Equities" },
  { ticker: "GAMMA", price: -2299.1, assetClass: "Equities" },
  { ticker: "ALPHA", price: 3150.67, assetClass: "Credit" },
  { ticker: "ETA", price: 3089.2, assetClass: "Macro" },
];

describe("FinancialTable", () => {
  test("renders table with data", () => {
    render(<FinancialTable data={mockData} />);
    expect(screen.getByText("BETA")).toBeVisible();
    expect(screen.getByText("GAMMA")).toBeVisible();
    expect(screen.getByText("ALPHA")).toBeVisible();
    expect(screen.getByText("ETA")).toBeVisible();
  });

  test("sorts by asset class - Equities first, Macro, Credit last", async () => {
    const user = userEvent.setup();
    render(<FinancialTable data={mockData} />);

    await user.click(screen.getByText("Sort by Asset Class"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("BETA");
    expect(rows[1]).toHaveTextContent("Equities");
    expect(rows[2]).toHaveTextContent("GAMMA");
    expect(rows[2]).toHaveTextContent("Equities");
    expect(rows[3]).toHaveTextContent("ETA");
    expect(rows[3]).toHaveTextContent("Macro");
    expect(rows[4]).toHaveTextContent("ALPHA");
    expect(rows[4]).toHaveTextContent("Credit");
  });

  test("sorts by price in descending order", async () => {
    const user = userEvent.setup();
    render(<FinancialTable data={mockData} />);

    await user.click(screen.getByText("Sort by Price"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("BETA");
    expect(rows[1]).toHaveTextContent("$3791.37");
    expect(rows[2]).toHaveTextContent("ALPHA");
    expect(rows[2]).toHaveTextContent("$3150.67");
    expect(rows[3]).toHaveTextContent("ETA");
    expect(rows[3]).toHaveTextContent("$3089.20");
    expect(rows[4]).toHaveTextContent("GAMMA");
    expect(rows[4]).toHaveTextContent("$-2299.10");
  });

  test("sorts by ticker alphabetically", async () => {
    const user = userEvent.setup();
    render(<FinancialTable data={mockData} />);

    await user.click(screen.getByText("Sort by Ticker"));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("ALPHA");
    expect(rows[2]).toHaveTextContent("BETA");
    expect(rows[3]).toHaveTextContent("ETA");
    expect(rows[4]).toHaveTextContent("GAMMA");
  });

  test("displays positive prices in blue", () => {
    render(<FinancialTable data={mockData} />);
    const positivePrice = screen.getByText("$3791.37");
    expect(positivePrice).toHaveClass("text-blue-600");
  });

  test("displays negative prices in red", () => {
    render(<FinancialTable data={mockData} />);
    const negativePrice = screen.getByText("$-2299.10");
    expect(negativePrice).toHaveClass("text-red-600");
  });

  test("applies blue background to Equities rows", () => {
    render(<FinancialTable data={mockData} />);
    const betaCell = screen.getByText("BETA");
    const equitiesRow = betaCell.closest("tr");
    expect(equitiesRow).toHaveClass("bg-blue-100");
  });

  test("applies white background to Macro rows", () => {
    render(<FinancialTable data={mockData} />);
    const etaCell = screen.getByText("ETA");
    const macroRow = etaCell.closest("tr");
    expect(macroRow).toHaveClass("bg-white");
  });

  test("applies green background to Credit rows", () => {
    render(<FinancialTable data={mockData} />);
    const alphaCell = screen.getByText("ALPHA");
    const creditRow = alphaCell.closest("tr");
    expect(creditRow).toHaveClass("bg-green-100");
  });
});
