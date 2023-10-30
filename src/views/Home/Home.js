import { useEffect, useState } from 'react';
import ButtonRound from 'components/Button/ButtonRound';
import Container from 'components/Layout/Container/Container';
import Navbar from 'components/Layout/Navbar/Navbar';
import Footer from 'components/Layout/Footer/Footer';
import StarFall from 'components/StarFall/StarFall';
import { Link } from 'react-router-dom';
import PageLoading from 'components/Layout/PageLoading/PageLoading';
import { useHistory } from 'react-router-dom';
import withUserLogin from 'hoc/withUserLogin';

const BENEFIT = [
  {
    title: 'Đầu tư nhỏ',
    image: '/images/homepage/benefit-1.png',
    des: 'Bắt đầu tham gia đầu tư vào thị trường bất động sản với chỉ từ vài triệu Việt Nam Đồng',
    className: '',
    imgClassName: 'mx-auto h-auto w-auto',
    desClassName: 'max-w-56',
  },
  {
    title: 'Thanh khoản cao',
    image: '/images/homepage/benefit-2.png',
    des: '“Bất động sản Nano” sẽ được mua bán với sàn giao dịch hoặc P2P',
    className: '',
    imgClassName: 'mx-auto h-auto w-auto',
    desClassName: 'max-w-72',
  },
  {
    title: 'Lợi nhuận kép',
    image: '/images/homepage/benefit-3.png',
    des: 'Kiếm lợi nhuận từ phần đầu tư của bạn khi Bất động sản tăng giá hoặc từ lợi nhuận Khai thác và kinh doanh Bất động sản.',
    className: '',
    imgClassName: 'mx-auto h-auto w-auto',
    desClassName: 'max-w-66',
  },
];

const CATEGORY = [
  {
    title: 'Blockchain Bất động sản',
    image: '/images/homepage/category-1.png',
    des: 'Bất động sản sẽ được công nghệ Nanoreal phân mảnh giá trị thành Token Bất động sản. Các Token này được đảm bảo giá trị bởi Bất động sản thật tương ứng.',
    className: '',
  },
  {
    title: 'Giao dịch nhanh chóng',
    image: '/images/homepage/category-2.png',
    des: 'Không giống như việc mua bán bất động sản thực, việc giao dịch mua bán các token bất động sản được diễn ra nhanh chóng và gần như ngay lập tức với chi phí thấp trên nền tảng Blockchain.',
    className: '',
  },
  {
    title: 'Thu tiền thuê',
    image: '/images/homepage/category-3.png',
    des: 'Lợi nhuận ròng cho thuê được chia cho những người sở hữu token và sẽ được chốt quyền theo từng khoảng thời gian.',
    className: '',
  },
  {
    title: 'Tăng giá trị đầu tư',
    image: '/images/homepage/category-4.png',
    des: 'Giá trị của mỗi token được đảm bảo giá trị từ chính bất động sản thực tương ứng của nó, khi bất động sản tăng giá token cũng tăng giá theo.',
    className: '',
  },
];

const PROCESS = [
  {
    className: 'mb-10',
    title: `Blockchain\nbất động sản`,
    titleClassName: 'whitespace-pre',
    image: '/images/homepage/process-1.png',
    imgClassName: 'mx-auto xl:ml-auto',
    des: 'Nanoreal phân mảnh giá trị của Bất động sản, quy đổi thành số lượng Token tương ứng để Nhà đầu tư có thể mua và tạo ra Token trên nền tảng công nghệ blockchain.',
    desClassName: 'leading-loose xl:mb-40', // mb to get height image
  },
  {
    className: 'mb-25',
    title: 'GIAO DỊCH\nMUA BÁN token\ntrên sàn',
    titleClassName: 'whitespace-pre',
    image: '/images/homepage/process-2.png',
    imgClassName: 'mx-auto xl:mx-0',
    des: 'Nhà đầu tư có thể mua bán token bất động sản trên các sàn giao dịch chấp nhận token của Nanoreal',
    desClassName: 'xl:max-w-xs ml-auto leading-loose xl:mb-10',
  },
  {
    className: '',
    title: 'SỞ HỮU HỢP PHÁP\nBẤT ĐỘNG SẢN',
    titleClassName: 'whitespace-pre',
    image: '/images/homepage/process-3.png',
    imgClassName: 'xl:pb-20 mx-auto xl:mx-0',
    des: (
      <>
        Khi Nhà đầu tư nắm giữ từ 85% tổng lượng Token của một Bất động sản, Nhà đầu tư có quyền kích hoạt quy trình
        “Request ownership” (yêu cầu sở hữu Bất động sản) theo điều kiện quy định tại www.nanoreal.io/request-ownership.
        <br />
        <br />
        Nanoreal sẽ thực hiện tất cả các thủ tục để sang tên chủ sở hữu hợp pháp cho Nhà đầu tư sau khi đã đáp ứng các
        điều kiện “Request ownership”.
      </>
    ),
    desClassName: 'leading-loose',
  },
];

