import React, { useState } from "react";
import { useRouter } from "next/router";

interface ManualRule {
  id: number;
  type: "Debit" | "Credit";
  description: string;
}

interface AutomaticRule {
  id: number;
  name: string;
  type: "Debit" | "Credit";
  trigger: string;
  active: boolean;
}

const Rules: React.FC = () => {
  const router = useRouter();

  const [manualRules] = useState<ManualRule[]>([
    { id: 1, type: "Debit", description: "Terminal purchase adjustments" },
    { id: 2, type: "Debit", description: "Chargeback fees" },
    { id: 3, type: "Credit", description: "Courtesy adjustments" },
    { id: 4, type: "Credit", description: "Fee reimbursements" },
    { id: 5, type: "Debit", description: "Risk-related adjustments" },
    { id: 6, type: "Credit", description: "Billing corrections" },
    { id: 7, type: "Debit", description: "Fraud detection adjustments" },
    { id: 8, type: "Credit", description: "Promotional adjustments" },
  ]);

  const [automaticRules, setAutomaticRules] = useState<AutomaticRule[]>([
    { id: 1, name: "Insufficient Funds", type: "Debit", trigger: "Account balance < $0", active: true },
    { id: 2, name: "High Volume Transactions", type: "Credit", trigger: "More than 10 credits in 1 hour", active: false },
    { id: 3, name: "Large Debit Transactions", type: "Debit", trigger: "Single debit > $10,000", active: true },
    { id: 4, name: "Duplicate Transactions", type: "Debit", trigger: "Two identical transactions in 10 minutes", active: false },
    { id: 5, name: "Failed ACH Retry", type: "Debit", trigger: "Three failed ACH retries", active: true },
    { id: 6, name: "Promotional Credit Cap", type: "Credit", trigger: "Promotional credits > $1,000/day", active: false },
    { id: 7, name: "Weekend Transactions", type: "Debit", trigger: "Transactions on weekends", active: true },
    { id: 8, name: "Daily Credit Limit", type: "Credit", trigger: "Credits > $50,000/day", active: false },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  const toggleRuleStatus = (id: number) => {
    setAutomaticRules((prevRules) =>
      prevRules.map((rule) =>
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
  };

  const filteredManualRules = manualRules.filter((rule) =>
    filterType ? rule.type === filterType : true
  );

  const filteredAutomaticRules = automaticRules.filter((rule) => {
    const matchesSearch = searchQuery
      ? rule.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesType = filterType ? rule.type === filterType : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Rules</h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Automatic Rules"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Types</option>
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
        </select>
      </div>

      {/* Manual Rules */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Manual Rules</h2>
        <ul className="list-disc pl-6">
          {filteredManualRules.map((rule) => (
            <li key={rule.id}>
              <strong>{rule.type}:</strong> {rule.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Automatic Rules */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Automatic Rules</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Trigger</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAutomaticRules.map((rule) => (
              <tr key={rule.id} className="border">
                <td className="border p-2">{rule.name}</td>
                <td className="border p-2">{rule.type}</td>
                <td className="border p-2">{rule.trigger}</td>
                <td className="border p-2">
                  {rule.active ? "Active" : "Inactive"}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => toggleRuleStatus(rule.id)}
                    className={`px-4 py-2 rounded ${
                      rule.active
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {rule.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Botón para Crear Reglas */}
      <div>
        <button
          onClick={() => router.push("/create-rule")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Rule Template
        </button>
      </div>
    </div>
  );
};

export default Rules;
