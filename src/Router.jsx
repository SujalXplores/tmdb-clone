import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from './Components/Spinner/Spinner';
import HomePage from './Pages/HomePage';
import { NotFound } from './Pages/NotFound';

const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
