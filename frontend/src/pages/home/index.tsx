import withLayout from "../../components/layouts/withLayout";

function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">ERP Dashboard</h1>
    </div>
  );
}

export default withLayout(HomePage);