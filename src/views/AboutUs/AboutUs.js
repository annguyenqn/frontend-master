import Container from 'components/Layout/Container/Container';
import Footer from 'components/Layout/Footer/Footer';
import Navbar from 'components/Layout/Navbar/Navbar';
import PageLoading from 'components/Layout/PageLoading/PageLoading';
import StarFall from 'components/StarFall/StarFall';
import { useEffect, useState } from 'react';

const AboutUs = () => {
  const [isLoading, setLoading] = useState(true);
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
      <div className="min-h-screen break leading pt-25">
        <Container>
          <h4 className="py-10 text-4xl font-bold leading-tight text-center sm:text-5xl text-primary">
            NANOREAL PLATFORM
          </h4>
          <div className="">
            <div className="relative px-6 py-10 space-y-6 sm:px-14 bg-black-3 z-1 rounded-xl">
              {/* paragragh 1 */}
              <div className="text-xl font-bold">
                <span className="mr-2 text-primary">MÔ HÌNH NANOREAL:</span>
                <span>“ĐẦU TƯ CHUNG BĐS”</span>
              </div>
              {/* paragragh 2 */}
              <div>
                <p className="text-xl">
                  <span className="mr-2 font-bold text-primary">NANOREAL Platform:</span>
                  <span>nền tảng công nghệ Blockchain ứng dụng trong lĩnh vực BĐS:</span>
                </p>
                <ol className="ml-8 space-y-2 list-disc">
                  <li>Đầu tư BĐS (Mua chung BĐS)</li>
                  <li>Giao dịch BĐS (Mua / Bán)</li>
                  <li>Quản lý và khai thác BĐS</li>
                </ol>
              </div>
              {/* paragragh 3 */}
              <div className="flex flex-col text-xl ">
                <p className="font-bold text-primary">Sứ mệnh:</p>
                <p className="ml-8 text-justify">
                  NANOREAL ra đời nhằm mục đích ứng dụng công nghệ Blockchain vào giao dịch BĐS giúp thị trường BĐS tăng
                  trưởng và phát triển bền vững, mạnh mẽ. Đặc biệt là giúp các chủ đầu tư, người bán BĐS tiếp cận với
                  thị trường vốn mới rất lớn từ các NĐT vửa và nhỏ ….{' '}
                </p>
              </div>
              {/* paragragh 4 */}
              <div>
                <p className="flex flex-col text-xl font-bold text-primary">Lợi ích của NANOREAL:</p>
                <ol className="ml-8 space-y-2 list-disc">
                  <li>
                    {
                      'Giúp người bán BĐS tiếp cận được hàng triệu Nhà đầu tư (người mua) cùng một lúc => BĐS dễ dàng bán hơn và bán được gía tốt hơn.'
                    }
                  </li>
                  <li>
                    Giúp chủ đầu tư các dự án BĐS tiếp cận được nguồn vốn đầu tư các nhà đầu tư nhỏ lẻ cực kỳ lớn để bán
                    BĐS.
                  </li>
                  <li>
                    Giúp hàng triệu NĐT/người dân có khoản tiền nho nhỏ muốn đầu tư BĐS và không thể thực hiện được nếu
                    không có NANOREAL.
                  </li>
                  <li>
                    Nanoreal là một giải pháp đột phá để thị trường BĐS đón nhận vốn từ các kênh đầu tư Crypto; Chứng
                    khoáng và cả các NĐT nước ngoài.
                  </li>
                </ol>
              </div>
              {/* paragragh 5 */}
              <div>
                <p className="flex flex-col text-xl font-bold text-primary">
                  {'NANOREAL làm gì để ứng dụng Blockchain => TTBĐS'}
                </p>
                <ol className="ml-8 space-y-2 list-disc">
                  <li>
                    Ứng dụng công nghệ Blockchain để số hoá BĐS thành tài sản số trên nền tảng Blockchain. Tạo ra Token
                    riêng cho BĐS để chia nhỏ giá trị BĐS thành nhiều phần để tiếp cận NĐT nhỏ lẻ trên thị trường.
                  </li>
                  <li>
                    Ứng dụng Blockchain để số hoá các khoản tiền đầu tư của NĐT thành token để tham gia “Đầu tư chung
                    BĐS” trên NANOREAL.
                  </li>
                  <li>
                    {
                      'Sử dụng Smart contract để quy định các điều khoản và điều kiện cho mỗi Pool đầu tư BĐS => minh bạch, tránh rủi ro cho tất cả các NĐT tham gia.'
                    }
                  </li>
                  <li>
                    NANOREAL áp dụng chức năng “REQUEST OWNERSHIP” trên Smart Contract để các NĐT nắm giữ 85% số lượng
                    Token BĐS có cơ hội sở hữu BĐS thực tế.
                  </li>
                </ol>
              </div>
              {/* paragragh 6 */}
              <div>
                <p className="flex flex-col text-xl font-bold text-primary">Pháp lý đối với mô hình NANOREAL:</p>
                <ol className="ml-8 space-y-2 list-disc">
                  <li>
                    TOKEN BĐS được tạo ra bằng cách “Số hoá phần giá trị” của một BĐS có thật được Bên bán chào bán trên
                    Nanoreal, mỗi BĐS có một loại TOKEN riêng và có số lượng, giá trị TOKEN BĐS được tạo ra tương đương
                    với gía trị BĐS tại thời điểm các NĐT góp vốn mua BĐS. TOKEN BĐS chỉ được tạo ra theo yêu cầu của
                    NĐT và trao cho NĐT khi một BĐS có đủ 100% NĐT góp tiền mua BĐS thành công. (Nanoreal Không phát
                    hành Token BĐS ra công chúng)
                  </li>
                  <li>
                    TOKEN BĐS chỉ tồn tại và có giá trị khi BĐS gốc vẫn được quản lý bởi Nanoreal, khi có NĐT thu gom
                    100% TOKEN BĐS thì BĐS đó sẽ được chuyển giao cho NĐT và 100% TOKEN BĐS đó sẽ được tiêu huỷ.
                  </li>
                  <li>
                    Vì các đặc điểm trên nên TOKEN BĐS trên nền tảng Nanoreal :
                    <ol className="ml-4 text-primary list-dash">
                      <li>KHÔNG PHÁT HÀNH RA CÔNG CHÚNG NHƯ VNDC, VNDT, BTC, ETH, USDT, … </li>
                      <li>KHÔNG PHẢI LÀ TIỀN ĐIỆN TỬ</li>
                      <li>KHÔNG ĐƯỢC DÙNG ĐỂ THANH TOÁN – MUA BÁN HÀNG HOÁ DỊCH VỤ.</li>
                    </ol>
                  </li>
                  <li>
                    TOKEN BĐS trên NANOREAL được tạo ra theo yêu cầu Nhóm NĐT nhằm mục đích:
                    <ol className="ml-4 list-dash">
                      <li>
                        Ứng dụng công nghệ Blockchain vào việc <b>SỐ HOÁ PHẦN GIÁ TRỊ BĐS</b> (Để đưa BĐS “thật” thành
                        tài sản số trên nền tảng Blckchain)
                      </li>
                      <li>
                        Ứng dụng <b>SMART CONTRACT</b> cho Hợp đồng góp vốn đầu tư chung BĐS để quy định các điều khoản
                        “mua chung” “Request Ownership” của các NĐT.
                      </li>
                    </ol>
                  </li>
                  <li>
                    TẤT CẢ CÁC BĐS TRÊN NỀN TẢNG NANOREAL ĐỀU PHẢI NIÊM YẾT, GIAO DỊCH MUA BÁN, THANH TOÁN BẰNG ĐỒNG
                    VIỆT NAM; ĐƯỢC THỰC HIỆN CÁC THỦ TỤC PHÁP LÝ VỀ GIAO DỊCH BĐS THEO ĐÚNG QUY ĐỊNH PHÁP LUẬT VIỆT NAM.
                  </li>
                </ol>
              </div>
              {/* -------- */}
            </div>
          </div>
        </Container>
      </div>
      <StarFall />
      <Footer />
    </div>
  );
};

export default AboutUs;
