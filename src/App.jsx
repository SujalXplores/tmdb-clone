import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import HomeBanner from './Components/HomeBanner/HomeBanner';
import MoviesContainer from './Components/MoviesContainer/MoviesContainer';

const App = () => {
  return (
    <>
      <Header />
      <HomeBanner />
      <MoviesContainer
        category='tv'
        mediaType='popular'
        title="What's Popular"
        tabs={['On TV', 'In Theaters']}
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
