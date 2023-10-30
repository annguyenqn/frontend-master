import Navbar from 'components/Layout/Navbar/Navbar';
import StarFall from 'components/StarFall/StarFall';
import withUserLogin from 'hoc/withUserLogin';

const ComingSoonPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="flex items-center justify-center h-screen max-h-screen bg-gradient-to-b from-blue3 to-primary">
        <div>
          <p className="text-3xl font-bold text-center text-white animate-pulse"> This page will coming soon ...</p>
        </div>
      </div>
      <img src="/images/logo/logo.svg" alt="brand-nanoreal" className="fixed w-auto bottom-16 right-16 h-44" />
      <StarFall />
    </div>
  );
};

export default withUserLogin(ComingSoonPage);
