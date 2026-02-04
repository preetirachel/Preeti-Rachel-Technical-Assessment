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
    expect(screen.getByRole("cell", { name: "BETA" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "GAMMA" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "ALPHA" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "ETA" })).toBeInTheDocument();
  });

  test("sorts by asset class - Equities first, Macro, Credit last", async () => {
    const user = userEvent.setup();
    render(<FinancialTable data={mockData} />);

    await user.click(
      screen.getByRole("button", { name: "Sort by Asset Class" }),
    );

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

    await user.click(screen.getByRole("button", { name: "Sort by Price" }));

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

    await user.click(screen.getByRole("button", { name: "Sort by Ticker" }));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("ALPHA");
    expect(rows[2]).toHaveTextContent("BETA");
    expect(rows[3]).toHaveTextContent("ETA");
    expect(rows[4]).toHaveTextContent("GAMMA");
  });

  test("displays positive prices in blue", () => {
    render(<FinancialTable data={mockData} />);
    const positivePrice = screen.getByRole("cell", { name: "$3791.37" });
    expect(positivePrice).toHaveClass("text-blue-600");
  });

  test("displays negative prices in red", () => {
    render(<FinancialTable data={mockData} />);
    const negativePrice = screen.getByRole("cell", { name: "$-2299.10" });
    expect(negativePrice).toHaveClass("text-red-600");
  });

  test("applies blue background to Equities rows", () => {
    render(<FinancialTable data={mockData} />);
    const betaCell = screen.getByRole("cell", { name: "BETA" });
    const equitiesRow = betaCell.closest("tr");
    expect(equitiesRow).toHaveClass("bg-blue-100");
  });

  test("applies white background to Macro rows", () => {
    render(<FinancialTable data={mockData} />);
    const etaCell = screen.getByRole("cell", { name: "ETA" });
    const macroRow = etaCell.closest("tr");
    expect(macroRow).toHaveClass("bg-white");
  });

  test("applies green background to Credit rows", () => {
    render(<FinancialTable data={mockData} />);
    const alphaCell = screen.getByRole("cell", { name: "ALPHA" });
    const creditRow = alphaCell.closest("tr");
    expect(creditRow).toHaveClass("bg-green-100");
  });

  test("clears sorting when Clear button is clicked", async () => {
    const user = userEvent.setup();
    render(<FinancialTable data={mockData} />);
    await user.click(screen.getByRole("button", { name: "Sort by Price" }));
    let rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("BETA");

    await user.click(screen.getByRole("button", { name: "Clear" }));
    rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("BETA");
    expect(rows[2]).toHaveTextContent("GAMMA");
    expect(rows[3]).toHaveTextContent("ALPHA");
    expect(rows[4]).toHaveTextContent("ETA");
  });

  test("displays message when no data is provided", () => {
    render(<FinancialTable data={[]} />);
    expect(
      screen.getByText("No financial data available."),
    ).toBeInTheDocument();
  });

  test("displays dash for null price", () => {
    const dataWithNullPrice = [
      { ticker: "TEST", price: null as any, assetClass: "Equities" as const },
    ];
    render(<FinancialTable data={dataWithNullPrice} />);
    expect(screen.getByRole("cell", { name: "-" })).toBeInTheDocument();
  });
});
