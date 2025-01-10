import React, { useState } from "react";
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa";

interface GeneratedFile {
  id: number;
  name: string;
  date: string;
}

const GeneratedFiles: React.FC = () => {
  const [files] = useState<GeneratedFile[]>(
    Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `ACH_2025-01-${(i % 30) + 1}.xlsx`,
      date: `2025-01-${(i % 30) + 1}`,
    }))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<GeneratedFile[]>([]);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleDownload = (fileName: string) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([["Placeholder Data"]]); // Mock data
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, fileName);
  };

  const handleSelectFile = (file: GeneratedFile) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.some((f) => f.id === file.id)
        ? prevSelected.filter((f) => f.id !== file.id)
        : [...prevSelected, file]
    );
  };

  const handleBulkDownload = () => {
    selectedFiles.forEach((file) => handleDownload(file.name));
    alert("Bulk download completed.");
  };

  const changePage = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Generated Files</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by file name"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* File List */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Select</th>
            <th className="border p-2 text-left">File Name</th>
            <th className="border p-2 text-left">Date</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFiles.map((file) => (
            <tr key={file.id} className="border">
              <td className="border p-2">
                <input
                  type="checkbox"
                  checked={selectedFiles.some((f) => f.id === file.id)}
                  onChange={() => handleSelectFile(file)}
                />
              </td>
              <td className="border p-2 flex items-center gap-2">
                <FaFileExcel className="text-green-500" />
                {file.name}
              </td>
              <td className="border p-2">{file.date}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDownload(file.name)}
                  className="text-blue-500 underline"
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
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

      {/* Bulk Actions */}
      <div className="mt-6">
        {selectedFiles.length > 0 && (
          <button
            onClick={handleBulkDownload}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download Selected Files
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneratedFiles;
