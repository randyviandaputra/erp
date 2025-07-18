interface BadgeProps {
  label: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
}

const Badge = ({ label, status }: BadgeProps) => {
  const colorMap = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    CANCELED: 'bg-gray-200 text-gray-800',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${status ? colorMap[status] : ''}`}>
      {label}
    </span>
  );
};

export default Badge;
