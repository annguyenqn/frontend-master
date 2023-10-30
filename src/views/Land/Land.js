import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'components/Layout/Container/Container';
import Footer from 'components/Layout/Footer/Footer';
import Navbar from 'components/Layout/Navbar/Navbar';
import StarFall from 'components/StarFall/StarFall';
import PageLoading from 'components/Layout/PageLoading/PageLoading';
import FilterLand from './Components/FilterLand';
import assetsApi from 'api/assetsApi';
import { useDispatch } from 'react-redux';
import { setLands } from 'store/lands';
import { useGetLands } from 'store/lands/hook';
import { LIMIT_ROW_PER_PAGE } from 'config/config';
import withUserLogin from 'hoc/withUserLogin';
import LandList from './LandList';

const Land = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { lands } = useGetLands();
  const [isLoading, setLoading] = useState(true);
  const [favoriteLands, setFavoriteLands] = useState([]);
  const [query, setQuery] = useState(new URLSearchParams(history?.location?.search));

  useEffect(() => {
    history.listen((location) => {
      const queryURL = new URLSearchParams(location?.search);
      console.log(queryURL);
      setQuery(queryURL);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const params = {};
      Array.from(query.entries()).forEach((item) => {
        params[item[0]] = item[1];
      });
      console.log('params', params);
      try {
        await setLoading(true);
        const updateParams = { ...params, rowPerPage: LIMIT_ROW_PER_PAGE, page: 1 };
        const res = await assetsApi.get({ params: updateParams });
        await dispatch(setLands(res));
        const paramsFavorite = { ...params, favorite: true, rowPerPage: 2, page: 1 };
        const resFavorite = await assetsApi.get({ params: paramsFavorite });
        setFavoriteLands(resFavorite);
        await setLoading(false);
      } catch (e) {
        console.error(e);
        await setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className="break leading bg-black-2 pt-25">
        {/* Banner */}
        <Container className="relative pb-20 z-2">
          <div
            style={{
              backgroundImage: 'linear-gradient(-90deg, black, transparent 75%), url("/images/landpage/banner.jpg")',
            }}
            className="relative overflow-hidden banner z-1"
          >
            <div className="w-full pt-12 ml-auto font-bold text-center pb-72 md:pr-12 md:text-right md:pb-52">
              <p className="text-5xl leading-tight uppercase">
                Ra mắt
                <span className="block text-primary"> Dự án khu biệt thự</span>
                Vinhomes
              </p>
            </div>
            {/* Badge */}
            <div className="absolute pt-10 text-4xl font-black transform -rotate-45 top-2 px-14 -left-20 sm:-left-16 sm:-top-4 bg-primary">
              New
            </div>
          </div>
          {/* Filter */}
          <FilterLand />
        </Container>
        {isLoading ? <PageLoading /> : <LandList lands={lands} favoriteLands={favoriteLands} />}
        <StarFall />
      </div>
      <Footer />
    </div>
  );
};

export default withUserLogin(Land);
