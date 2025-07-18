import SalesOrderList from '../../components/organisms/sales-order/SalesOrderList';
import withLayout from '../../components/layouts/withLayout';

function SalesOrderListPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <SalesOrderList />
    </div>
  );
}

export default withLayout(SalesOrderListPage);