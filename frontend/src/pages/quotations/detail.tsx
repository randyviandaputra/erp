import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from '../../api';
import withLayout from '../../components/layouts/withLayout';
import Badge from '../../components/atoms/Badge';
import { useAuth } from '../../context/AuthContext';

function QuotationDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: quotation, refetch, isLoading } = useQuery({
    queryKey: ['quotation', id],
    queryFn: async () => {
      const res = await axios.get(`/quotations/${id}`);
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: () => axios.put(`/quotations/${id}/approve`),
    onSuccess: () => refetch(),
  });

  if (isLoading || !quotation) {
    return (
      <div className="max-w-4xl mx-auto py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  const total = quotation.items.reduce((sum: number, item: any) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Quotation Detail</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div>
          <p className="text-sm text-gray-500">Customer</p>
          <p className="font-medium">{quotation.customer.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <Badge label={quotation.status} status={quotation.status} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Created By</p>
          <p className="font-medium">{quotation.createdBy?.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Approved By</p>
          <p className="font-medium">{quotation.approvedBy?.name ?? '-'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Created At</p>
          <p className="font-medium">{new Date(quotation.createdAt).toLocaleString()}</p>
        </div>
        {quotation.approvedAt && (
          <div>
            <p className="text-sm text-gray-500">Approved At</p>
            <p className="font-medium">{new Date(quotation.approvedAt).toLocaleString()}</p>
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Quotation Items</h2>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Product</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Unit Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
              {quotation.items.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">{item.product.name}</td>
                  <td className="px-4 py-3">${item.product.price.toLocaleString()}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3 font-semibold">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <td colSpan={3} className="px-4 py-3 text-right font-semibold">
                  Total
                </td>
                <td className="px-4 py-3 font-bold text-green-600 dark:text-green-400">
                  ${total.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {quotation.status === 'PENDING' && user?.role === 'SALES' && (
        <div className="mt-8">
          <button
            onClick={() => approveMutation.mutate()}
            className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-lg font-semibold"
          >
            Approve Quotation
          </button>
        </div>
      )}
    </div>
  );
}

export default withLayout(QuotationDetailPage);
