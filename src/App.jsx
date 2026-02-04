import { useState, useEffect } from "react";
import FinancialTable from "./components/FinancialTable";
import { fetchFinancialInstruments } from "./services/financialApi";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const instruments = await fetchFinancialInstruments();
        setData(instruments);
      } catch (error) {
        setError("Error loading data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4">Financial Instruments</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && <FinancialTable data={data} />}
    </div>
  );
}
