import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import clsx from 'clsx';
import ThemeToggle from '../../atoms/ThemeToogle';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Quotations', href: '/quotations', roles: ['ADMIN', 'SALES', 'CUSTOMER'] },
  { label: 'Sales Orders', href: '/sales-orders', roles: ['ADMIN', 'SALES'] },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white dark:bg-gray-900 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="font-semibold text-lg tracking-tight">ERP System</h1>
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            if (!user || (item.roles && !item.roles.includes(user.role))) return null;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={clsx(
                  'text-sm font-medium hover:underline',
                  pathname === item.href ? 'text-blue-400' : 'text-white'
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <ThemeToggle />

          {user ? (
            <button
              onClick={() => logout()}
              className="text-red-400 text-sm hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-sm hover:underline text-blue-400">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
