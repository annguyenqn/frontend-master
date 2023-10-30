import Container from 'components/Layout/Container/Container';
import Footer from 'components/Layout/Footer/Footer';
import Navbar from 'components/Layout/Navbar/Navbar';
import ProgressBar from 'components/ProgessBar/ProgressBar';
import PageLoading from 'components/Layout/PageLoading/PageLoading';
import StarFall from 'components/StarFall/StarFall';
import { useEffect, useState } from 'react';
import { FiCompass, FiCopy } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { formatAddress } from 'utils/addressHelpers';
import Gallery from './Components/Gallery';
import StatusProject from './Components/StatusProject';
import PageNotFound from 'components/Layout/PageNotFound/PageNotFound';
import TradingInvestor from './Components/TradingInvestor';
import ProgressBarPriceStep from 'components/ProgessBar/ProgressBarPriceStep';
import assetsApi from 'api/assetsApi';
import { getURLSearchParams } from 'utils';
import { ASSET_STATUS, PROJECT_INFO } from 'constants/config';
import { DUMMY_TOTAL_NEEDED_INVEST } from 'constants/DummyData';
import { formatInvest } from 'utils/formatBalance';
import withUserLogin from 'hoc/withUserLogin';
import { formatTimeForBadge } from 'utils/formatTime';
import Document from './Components/Document';

const DUMMY = '6794300';

const LandDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [videoList, setVideoList] = useState([]);

  const myProjectInfo = project?.projectInfo
    ? Object.keys(project?.projectInfo).map((key) => ({ label: PROJECT_INFO[key], value: project?.projectInfo[key] }))
    : [];
  const time = formatTimeForBadge(project);

  const getQueryVideoList = (videoList) => {
    const videoListArray = Array.isArray(videoList) ? [...videoList] : [videoList];
    const videoListQuery = videoListArray.map((item) => {
      const videoUrl = getURLSearchParams(item);
      return videoUrl.get('v');
    });
    setVideoList(videoListQuery);
  };

  useEffect(() => {
    (async () => {
      await setLoading(true);
      try {
        const res = await assetsApi.get({ id });
        await setProject(res);
        await getQueryVideoList(res?.videoUrls || res?.videoUrl);
      } catch (e) {
        console.error(e);
      } finally {
        await setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div>
      <Navbar />
      {project?.id && project?.status !== ASSET_STATUS.INACTIVE ? (
        <div className="min-h-screen break leading bg-black-2 pt-25">
          {/* section 1 */}
          <Container>
            <Gallery images={project?.images} />
          </Container>
          {/* section 2 */}
          <Container>
            <div className="relative flex flex-col mt-10 rounded-lg xl:flex-row bg-black-3 z-1">
              <div className="w-full px-12 py-6 xl:flex-auto">
                <h5 className="overflow-hidden text-4xl font-bold md:pr-20 xl:pr-0 md:whitespace-nowrap overflow-ellipsis">
                  {project?.name}
                </h5>
                <div className="flex items-center mb-3">
                  <FiCompass className="mr-1 text-2xl text-primary" />
                  <span className="mt-1 leading-3">
                    {`${project?.location?.street}, ${project?.location?.district?.name}, ${project?.location?.province?.name}`}
                  </span>
                </div>
                <div className="pb-2">
                  <StatusProject.Badge status={project.status} />
                </div>
                <p className="mb-2 text-2xl font-bold">
                  {project?.valuePerSlot?.toLocaleString('vi-VN') || (+DUMMY).toLocaleString('vi-VN')} VND / phần
                </p>
                {project?.status === ASSET_STATUS.SUCCESS && (
                  <p className="flex items-center text-sm-md">
                    <FiCopy className="mr-2 text-2xl" />
                    <span className="hidden md:inline-block">0x79b6930DEfb52d90EDF0c82880450e9808E841Dd</span>
                    <span className="inline-block md:hidden">
                      {formatAddress('0x79b6930DEfb52d90EDF0c82880450e9808E841Dd')}
                    </span>
                  </p>
                )}
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <span>{project?.investors} Nhà đầu tư</span>
                    <span className="">
                      {project?.investedSlot?.toLocaleString('vi-VN')}/{project?.totalSlot?.toLocaleString('vi-VN')}{' '}
                      Phần
                    </span>
                  </div>
                  <ProgressBar successRate={project?.totalInvested / (project?.value || +DUMMY_TOTAL_NEEDED_INVEST)} />

                  <div className="flex justify-between mt-1 text-sm-md">
                    <span className="">
                      {((project?.totalInvested / (project?.value || +DUMMY_TOTAL_NEEDED_INVEST)) * 100)
                        .toFixed(2)
                        ?.replace('.', ',')}{' '}
                      %
                    </span>

                    <span className="flex items-center justify-end flex-none">
                      {formatInvest(project?.totalInvested)}/
                      {formatInvest(project?.value) || formatInvest(+DUMMY_TOTAL_NEEDED_INVEST)}
                    </span>
                  </div>
                </div>
              </div>
              <StatusProject
                status={project?.status}
                time={time}
                whitelistEnabled={project?.whitelist?.enabled}
                isWhitelisted={project?.isWhitelisted}
                projectId={project?._id}
              />
            </div>
          </Container>
          {/* SECTION PRICE STEP */}
          <Container>
            <div className="relative px-12 py-6 mt-10 rounded-lg bg-black-3 z-1">
              <h4 className="mb-6 text-2xl font-bold">Mức giá theo bậc thang</h4>
              <ProgressBarPriceStep prices={project?.prices} />
            </div>
          </Container>
          {/* section 3 */}
          <Container>
            <div className="relative flex flex-col mt-10 xl:flex-row z-1">
              <div className="xl:pr-6 xl:w-8/12">
                <div className="flex flex-col h-full divide-y divide-black rounded-lg bg-black-3">
                  <div className="flex-none hidden px-12 py-6 text-2xl font-bold xl:block"> Thông tin đầu tư </div>
                  <div className="flex-none px-12 py-6 text-2xl font-bold xl:hidden"> Đơn vị phân phối </div>
                  {myProjectInfo.length > 0 ? (
                    <div className="flex flex-col flex-auto xl:flex-row">
                      <div className="py-6 border-b border-black xl:border-b-0 xl:border-r xl:w-1/2 pl-11">
                        <table className="w-full">
                          <tbody>
                            {myProjectInfo?.map(
                              (item, index) =>
                                index < 4 && (
                                  <tr key={`info-1-${index}`} className="table w-full table-fixed">
                                    <td className="text-sm">{item.label}</td>
                                    <td className="max-w-xs text-sm">{item.value}</td>
                                  </tr>
                                ),
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="py-6 xl:w-1/2 pl-11">
                        <table className="w-full">
                          <tbody>
                            {myProjectInfo?.map(
                              (item, index) =>
                                index >= 4 &&
                                index < 8 && (
                                  <tr key={`info-2-${index}`} className="table w-full table-fixed">
                                    <td className="text-sm">{item.label}</td>
                                    <td className="max-w-xs text-sm">{item.value}</td>
                                  </tr>
                                ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="px-12 py-6">Thông tin sẽ được cập nhật trong thời gian sớm nhất</div>
                  )}
                </div>
              </div>
              <div className="divide-y divide-black rounded-lg xl:w-4/12 bg-black-3">
                <div className="hidden px-12 py-6 text-2xl font-bold xl:block"> Đơn vị phân phối </div>
                <div className="px-12 pt-6">
                  <a
                    // href="https://www.nanoreal.io"
                    target={'_blank'}
                  >
                    <img
                      src="/images/logo/brand.png"
                      // src="/images/homepage/brand-1.png"
                      alt="distribution-unit"
                      className="mx-auto h-14"
                    />
                  </a>
                  <a
                    // href="https://www.nanoreal.io"
                    className="block mt-2 mb-4 text-center text-sm-md"
                    target={'_blank'}
                  >
                    www.nanoreal.io
                  </a>
                </div>
              </div>
            </div>
          </Container>
          {/* section 4 */}
          <Container>
            <div className="relative flex flex-col-reverse mt-10 md:flex-row z-1">
              {/* section Description & Doc & Media & Map */}
              <div className="mt-10 md:mt-0 md:pr-6 md:w-7/12 xl:w-8/12">
                {/* description */}
                <div className="divide-y divide-black rounded-lg bg-black-3">
                  <div className="px-12 py-6 text-2xl font-bold"> Mô tả tổng quan </div>
                  <div
                    className="px-12 py-6 list-none-tailwild"
                    dangerouslySetInnerHTML={{ __html: project?.description }}
                  />
                </div>
                {/* Document */}
                {project?.documents?.length > 0 && <Document data={project?.documents} />}
                {/* Video */}
                {videoList?.length > 0 && (
                  <div className="mt-10 divide-y divide-black rounded-lg bg-black-3">
                    <div className="px-12 py-6 text-2xl font-bold"> Video </div>
                    <div>
                      {videoList.map((item, index) => (
                        <div key={`land-detail-video-${index}`} className="px-4 py-6 sm:px-12">
                          <div className="flex items-center justify-center text-2xl font-bold bg-black rounded-lg h-100">
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${item}?`}
                              title="YouTube video player"
                              frameBorder="0"
                              className="rounded-lg"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Map */}
                {project?.mapUrl && (
                  <div className="mt-10 divide-y divide-black rounded-lg bg-black-3">
                    <div className="px-12 py-6 text-2xl font-bold"> Bản đồ </div>
                    <div className="px-4 py-6 sm:px-12">
                      <div className="">
                        <iframe
                          src={project?.mapUrl}
                          width="100%"
                          height="100%"
                          allowFullScreen=""
                          loading="lazy"
                          className="rounded-lg h-96"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Section Trading */}
              <TradingInvestor id={project?._id} totalSlot={project?.totalSlot} />
            </div>
          </Container>
          <StarFall />
        </div>
      ) : (
        <div>
          <PageNotFound />
          <StarFall />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default withUserLogin(LandDetail);
