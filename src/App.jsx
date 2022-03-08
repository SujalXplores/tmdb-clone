import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import MoviesContainer from './Components/MoviesContainer/MoviesContainer';

const App = () => {
  return (
    <>
      <Header />
      <MoviesContainer
        category='tv'
        mediaType='popular'
        title="What's Popular"
        tabs={['Streaming', 'On TV', 'For Rent', 'In Theaters']}
      />
      <MoviesContainer
        category='trending'
        mediaType='all'
        time='day'
        title='Trending'
        tabs={['Today', 'This Week']}
        isBackground
      />
      <Footer />
    </>
  );
};

export default App;
