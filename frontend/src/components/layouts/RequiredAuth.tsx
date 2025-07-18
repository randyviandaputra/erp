import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../api';

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRole?: string; 
}

export default function RequireAuth({ children, requiredRole }: RequireAuthProps) {
  const location = useLocation();

  const { data: me, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get('/auth/me');
      return res.data;
    },
  });

  if (isLoading) return <div className="p-4">Checking authentication...</div>;

  if (!me) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && me.role !== requiredRole) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
}
