import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element }) => {
   const isAuthenticated = !!localStorage.getItem('userToken');

   return isAuthenticated ? element : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
   element: PropTypes.element.isRequired,
};

export default PrivateRoute;