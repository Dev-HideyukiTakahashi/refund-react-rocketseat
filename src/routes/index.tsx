import { BrowserRouter } from 'react-router';
import { Loading } from '../components/Loading';
import { AuthRoutes } from './auth-routes';
import { EmployeeRoutes } from './employee-routes';
import { ManagerRoutes } from './manager-routes';

const isLoading = false;

const session = {
  user: {
    role: '',
  },
};

export function Routes() {
  function Route() {
    switch (session.user.role) {
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
