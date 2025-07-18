import { useEffect, useState } from 'react';
import Button from '../../atoms/Button';
import api from '../../../api';

interface ProductWithQuantity {
  quantity: number;
}

interface Props {
  value: ProductWithQuantity[];
  onChange: (value: ProductWithQuantity[]) => void;
}

export default function ProductSelector({ value, onChange }: Props) {
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data));
  }, []);

  const handleAdd = () => {
    const product = products.find(p => p.id === selected);
    if (product) {
      const updated = [...value, { ...product, quantity }];
      onChange(updated);
      setSelected('');
      setQuantity(1);
    }
  };

  const handleRemove = (id: string) => {
    onChange(value.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <select value={selected} onChange={e => setSelected(e.target.value)} className="border p-2 rounded w-full">
          <option value="">Select product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          className="w-20 border p-2 rounded"
        />
        <Button type="button" onClick={handleAdd}>Add</Button>
      </div>

      <ul className="text-sm">
        {value.map(p => (
          <li key={p.id} className="flex justify-between items-center border-b py-1">
            <span>{p.name} x {p.quantity}</span>
            <Button variant="danger" onClick={() => handleRemove(p.id)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
