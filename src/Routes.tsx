import {
  Route,
  Routes as ReactRouter,
} from 'react-router-dom';
import { PageLoader } from 'components';
import { lazy, Suspense } from 'react';

function Routes() {
  const Stats = lazy(() => import('pages/Stats'));
  const App = lazy(() => import('./App'));

  return (
    <Suspense fallback={<PageLoader />}>
      <ReactRouter>
        <Route path="stats" element={<Stats />} />
        <Route path="*" element={<App />} />
      </ReactRouter>
    </Suspense>
  );
}

export default Routes;
