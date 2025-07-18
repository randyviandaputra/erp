import Navbar from '../organisms/navbar';

const withNavbar = (PageComponent: React.FC) => {
  const PageWithNavbar = () => (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <PageComponent />
      </main>
    </div>
  );
  return PageWithNavbar;
};

export default withNavbar;
