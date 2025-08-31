import { BrowserRouter } from 'react-router';
import { Loading } from '../components/Loading';
import { useAuth } from '../hooks/useAuth';
import { AuthRoutes } from './auth-routes';
import { EmployeeRoutes } from './employee-routes';
import { ManagerRoutes } from './manager-routes';

export function Routes() {
  const { session, isLoading } = useAuth();

  function Route() {
    switch (session?.user.role) {
      case 'employee':
        return <EmployeeRoutes />;
      case 'manager':
        return <ManagerRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
