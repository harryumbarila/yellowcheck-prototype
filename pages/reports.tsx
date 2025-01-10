import React, { useEffect, useState } from "react";
import { Bar, Pie, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  PointElement,
  Legend,
} from "chart.js";
import * as XLSX from "xlsx";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  PointElement,
  Legend
);

interface Transaction {
  id: number;
  merchant: string;
  date: string;
  amount: string;
  type: "Debit" | "Credit";
  status: "Pending" | "Executed" | "Cancelled";
}

const Reports: React.FC = () => {
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    merchant: "",
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Generar datos en el cliente
  useEffect(() => {
    const mockTransactions: Transaction[] = Array.from(
      { length: 50 },
      (_, index) => ({
        id: index + 1,
        merchant: `Merchant ${index + 1}`,
        date: `2025-01-${(index % 30) + 1}`,
        amount: (Math.random() * 1000).toFixed(2),
        type: index % 2 === 0 ? "Debit" : "Credit",
        status:
          index % 3 === 0
            ? "Pending"
            : index % 3 === 1
            ? "Executed"
            : "Cancelled",
      })
    );
    setTransactions(mockTransactions);
  }, []);

  // Filtros
  const filteredTransactions = transactions.filter((tx) => {
    const matchesStatus = filters.status ? tx.status === filters.status : true;
    const matchesDate = filters.date ? tx.date === filters.date : true;
    const matchesMerchant = filters.merchant
      ? tx.merchant.toLowerCase().includes(filters.merchant.toLowerCase())
      : true;
    return matchesStatus && matchesDate && matchesMerchant;
  });

  // Paginación
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Descarga de datos filtrados
  const downloadFilteredData = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data");

    XLSX.writeFile(workbook, "filtered_transactions.xlsx");
  };

  // Datos para gráficas
  const barData = {
    labels: ["Debit", "Credit"],
    datasets: [
      {
        label: "Transaction Amounts",
        data: [
          transactions
            .filter((t) => t.type === "Debit")
            .reduce((sum, t) => sum + parseFloat(t.amount), 0),
          transactions
            .filter((t) => t.type === "Credit")
            .reduce((sum, t) => sum + parseFloat(t.amount), 0),
        ],
        backgroundColor: ["#4A90E2", "#50E3C2"],
      },
    ],
  };

  const pieData = {
    labels: ["Pending", "Executed", "Cancelled"],
    datasets: [
      {
        data: [
          transactions.filter((t) => t.status === "Pending").length,
          transactions.filter((t) => t.status === "Executed").length,
          transactions.filter((t) => t.status === "Cancelled").length,
        ],
        backgroundColor: ["#FFCC00", "#50E3C2", "#D0021B"],
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: "Transaction Scatter",
        data: transactions.map((t) => ({
          x: t.id,
          y: parseFloat(t.amount),
        })),
        backgroundColor: "#4A90E2",
      },
    ],
  };

  // Opciones comunes para las gráficas
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="statusFilter" className="block font-semibold mb-1">
            Filter by Status
          </label>
          <select
            id="statusFilter"
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            className="p-2 border rounded w-full"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Executed">Executed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label htmlFor="dateFilter" className="block font-semibold mb-1">
            Filter by Date
          </label>
          <input
            type="text"
            id="dateFilter"
            value={filters.date}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, date: e.target.value }))
            }
            placeholder="YYYY-MM-DD"
            className="p-2 border rounded w-full"
          />
        </div>

        <div>
          <label htmlFor="merchantFilter" className="block font-semibold mb-1">
            Filter by Merchant
          </label>
          <input
            type="text"
            id="merchantFilter"
            value={filters.merchant}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, merchant: e.target.value }))
            }
            placeholder="Merchant Name"
            className="p-2 border rounded w-full"
          />
        </div>
      </div>

      <button
        onClick={downloadFilteredData}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download Filtered Data
      </button>

      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 h-80">
        <div className="bg-white shadow rounded p-4">
          <Bar data={barData} options={chartOptions} />
        </div>
        <div className="bg-white shadow rounded p-4">
          <Pie data={pieData} options={chartOptions} />
        </div>
        <div className="bg-white shadow rounded p-4">
          <Scatter data={scatterData} options={chartOptions} />
        </div>
      </div>

      {/* Tabla */}
      <section className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Transaction List</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Merchant</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((tx) => (
              <tr key={tx.id} className="border">
                <td className="border p-2">{tx.id}</td>
                <td className="border p-2">{tx.merchant}</td>
                <td className="border p-2">{tx.date}</td>
                <td className="border p-2">${tx.amount}</td>
                <td className="border p-2">{tx.type}</td>
                <td className="border p-2">{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => changePage("prev")}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => changePage("next")}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Reports;
