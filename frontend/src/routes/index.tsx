import { createBrowserRouter, Route } from 'react-router-dom';
import LoginPage from '../pages/login';
import QuotationsPage from '../pages/quotations';
import ProtectedLayout from '../components/layouts/RequiredAuth';
import SalesOrderListPage from '../pages/sales-orders';
import CreateQuotationPage from '../pages/quotations/create';
import QuotationDetailPage from '../pages/quotations/detail';
import HomePage from '../pages/home';
import ForbiddenPage from '../pages/error/ForbidenPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/403', element: <ForbiddenPage /> },
  { path: '/quotations', element: <QuotationsPage /> },
  { path: '/quotations/create', element: <CreateQuotationPage /> },
  { path: '/quotations/:id', element: <QuotationDetailPage /> },
  { path: '/sales-orders', element: <SalesOrderListPage /> },
]);
