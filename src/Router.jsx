import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from './Components/Spinner/Spinner';
import HomePage from './Pages/HomePage/Home';
import ViewMore from './Pages/ViewMorePage/ViewMore';
import { NotFound } from './Pages/NotFoundPage/NotFound';

const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='movie/:id' element={<ViewMore />} />
        <Route path='tv/:id' element={<ViewMore />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
