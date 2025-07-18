import { Link } from 'react-router-dom';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <p className="mt-4 text-xl font-semibold text-gray-700">Access Forbidden</p>
        <p className="mt-2 text-gray-600">You don’t have permission to view this page.</p>
        <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
          ← Go back to Home
        </Link>
      </div>
    </div>
  );
}
