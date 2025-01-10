import React, { useState } from "react";
import { useRouter } from "next/router";

const CreateRule: React.FC = () => {
  const router = useRouter();
  const [ruleName, setRuleName] = useState("");
  const [ruleType, setRuleType] = useState<"Debit" | "Credit" | "">("");
  const [ruleTrigger, setRuleTrigger] = useState("");
  const [ruleDescription, setRuleDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!ruleName.trim()) {
      setError("Rule name is required.");
      return;
    }
    if (!ruleType) {
      setError("Rule type must be selected.");
      return;
    }
    if (!ruleTrigger.trim()) {
      setError("Rule trigger is required.");
      return;
    }

    setError("");

    // Mock: Enviar datos
    alert(`
      Rule Created Successfully!
      - Name: ${ruleName}
      - Type: ${ruleType}
      - Trigger: ${ruleTrigger}
      - Description: ${ruleDescription || "N/A"}
    `);

    // Redirigir a la página de reglas
    router.push("/rules");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create Rule</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        {/* Nombre de la Regla */}
        <div>
          <label htmlFor="ruleName" className="block font-semibold mb-2">
            Rule Name
          </label>
          <input
            type="text"
            id="ruleName"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            placeholder="Enter rule name"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Tipo de Regla */}
        <div>
          <label htmlFor="ruleType" className="block font-semibold mb-2">
            Rule Type
          </label>
          <select
            id="ruleType"
            value={ruleType}
            onChange={(e) => setRuleType(e.target.value as "Debit" | "Credit")}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a type</option>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
          </select>
        </div>

        {/* Trigger de la Regla */}
        <div>
          <label htmlFor="ruleTrigger" className="block font-semibold mb-2">
            Rule Trigger
          </label>
          <input
            type="text"
            id="ruleTrigger"
            value={ruleTrigger}
            onChange={(e) => setRuleTrigger(e.target.value)}
            placeholder="Enter trigger condition"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Descripción (Opcional) */}
        <div>
          <label htmlFor="ruleDescription" className="block font-semibold mb-2">
            Description (Optional)
          </label>
          <textarea
            id="ruleDescription"
            value={ruleDescription}
            onChange={(e) => setRuleDescription(e.target.value)}
            placeholder="Enter a description"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Botón de Enviar */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Rule
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRule;
