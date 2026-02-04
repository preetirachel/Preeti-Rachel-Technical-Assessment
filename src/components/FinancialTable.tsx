import { useState, useMemo } from "react";

interface FinancialInstrument {
  ticker: string;
  price: number;
  assetClass: "Equities" | "Macro" | "Credit";
}

interface FinancialTableProps {
  data: FinancialInstrument[];
}

type SortField = "ticker" | "price" | "assetClass" | null;

const ASSET_CLASS_PRIORITY = {
  Equities: 0,
  Macro: 1,
  Credit: 2,
};

const FinancialTable = ({ data }: FinancialTableProps) => {
  const [sortField, setSortField] = useState<SortField>(null);

  if (!data || data.length === 0) {
    return <p className="text-gray-500">No financial data available.</p>;
  }

  const sortedData = useMemo(() => {
    if (!sortField) return data;

    const dataCopy = [...data];

    switch (sortField) {
      case "assetClass":
        return dataCopy.sort((a, b) => {
          const priorityDiff =
            ASSET_CLASS_PRIORITY[a.assetClass] -
            ASSET_CLASS_PRIORITY[b.assetClass];
          return priorityDiff !== 0
            ? priorityDiff
            : a.ticker.localeCompare(b.ticker);
        });
      case "price":
        return dataCopy.sort((a, b) => b.price - a.price);
      case "ticker":
        return dataCopy.sort((a, b) => a.ticker.localeCompare(b.ticker));
      default:
        return dataCopy;
    }
  }, [data, sortField]);

  const getRowColor = (assetClass: string) => {
    const colors = {
      Equities: "bg-blue-100",
      Macro: "bg-white",
      Credit: "bg-green-100",
    };
    return colors[assetClass as keyof typeof colors] || "bg-white";
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setSortField("assetClass")}
          className={`px-4 py-2 mr-1 border-2 border-gray-800 cursor-pointer font-sans text-sm ${
            sortField === "assetClass"
              ? "bg-gray-800 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Sort by Asset Class
        </button>
        <button
          onClick={() => setSortField("price")}
          className={`px-4 py-2 mr-1 border-2 border-gray-800 cursor-pointer font-sans text-sm ${
            sortField === "price"
              ? "bg-gray-800 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Sort by Price
        </button>
        <button
          onClick={() => setSortField("ticker")}
          className={`px-4 py-2 mr-1 border-2 border-gray-800 cursor-pointer font-sans text-sm ${
            sortField === "ticker"
              ? "bg-gray-800 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Sort by Ticker
        </button>
        {sortField && (
          <button
            onClick={() => setSortField(null)}
            className="px-4 py-2 mr-1 border-2 border-gray-800 bg-gray-300 cursor-pointer font-sans text-sm hover:bg-gray-400"
          >
            Clear
          </button>
        )}
      </div>

      <table className="border-collapse w-full font-sans border-2 border-gray-800">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-800 p-2.5 text-left">Ticker</th>
            <th className="border border-gray-800 p-2.5 text-left">
              Asset Class
            </th>
            <th className="border border-gray-800 p-2.5 text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((instrument, index) => {
            if (!instrument) return null;
            return (
              <tr
                key={`${instrument.ticker}-${index}`}
                className={getRowColor(instrument.assetClass)}
              >
                <td className="border border-gray-800 p-2.5">
                  {instrument.ticker || "N/A"}
                </td>
                <td className="border border-gray-800 p-2.5">
                  {instrument.assetClass || "N/A"}
                </td>
                <td
                  className={`border border-gray-800 p-2.5 text-right ${(instrument.price ?? 0) >= 0 ? "text-blue-600" : "text-red-600"}`}
                >
                  {instrument.price != null
                    ? `$${instrument.price.toFixed(2)}`
                    : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTable;
