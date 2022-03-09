import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from './Components/Spinner/Spinner';
import HomePage from './Pages/HomePage';
import Movie from './Pages/Movie';
import { NotFound } from './Pages/NotFound';

const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='movie/:id' element={<Movie />} />
        <Route path='tv/:id' element={<Movie />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
