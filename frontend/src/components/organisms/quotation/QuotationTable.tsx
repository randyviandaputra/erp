import React, { useMemo, useState } from "react";
import { format, isAfter, isBefore } from "date-fns";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Badge from "../../atoms/Badge";
import Button from "../../atoms/Button";
import { useAuth } from "../../../context/AuthContext";

interface Props {
  quotations: any;
}

const QuotationTable: React.FC<Props> = ({ quotations }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const filteredQuotations = useMemo(() => {
    return quotations.data?.filter((q) => {
      const matchStatus = statusFilter ? q.status === statusFilter : true;

      const createdDate = new Date(q.createdAt);
      const matchStart = startDate ? isAfter(createdDate, startDate) || createdDate.toDateString() === startDate.toDateString() : true;
      const matchEnd = endDate ? isBefore(createdDate, endDate) || createdDate.toDateString() === endDate.toDateString() : true;

      return matchStatus && matchStart && matchEnd;
    });
  }, [quotations.data, statusFilter, startDate, endDate]);

  return (
    <div className="rounded-lg shadow-sm overflow-x-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3">
        <h2 className="text-lg font-semibold">Quotations</h2>
        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start date"
            className="border px-2 py-1 rounded"
            isClearable
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End date"
            className="border px-2 py-1 rounded"
            isClearable
          />
        </div>

        {user?.role === "CUSTOMER" && (
          <Button onClick={() => navigate("/quotations/create")}>+ Create</Button>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Created At</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Approved At</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
            {filteredQuotations.length > 0 ? (
              filteredQuotations.map((q) => (
                <tr key={q.id}>
                  <td className="px-4 py-2">{q.customer.name}</td>
                  <td className="px-4 py-2"><Badge label={q.status} status={q.status} /></td>
                  <td className="px-4 py-2">{format(new Date(q.createdAt), "yyyy-MM-dd HH:mm")}</td>
                  <td className="px-4 py-2">
                    {q.approvedAt ? format(new Date(q.approvedAt), "yyyy-MM-dd HH:mm") : "-"}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Button variant="primary" onClick={() => navigate(`/quotations/${q.id}`)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No quotations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuotationTable;
