import PropTypes from 'prop-types';
import Container from 'components/Layout/Container/Container';
import Representative from './Components/Representative';
import ProjectCard from './Components/ProjectCard';
import { useHistory } from 'react-router-dom';
import Pagination from 'components/Pagination/Pagination';

const LandList = ({ lands, favoriteLands }) => {
  const history = useHistory();
  return (
    <>
      {favoriteLands?.data?.length > 0 && (
        <Container>
          <div className="relative z-1 ">
            <h1 className="mt-12 mb-12 text-3xl font-bold text-center">Dự án tiêu biểu</h1>
            {favoriteLands?.data?.map(
              (item, index) =>
                item?.favorite && <Representative key={`representative-${index}`} className="mb-10" project={item} />,
            )}
          </div>
        </Container>
      )}
      {/* section 2 */}
      <Container>
        {lands?.data?.length > 0 ? (
          <div className="relative z-1 ">
            <h1 className="mt-12 mb-12 text-3xl font-bold text-center">Tất cả dự án</h1>
            <div className="flex flex-wrap -mb-8 sm:-mx-4 ">
              {lands?.data?.map((item, index) => (
                <ProjectCard
                  key={`land-project-card-${index}`}
                  className="w-full px-4 pb-8 transition-transform duration-500 transform cursor-pointer lg:w-1/3 hover:scale-105"
                  project={item}
                  thumbnailImage={item?.images?.[0]}
                  onClick={() => {
                    history.push(`/land/detail/${item.id}`);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="relative py-20 mt-20 text-3xl font-bold text-center rounded-xl z-1 bg-black-3">
            Chưa có dự án
          </div>
        )}
        {lands?.totalPage > 1 && (
          <div className="mt-8">
            <Pagination pageCount={lands?.totalPage} currentPage={lands?.currentPage} />
          </div>
        )}
      </Container>
    </>
  );
};

LandList.propTypes = {
  lands: PropTypes.array,
  favoriteLands: PropTypes.array,
};

LandList.defaultProps = {
  lands: [],
  favoriteLands: [],
};

export default LandList;
