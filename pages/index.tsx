import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <PrivateRoute>
      <Layout>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </Layout>
    </PrivateRoute>
  );
};

export default Dashboard;
