import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/rootReducer';

const App: FC = () => {
  const Home = lazy(() => import('./components/Home'))
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Suspense fallback={<p>Loading...</p>}>
            {isLoggedIn ? <Home /> : null}
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
};


export default App;