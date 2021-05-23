import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route exact path={props.path}>
      {props.loggedin ? props.children : <Redirect to='/' />}
    </Route>
  );
}

export default ProtectedRoute;
