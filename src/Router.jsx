import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from './Components/Spinner/Spinner';
import { NotFound } from './Pages/NotFoundPage/NotFound';

const HomePage = lazy(() => import('./Pages/HomePage/Home'));
const ViewMorePage = lazy(() => import('./Pages/ViewMorePage/ViewMore'));
const CategoriesPage = lazy(() => import('./Pages/CategoriesPage/Categories'));

const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='/:type/category/:category' element={<CategoriesPage />} />
        <Route path='/:type/:id' element={<ViewMorePage />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