const EXISTS = [
  { image: '/images/homepage/brand-1.png' },
  { image: '/images/homepage/brand-2.png' },
  { image: '/images/homepage/brand-1.png' },
];

const MEDIA = [
  {
    id: 'cafe-f',
    image: '/images/logo/cafeF.png',
    link: 'https://cafef.vn/nanoreal-phuong-an-minh-bach-phap-ly-trong-mua-ban-bat-dong-san-chung-20220209174513429.chn',
    className: 'mx-auto h-7 my-6',
  },
  {
    id: 'cafe-land',
    image: '/images/logo/cafe-land.png',
    link: 'https://cafeland.vn/tin-tuc/nanoreal-co-hoi-moi-cho-khach-hang-von-nho-trong-giao-dich-bat-dong-san-106556.html',
    className: 'mx-auto h-20',
  },
  {
    id: '24h',
    image: '/images/logo/24h.png',
    link: 'https://www.24h.com.vn/bat-dong-san/nanoreal-co-hoi-lon-cho-nha-dau-tu-nho-c792a1329025.html',
    className: 'mx-auto h-20',
  },
];

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const urlParams = new URLSearchParams(history?.location.search);

  if (urlParams?.get('vnp_TransactionStatus') || urlParams?.get('partnerCode')) {
    history.push({
      pathname: `/call-investment/payment-result`,
      search: history?.location.search,
    });
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen break leading bg-black-2 pt-25">
        {/* section 1 */}
        <Container
          style={{
            backgroundImage: `url(/images/homepage/section-1.png)`,
            backgroundPosition: 'right bottom',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="relative pt-20 pb-64 text-center z-1 xl:pt-36 md:pb-142 md:text-left">
            <h1 className="text-5xl leading-tight font-black-3 text-primary md:text-7xl">NANOREAL</h1>
            <p className="text-2xl">Giải pháp công nghệ Phân mảnh & Chia nhỏ</p>
            <h5 className="text-3xl font-black-3">Giá trị Bất động sản trên nền tảng Blockchain</h5>
            <Link to="/land">
              <ButtonRound className="px-8 mx-auto mt-10 text-2xl transition-all border md:mx-0 border-primary text-primary hover:text-white hover:bg-primary">
                Xem Bất động sản
              </ButtonRound>
            </Link>
          </div>
        </Container>
        {/* section 2 */}
        <Container className="relative pb-20 z-1">
          <div className="flex flex-col items-center space-y-20 xl:flex-row xl:space-y-0">
            <div className="flex items-center justify-center flex-none w-1/3">
              <img src="/images/homepage/section-2.png" alt="nanoreal-logo" className="h-auto w-80" />
            </div>
            <div className="flex-col items-center justify-center flex-auto text-center xl:pl-36 xl:text-left">
              <h3 className="text-4xl font-bold mb-14">NANOREAL là gì ? </h3>
              <p className="text-xl">
                Nanoreal là nền tảng phân mảnh và chia nhỏ giá trị Bất động sản trên nền tảng blockchain, giúp Nhà đầu
                tư ít vốn dễ dàng tiếp cận và tham gia đầu tư vào thị trường Bất động sản thông qua việc đầu tư vào các
                phần giá trị Bất động sản đã được phân mảnh rất nhỏ “Bất động sản Nano”.
              </p>
            </div>
          </div>
          <div>
            <h3 className="pb-20 text-4xl font-bold text-center py-25">Lợi ích Nanoreal mang lại cho nhà đầu tư</h3>
          </div>
          <div className="flex flex-col items-center justify-between space-y-20 text-center lg:space-y-0 lg:flex-row">
            {BENEFIT.map((item, index) => (
              <div key={`benefit-${index}`} className={`${item?.className}`}>
                <img src={item?.image} alt={item?.title} className={item?.imgClassName} />
                <h5 className="my-8 text-2xl font-bold text-primary">{item?.title}</h5>
                <p className={item?.desClassName}>{item?.des}</p>
              </div>
            ))}
          </div>
        </Container>
        {/* section 3 */}
        <div className="relative overflow-hidden z-1 py-25">
          <Container>
            {/* background primary */}
            <div className="absolute top-0 left-0 w-screen z-1 h-full-1 my-1px bg-black-3 xl:bg-primary" />
            {/* background black 3 */}
            <div className="absolute z-2 transform -rotate-45 -translate-x-1/2 -translate-y-1/2 h-160% w-2-screen top-1/2 left-1/2 bg-black-3" />
            {/* content */}
            <div className="relative z-3">
              <h3 className="max-w-2xl mx-auto text-4xl font-bold leading-tight text-center mb-9">
                GIÁ TRỊ CỐT LÕI MÔ HÌNH NANOREAL
              </h3>

              <div className="flex flex-col mt-10 xl:flex-row xl:flex-wrap">
                {CATEGORY.map((item, index) => (
                  <div key={`category-${index}`} className={`flex-none xl:w-1/2 p-6 flex ${item?.className}`}>
                    <div className={`flex justify-center items-center w-3/12`}>
                      <img src={item?.image} alt={item?.title} className="w-auto h-auto" />
                    </div>
                    <div className="flex-none w-9/12 pl-12">
                      <h5 className="mb-6 text-2xl font-bold text-primary">{item?.title}</h5>
                      <p>{item?.des}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
        {/* section 4 */}
        <Container className="relative z-1 py-25">
          <h3 className="max-w-2xl mx-auto mb-24 text-4xl font-bold leading-tight text-center">
            Quy trình hoạt động trên Nanoreal
          </h3>
          {PROCESS.map((item, index) => {
            const isReverse = index % 2 !== 0;
            return (
              <div
                key={`process-${index}`}
                className={`flex flex-col ${item?.className} ${isReverse ? 'xl:flex-row-reverse' : 'xl:flex-row'}`}
              >
                <div className={`flex xl:w-7/12 ${isReverse ? 'justify-end' : ''}`}>
                  <img src={item?.image} alt={item?.title} className={`w-auto h-auto ${item?.imgClassName}`} />
                </div>
                <div
                  className={`xl:w-5/12 text-lg text-center  ${isReverse ? 'xl:text-right ' : 'xl:text-left xl:pl-16'}`}
                >
                  <h5
                    className={`text-4xl md:text-5xl font-bold leading-snug uppercase text-primary ${item?.titleClassName}`}
                  >
                    {item?.title}
                  </h5>
                  <img
                    src="/images/homepage/logo-line.png"
                    alt="line"
                    className={`my-12 ml-auto mx-auto ${isReverse ? 'xl:ml-auto xl:mr-0' : 'xl:mr-auto xl:ml-0'}`}
                  />
                  <p className={item?.desClassName}>{item?.des}</p>
                </div>
              </div>
            );
          })}
        </Container>
        {/* section 5 */}
        <div className="relative overflow-hidden z-1 py-25">
          <Container>
            {/* background primary */}
            <div className="absolute top-0 left-0 w-screen z-1 h-full-1 my-1px bg-black-3 xl:bg-primary" />
            {/* background black 3 */}
            <div className="absolute z-2 transform -rotate-45 -translate-x-1/2 -translate-y-1/2 h-160% w-2-screen top-1/2 left-1/2 bg-black-3" />
            {/* content */}
            <div className="relative z-3">
              <h3 className="max-w-2xl mx-auto text-4xl font-bold leading-tight text-center mb-25">
                Đối tác của Nanoreal
              </h3>
              <div className="flex flex-col items-center justify-center mt-10 space-y-25 lg:flex-row lg:space-y-0 lg:space-x-25">
                {EXISTS.map((item, index) => (
                  <div key={`category-${index}`} className={item?.className}>
                    <img src={item?.image} alt={'brand'} className="w-auto h-auto" />
                  </div>
                ))}
              </div>
              <h3 className="max-w-2xl mx-auto text-4xl font-bold leading-tight text-center my-25">
                Truyền thông nói về Nanoreal
              </h3>
              <div className="flex flex-col justify-center px-4 mt-10 space-y-25 lg:flex-row lg:space-y-0 lg:space-x-25">
                {MEDIA.map((item) => (
                  <a
                    href={item.link}
                    key={`media-${item.id}`}
                    className={'flex-none bg-white p-2 rounded-lg flex items-center'}
                    target="_blank"
                  >
                    <img
                      src={item?.image}
                      alt={`media-brand-${item.id}`}
                      className={`object-cover ${item?.className}`}
                    />
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </div>
        <StarFall />
      </div>
      <Footer />
    </div>
  );
};

export default withUserLogin(Home);
