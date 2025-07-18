import { useQuery } from '@tanstack/react-query';
import axios from '../../api';

export const useQuotations = () => {
  return useQuery({
    queryKey: ['quotations'],
    queryFn: async () => {
      const res = await axios.get('/quotations');
      return res.data;
    },
  });
};
