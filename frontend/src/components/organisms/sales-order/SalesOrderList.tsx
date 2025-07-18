import { useQuery } from '@tanstack/react-query';
import api from '../../../api';
import Badge from '../../atoms/Badge';

export default function SalesOrderList() {

  const { data, isLoading } = useQuery({
    queryKey: ['sales-orders'],
    queryFn: async () => {
      const res = await api.get('/sales-orders');
      return res.data;
    }
  });

  if (isLoading) return <div className="p-4">Loading sales orders...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📦 Sales Orders</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Quotation ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Created By</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Created At</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Approved By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
          {data.map((order: any) => (
              <tr key={order.id} className=" hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.quotationId}</td>
                <td className="p-3">
                  <Badge label={order.quotation.status} status={order.quotation.status} />
                </td>
                <td className="p-3">{order.quotation?.customer?.name || '-'}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="p-3">{order.createdBy?.name || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
