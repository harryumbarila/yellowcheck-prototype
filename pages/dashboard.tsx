'use client';

import React, { useState } from 'react';

interface Transaction {
  id: number;
  merchant: string;
  date: string;
  amount: string;
  type: string;
  status: string;
  cardNumber: string;
  agent: string;
}

const transactions: Transaction[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  merchant: `Merchant ${index + 1}`,
  date: `2025-01-${(index % 30) + 1}`,
  amount: (Math.random() * 1000).toFixed(2),
  type: index % 2 === 0 ? 'Debit' : 'Credit',
  status: index % 3 === 0 ? 'Pending' : index % 3 === 1 ? 'Executed' : 'Cancelled',
  cardNumber: `**** **** **** ${1000 + index}`,
  agent: index % 2 === 0 ? 'Automated Rule' : 'John Doe',
}));

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const currentTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calcular totales
  const totalDebit = transactions
    .filter((t) => t.type === 'Debit')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalCredit = transactions
    .filter((t) => t.type === 'Credit')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const pendingTransactions = transactions.filter((t) => t.status === 'Pending').length;
  const cancelledTransactions = transactions.filter((t) => t.status === 'Cancelled').length;

  const changePage = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 text-white rounded-lg shadow-md p-4 text-center">
          <h2 className="text-lg font-bold">Total Debit</h2>
          <p className="text-2xl">${totalDebit.toLocaleString()}</p>
        </div>
        <div className="bg-green-500 text-white rounded-lg shadow-md p-4 text-center">
          <h2 className="text-lg font-bold">Total Credit</h2>
          <p className="text-2xl">${totalCredit.toLocaleString()}</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg shadow-md p-4 text-center">
          <h2 className="text-lg font-bold">Pending Transactions</h2>
          <p className="text-2xl">{pendingTransactions}</p>
        </div>
        <div className="bg-red-500 text-white rounded-lg shadow-md p-4 text-center">
          <h2 className="text-lg font-bold">Cancelled Transactions</h2>
          <p className="text-2xl">{cancelledTransactions}</p>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-2">ID</th>
              <th className="p-2">Merchant</th>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Type</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelectedTransaction(transaction)}
              >
                <td className="p-2 text-center">{transaction.id}</td>
                <td className="p-2 text-center">{transaction.merchant}</td>
                <td className="p-2 text-center">{transaction.date}</td>
                <td className="p-2 text-center">${transaction.amount}</td>
                <td className="p-2 text-center">{transaction.type}</td>
                <td className="p-2 text-center text-blue-500 underline">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-l"
          disabled={currentPage === 1}
          onClick={() => changePage('prev')}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          disabled={currentPage === totalPages}
          onClick={() => changePage('next')}
        >
          Next
        </button>
      </div>

      {/* Modal for Transaction Details */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
            <p>
              <strong>Transaction ID:</strong> {selectedTransaction.id}
            </p>
            <p>
              <strong>Merchant:</strong> {selectedTransaction.merchant}
            </p>
            <p>
              <strong>Date:</strong> {selectedTransaction.date}
            </p>
            <p>
              <strong>Amount:</strong> ${selectedTransaction.amount}
            </p>
            <p>
              <strong>Type:</strong> {selectedTransaction.type}
            </p>
            <p>
              <strong>Status:</strong> {selectedTransaction.status}
            </p>
            <p>
              <strong>Card Number:</strong> {selectedTransaction.cardNumber}
            </p>
            <p>
              <strong>Agent:</strong> {selectedTransaction.agent}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setSelectedTransaction(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
