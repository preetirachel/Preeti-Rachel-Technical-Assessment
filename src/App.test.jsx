import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { fetchFinancialInstruments } from "./services/financialApi";

jest.mock("./services/financialApi");

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially", () => {
    fetchFinancialInstruments.mockReturnValue(new Promise(() => {}));
    render(<App />);
    expect(screen.getByText("Loading...")).toBeVisible();
  });

  test("displays financial instruments after loading", async () => {
    const mockData = [
      { ticker: "BETA", price: 3791.37, assetClass: "Equities" },
      { ticker: "ALPHA", price: 3150.67, assetClass: "Credit" },
    ];
    fetchFinancialInstruments.mockResolvedValue(mockData);

    render(<App />);
    expect(
      await screen.findByRole("cell", { name: "BETA" }),
    ).toBeInTheDocument();
  });

  test("renders title", async () => {
    fetchFinancialInstruments.mockResolvedValue([]);
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Financial Instruments" }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  test("displays error message when fetch fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    fetchFinancialInstruments.mockRejectedValue(new Error("Network error"));
    render(<App />);

    expect(await screen.findByText("Error loading data")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    
    consoleErrorSpy.mockRestore();
  });
});
