import React, { useState } from 'react';
import Papa from 'papaparse';

interface Adjustment {
  merchantId: string;
  transactionType: string;
  adjustmentReason: string;
  amount: number;
}

const Adjustments: React.FC = () => {
  const [merchantId, setMerchantId] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [adjustmentReason, setAdjustmentReason] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [csvData, setCsvData] = useState<Adjustment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Validations
  const validateMerchantId = (id: string) => /^\d{10}$/.test(id); // 10 digits only
  const validateAmount = (value: string) => {
    const parsed = parseFloat(value);
    return !isNaN(parsed) && parsed > 0;
  };

  // Submit single adjustment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateMerchantId(merchantId)) {
      setError('Merchant ID must be 10 digits.');
      return;
    }

    if (!validateAmount(amount)) {
      setError('Amount must be greater than 0 and numeric.');
      return;
    }

    setError('');

    const bankNumber = '1234-5678-9012';
    const processDate = new Date().toISOString().split('T')[0];
    const companyName = 'Mock Company Inc.';

    alert(`Adjustment Submitted Successfully!
      - Merchant ID: ${merchantId}
      - Transaction Type: ${transactionType}
      - Adjustment Reason: ${adjustmentReason}
      - Amount: $${amount}
      - Bank Number: ${bankNumber}
      - Process Date: ${processDate}
      - Company Name: ${companyName}`);
  };

  // Handle CSV upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<unknown>) => {
        const parsedData = results.data as Adjustment[];
        setCsvData(parsedData);
        setCurrentPage(1);
      },
      error: () => {
        setError('Failed to parse CSV file. Ensure it is correctly formatted.');
      },
    });
  };

  const handleBatchSubmit = () => {
    if (csvData.length === 0) {
      setError('No data to submit.');
      return;
    }

    alert('Batch submission successful!');
    setCsvData([]); // Clear the data after submission
  };

  // Pagination logic
  const paginatedData = csvData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < Math.ceil(csvData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#F7F9FC', minHeight: '100vh' }}>
      <header
        style={{
          backgroundColor: '#375A7F',
          padding: '20px',
          color: 'white',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <h1>Adjustments</h1>
      </header>

      {/* Form for manual adjustments */}
      <section
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px',
        }}
      >
        <h2>Create Adjustments</h2>
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px' }}>
          <div>
            <label htmlFor="merchantId" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Merchant ID</label>
            <input
              type="text"
              id="merchantId"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
              required
            />
          </div>

          <div>
            <label htmlFor="transactionType" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Transaction Type</label>
            <select
              id="transactionType"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
              required
            >
              <option value="">Select type</option>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
          </div>

          <div>
            <label htmlFor="adjustmentReason" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Adjustment Reason</label>
            <select
              id="adjustmentReason"
              value={adjustmentReason}
              onChange={(e) => setAdjustmentReason(e.target.value)}
              style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
              required
            >
              <option value="">Select a reason</option>
              <option value="terminal_purchase">Terminal Purchase</option>
              <option value="chargeback_fee">Chargeback Fee</option>
              <option value="risk_adjustment">Risk Adjustment</option>
              <option value="courtesy_adjustment">Courtesy Adjustment</option>
              <option value="billing_correction">Billing Correction</option>
            </select>
          </div>

          <div>
            <label htmlFor="amount" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }}
              required
            />
          </div>

          <button type="submit" style={{ backgroundColor: '#375A7F', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Submit Adjustment
          </button>
        </form>
      </section>

      {/* CSV Upload Section */}
      <section
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2>Batch Adjustments</h2>
        <input type="file" accept=".csv" onChange={handleFileUpload} style={{ marginBottom: '20px' }} />

        {csvData.length > 0 && (
          <>
            <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#375A7F', color: 'white' }}>
                  <th>Merchant ID</th>
                  <th>Transaction Type</th>
                  <th>Adjustment Reason</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                    <td>{item.merchantId}</td>
                    <td>{item.transactionType}</td>
                    <td>{item.adjustmentReason}</td>
                    <td>{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button onClick={() => changePage('prev')} disabled={currentPage === 1} style={{ padding: '10px', backgroundColor: '#375A7F', color: 'white', border: 'none', borderRadius: '5px' }}>
                Previous
              </button>
              <span>Page {currentPage} of {Math.ceil(csvData.length / itemsPerPage)}</span>
              <button onClick={() => changePage('next')} disabled={currentPage === Math.ceil(csvData.length / itemsPerPage)} style={{ padding: '10px', backgroundColor: '#375A7F', color: 'white', border: 'none', borderRadius: '5px' }}>
                Next
              </button>
            </div>

            <button onClick={handleBatchSubmit} style={{ marginTop: '20px', backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Submit Batch
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default Adjustments;
