export const QuotationTableSkeleton = () => (
  <div className="overflow-x-auto animate-pulse">
    <table className="w-full min-w-[600px]">
      <thead className="bg-muted text-muted-foreground text-left">
        <tr>
          <th className="px-4 py-2">Customer</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array(3).fill(null).map((_, i) => (
          <tr key={i} className="border-t border-border">
            <td className="px-4 py-3">
              <div className="h-4 bg-muted w-24 rounded" />
            </td>
            <td className="px-4 py-3">
              <div className="h-4 bg-muted w-16 rounded" />
            </td>
            <td className="px-4 py-3 text-right">
              <div className="h-4 bg-muted w-10 rounded ml-auto" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
