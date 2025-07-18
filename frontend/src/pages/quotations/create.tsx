import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Select from 'react-select';
import axios from '../../api';
import withLayout from '../../components/layouts/withLayout';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Customer {
  id: string;
  name: string;
}

function CreateQuotationPage() {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerSearch, setCustomerSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [activeProductIndex, setActiveProductIndex] = useState<number | null>(null);

  const [productRows, setProductRows] = useState<
    { product: Product | null; quantity: number }[]
  >([{ product: null, quantity: 1 }]);

  const { data: customers = [] } = useQuery({
    queryKey: ['customers', customerSearch],
    queryFn: async () => {
      const res = await axios.get('/customers', { params: { search: customerSearch } });
      return res.data;
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products', productSearch],
    queryFn: async () => {
      const res = await axios.get('/products', { params: { search: productSearch } });
      return res.data;
    },
  });

  const handleCustomerInputChange = useMemo(
    () => debounce((value: string) => setCustomerSearch(value), 300),
    []
  );

  const handleProductInputChange = useMemo(
    () => debounce((value: string) => setProductSearch(value), 300),
    []
  );

  const handleAddRow = () =>
    setProductRows([...productRows, { product: null, quantity: 1 }]);

  const handleRemoveRow = (index: number) =>
    setProductRows(productRows.filter((_, i) => i !== index));

  const createMutation = useMutation({
    mutationFn: (payload: any) => axios.post('/quotations', payload),
    onSuccess: () => navigate('/quotations'),
  });

  const handleSubmit = () => {
    if (!selectedCustomer) return;
    const items = productRows
      .filter((r) => r.product)
      .map((r) => ({ productId: r.product!.id, quantity: r.quantity }));

    createMutation.mutate({ customerId: selectedCustomer.id, items });
  };

  const total = productRows.reduce((sum, r) => {
    return sum + (r.product ? r.product.price * r.quantity : 0);
  }, 0);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 z-50">
      <h1 className="text-2xl font-bold mb-6">📝 Create Quotation</h1>

      {/* Customer Select */}
      <div className="mb-6 z-50">
        <label className="block text-sm font-medium mb-1">Select Customer</label>
        <Select
          placeholder="Search customer..."
          options={customers.map((c: Customer) => ({ value: c.id, label: c.name }))}
          onInputChange={handleCustomerInputChange}
          onChange={(option) =>
            setSelectedCustomer(customers.find((c) => c.id === option?.value) || null)
          }
          value={
            selectedCustomer
              ? { value: selectedCustomer.id, label: selectedCustomer.name }
              : null
          }
          isClearable
        />
        {selectedCustomer && (
          <p className="text-sm mt-2 text-green-700">Selected: {selectedCustomer.name}</p>
        )}
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto z-50">
        <table className="w-full text-sm border rounded shadow-sm bg-white dark:bg-gray-900">
          <thead className="bg-gray-100 dark:bg-gray-700 text-left">
            <tr>
              <th className="p-2">Product</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Unit Price</th>
              <th className="p-2">Subtotal</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {productRows.map((row, index) => (
              <tr key={index} className="border-t align-top">
                <td className="p-2 min-w-[200px]">
                  <Select
                    placeholder="Search product..."
                    onInputChange={handleProductInputChange}
                    onFocus={() => setActiveProductIndex(index)}
                    options={products.map((p: Product) => ({
                      value: p.id,
                      label: `${p.name} ($${p.price})`,
                    }))}
                    onChange={(option) => {
                      const selectedProduct = products.find((p) => p.id === option?.value) || null;
                      setProductRows((prev) =>
                        prev.map((r, i) => (i === index ? { ...r, product: selectedProduct } : r))
                      );
                    }}
                    value={
                      row.product
                        ? { value: row.product.id, label: `${row.product.name} ($${row.product.price})` }
                        : null
                    }
                    isClearable
                    menuPortalTarget={document.body}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  />
                </td>
                <td className="p-2 w-20">
                  <input
                    type="number"
                    min={1}
                    className="w-full border px-2 py-1 rounded"
                    value={row.quantity}
                    onChange={(e) =>
                      setProductRows((prev) =>
                        prev.map((r, i) =>
                          i === index ? { ...r, quantity: +e.target.value } : r
                        )
                      )
                    }
                  />
                </td>
                <td className="p-2">${row.product?.price ?? '-'}</td>
                <td className="p-2">
                  {row.product
                    ? `$${(row.quantity * row.product.price).toFixed(2)}`
                    : '-'}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Button */}
      <button
        onClick={handleAddRow}
        className="mt-4 text-blue-600 hover:underline"
      >
        + Add Product
      </button>

      {/* Total */}
      <div className="mt-6 text-right text-lg font-semibold">
        Total: ${total.toFixed(2)}
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Create Quotation
        </button>
      </div>
    </div>
  );
}

export default withLayout(CreateQuotationPage);
