import QuotationTable from '../../components/organisms/quotation/QuotationTable';
import { QuotationTableSkeleton } from '../../components/organisms/quotation/QuotationTableSkeleton';
import { useQuotations } from '../../hooks/quotations/useQuotations';
import withLayout from '../../components/layouts/withLayout';

function QuotationsPage() {
  const { data, isLoading, isError } = useQuotations();

  return (
    <div>
      {isLoading && <QuotationTableSkeleton />}
      {isError && <div className="text-red-500">Failed to load quotations</div>}
      {data && <QuotationTable quotations={data} />}
    </div>
  );
}

export default withLayout(QuotationsPage);