import HomeBanner from '../../Components/HomeBanner/HomeBanner';
import MoviesContainer from '../../Components/MoviesContainer/MoviesContainer';

const HomePage = () => {
  return (
    <>
      <HomeBanner />
      <MoviesContainer
        category='trending'
        mediaType='all'
        time='day'
        title='Trending'
        tabs={['Today', 'This Week']}
        isBackground
      />
      <MoviesContainer
        category='tv'
        mediaType='popular'
        title="What's Popular"
        tabs={['On TV', 'In Theaters']}
      />
    </>
  );
};

export default HomePage;
