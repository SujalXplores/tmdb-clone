import Header from './Components/Header/Header';
import MoviesContainer from './Components/MoviesContainer/MoviesContainer';

const App = () => {
  return (
    <>
      <Header />
      <MoviesContainer
        category='movie'
        mediaType='popular'
        title="What's Popular"
      />
      <MoviesContainer
        category='trending'
        mediaType='all'
        time='day'
        title='Trending Movies'
      />
    </>
  );
};

export default App;
