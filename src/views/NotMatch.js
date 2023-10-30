import Footer from 'components/Layout/Footer/Footer';
import Navbar from 'components/Layout/Navbar/Navbar';
import PageNotFound from 'components/Layout/PageNotFound/PageNotFound';
import StarFall from 'components/StarFall/StarFall';

const NotMatch = () => {
  return (
    <div>
      <Navbar />
      <div>
        <PageNotFound />
      </div>
      <StarFall />
      <Footer />
    </div>
  );
};

export default NotMatch;
