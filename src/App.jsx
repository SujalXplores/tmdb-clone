import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Router from './Router';

const App = () => {
  return (
    <>
      <Header />
      <main className='main__container'>
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default App;
