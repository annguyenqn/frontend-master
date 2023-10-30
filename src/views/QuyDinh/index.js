import Container from 'components/Layout/Container/Container';
import Footer from 'components/Layout/Footer/Footer';
import Navbar from 'components/Layout/Navbar/Navbar';
import PageLoading from 'components/Layout/PageLoading/PageLoading';
import StarFall from 'components/StarFall/StarFall';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const RULE_LIST_PART_1 = [
  {
    title: 'Điều kiện sử dụng Dịch vụ',
    content: [
      'Điều khoản này đặt ra các điều kiện giám sát hoạt động của Người dùng trên nền tảng Nanoreal. Bằng việc truy cập hoặc sử dụng bất kỳ phần nào  Dịch vụ của Nanoreal, Người dùng chấp nhận ràng buộc bởi các Điều khoản này (bằng chính cá nhân hoặc của doanh nghiệp mà Người dùng đại diện). Người dùng tuyên bố và đảm bảo rằng Người dùng có quyền, thẩm quyền và đầy đủ năng lực để tham gia các Điều khoản này (bằng cách của chính cá nhân hoặc quyền lợi của doanh nghiệp mà Người dùng đại diện). Người dùng không thể truy cập hoặc sử dụng Nền tảng của chúng tôi hoặc chấp nhận các điều khoản dưới đây nếu chưa đủ 18 tuổi. Nếu Người dùng không đồng ý với tất cả các điều kiện của Điều khoản này, vui lòng ngừng truy cập vào Nền tảng Nanoreal và cách duy nhất của Người dùng là không truy cập hoặc sử dụng Dịch vụ của chúng tôi.',
      'Phần Dịch vụ của chúng tôi (và một số trang nhất định của Nền tảng Nanoreal) liên quan đến việc mở ra các cơ hội đầu tư thực tế hoặc đầu tư vào bất động sản chỉ được cung cấp cho một số Người dùng đủ điều kiện, đã đăng ký hoặc Người dùng được ủy quyền. Do đó, một số Dịch vụ của chúng tôi và một số phần của Nền tảng Nanoreal có thể không khả dụng ở tất cả các khu vực pháp lý hoặc cho tất cả Người dùng.',
    ],
  },
  {
    title: 'Token BĐS trên Nền tảng Nanoreal',
    content: [
      'Người dùng đồng ý và hiểu rằng các Token BĐS trên Nền tảng Nanoreal hay liên quan đến Token BĐS đều có các điều khoản, quy tắc và rủi ro riêng. Người dùng có trách nhiệm xem xét cẩn thận tất cả các điều khoản, quy tắc, các yếu tố rủi ro, các tài liệu liên quan do Nanoreal cung cấp và từ đó đưa ra quyết định của riêng Người dùng nếu như đồng ý với các quy định đó.',
      'Các mã thông báo chỉ nên được sử dụng bởi những Người dùng có đủ khả năng chịu trách nhiệm cho khoản đầu tư cá nhân của bản thân. Người dùng đồng ý và hiểu rằng đầu tư ở vị trí cá nhân đòi hỏi chấp nhận rủi ro cao, quan ngại về tính thanh khoản và tuân theo các yêu cầu về thời gian nắm giữ. ',
    ],
  },
  {
    title: 'Không tư vấn tài chính và khuyến nghị đầu tư',
    content: [
      'Nanoreal và các nền tảng liên quan không phải là nhà môi giới, cố vấn đầu tư và không tiến hành bất kỳ hoạt động nào như vậy. Không có thông tin nào trên Nền tảng Nanoreal tạo thành khuyến nghị để Người dùng mua hoặc bán bất kỳ Bất động sản, Token BĐS hoặc tài sản nào khác. Thông tin có sẵn trên Nền tảng Nanoreal không liên quan đến bất kỳ yêu cầu đầu tư hoặc tình hình tài chính cụ thể nào của Người dùng. Nanoreal không cung cấp lời khuyên tài chính hoặc khuyến nghị đầu tư. Chúng tôi khuyên Người dùng nên tham khảo ý kiến của các chuyên gia có năng lực trước khi thực hiện các khoản đầu tư thực tế hoặc các quyết định tài chính. Bất kỳ thông tin nào có sẵn trên Nền tảng Nanoreal đều không được cung cấp dưới dạng lời khuyên tài chính và không phải là cơ sở cho các hoạt động tài chính thực tế. Chúng tôi không chịu trách nhiệm về bất kỳ sự phụ thuộc nào vào thông tin có sẵn trên Nền tảng Nanoreal của Bên bán, Người dùng hoặc bất kỳ ai mà Người dùng có thể tham khảo về nội dung của nó.',
    ],
  },
  {
    title: 'Quyền sở hữu trí tuệ',
    content: [
      'Người dùng chỉ có thể tải xuống hoặc sao chép nội dung trong phạm vi được cho phép rõ ràng bằng văn bản trên Nền tảng Nanoreal. Không có quyền hoặc quyền lợi nào trong bất kỳ tài liệu hoặc phần mềm nào được chuyển giao cho Người dùng bởi bất kỳ việc tải xuống hoặc sao chép nào như vậy. Người dùng không được phép tái sản xuất, xuất bản, truyền, phân phối, hiển thị, sửa đổi, tạo các tác phẩm phái sinh, bán hoặc tham gia vào bất kỳ hoạt động bán hoặc khai thác nào theo bất kỳ cách nào, toàn bộ hoặc một phần bất kỳ nội dung nào trên Nền tảng Nanoreal hoặc bất kỳ phần mềm, dịch vụ nào có liên quan.',
      '“Nanoreal” là tên thương mại của nền tảng Nanoreal.io Chúng tôi có nhãn hiệu trong “Nanoreal”, các điều khoản bao gồm cụm từ “Nanoreal” và một số điều khoản khác. Không có gì trên Nền tảng Nanoreal được hiểu là cấp giấy phép hoặc cấp quyền sử dụng hình ảnh, nhãn hiệu, trang phục thương mại, biểu tượng hoặc nhãn hiệu dịch vụ cho Người dùng. Bất cứ thông tin nào Người dùng cung cấp đến Nanoreal đồng nghĩa người dùng đồng ý cho phép Nanoreal  sử dụng các thông tin này cho bất kỳ mục đích hợp pháp nào như đã nêu trong Điều khoản này. Nanoreal bảo lưu mọi quyền đối với quyền sở hữu bản quyền, quyền tác giả và nhãn hiệu của tất cả các tài liệu trên Nền tảng Nanoreal và sẽ thực thi các quyền đó đầy đủ theo quy định của pháp luật.',
      'Trừ khi có ghi chú khác, tất cả nội dung bao gồm bản quyền, thương hiệu, tên thương mại và / hoặc tài sản trí tuệ khác do Nanoreal hoặc các bên thứ ba sở hữu, kiểm soát hoặc bởi các bên thứ ba đã cấp phép cho Nanoreal đều sẽ được bảo vệ bởi luật Sở hữu trí tuệ của Việt Nam. Việc biên soạn tất cả nội dung trên Nền tảng Nanoreal là tài sản độc quyền của Nanoreal và cũng được bảo vệ bởi luật pháp nước Việt Nam.',
      'Nền tảng Nanoreal, bao gồm tất cả Thông tin thuộc sở hữu hoặc được cấp phép cho Nanoreal được bảo vệ bởi các quyền sở hữu trí tuệ khác nhau, bao gồm nhưng không giới hạn ở bản quyền, bí mật kinh doanh, nhãn hiệu, nhãn hiệu dịch vụ, tên thương mại và các quyền sở hữu khác cho dù theo hợp đồng, quy chế hoặc bất kỳ điều khoản nào tương tự (“Quyền SHTT”). Tất cả các Quyền SHTT đang và sẽ vẫn là tài sản độc quyền của Nanoreal. Khi sử dụng Nền tảng Nanoreal, Người dùng sẽ không có được bất kỳ quyền, quyền sở hữu hoặc lợi ích nào khác đối với bất kỳ thông tin nào trên Nền tảng Nanoreal hoặc các Quyền SHTT khác liên quan. Theo những điều trên, Người dùng cá nhân có quyền xem Thông tin trên Nền tảng Nanoreal và sao chép, in những thông tin đó để sử dụng cho mục đích cá nhân. Người dùng cá nhân không được phép bán, phân phối hoặc xử lý Thông tin trên Nền tảng Nanoreal hoặc bất kỳ sai lệch nào của thông tin đó hoặc sử dụng Thông tin trên Nền tảng Nanoreal mang tính chất thương mại mà không có sự đồng ý trước bằng văn bản của Nanoreal.',
    ],
  },
  {
    title: 'Lợi nhuận kỳ vọng trong tương lai',
    content: [
      <>
        <span>
          Nền tảng Nanoreal sẽ có thể có những thông tin, nội dung hay tuyên bố thể hiện như một lời hứa hoặc đại diện
          cho kết quả hoạt động trong quá khứ hoặc tương lai. Trong một số trường hợp, Người dùng có thể thấy các tuyên
          bố hướng tới tương lai bằng các thuật ngữ như “có thể,” “sẽ”, “nên”, “mong đợi”/“kế hoạch”, “dự đoán”, “tin
          tưởng”, “nhắm mục tiêu”, “dự kiến”, “Được bảo lãnh”,“ước tính”,“dự đoán”,“tiềm năng” hoặc “tiếp tục” hoặc phủ
          định của các thuật ngữ này hoặc thuật ngữ có thể tương tự khác. Những tuyên bố hướng tới tương lai này bao
          gồm, nhưng không giới hạn ở những tuyên bố liên quan đến công ty, tài sản, các yếu tố rủi ro, kế hoạch và dự
          báo.
        </span>
        <b className="px-1 text-primary">
          Nanoreal khẳng định rằng các tuyên bố hướng tới tương lai này có nhiều rủi ro và không chắc chắn.
        </b>
        <span>
          Do đó, có hoặc sẽ có các yếu tố quan trọng có thể gây ra các kết quả hoặc kết quả thực tế khác biệt với những
          gì được chỉ ra trong các tuyên bố này.
        </span>
      </>,
      <>
        <span>
          Nanoreal không có nghĩa vụ cập nhật hoặc xem xét bất kỳ tuyên bố hướng tới tương lai nào, cho dù là kết quả
          của thông tin mới, phát triển trong tương lai hay bằng cách nào khác.
        </span>
        <b className="px-1 text-primary">
          Không ai trong số Nanoreal, tổ chức phát hành cũng như bất kỳ cá nhân hoặc tổ chức nào khác chịu trách nhiệm
          về tính chính xác và đầy đủ của các tuyên bố hướng tới tương lai.
        </b>
        <span>
          Các nhà đầu tư nên tiến hành thẩm định dựa trên kinh nghiệm của riêng mình (hoặc tham khảo ý kiến chuyên gia)
          và không dựa vào các tuyên bố hướng tới tương lai, các giả định hoặc ước tính tài chính được hiển thị trên Nền
          tảng Nanoreal. Các khoản đầu tư hiển thị trên Nền tảng Nanoreal không phải là tiền gửi ngân hàng, không được
          bảo hiểm, bảo đảm bởi bất kỳ tổ chức, cơ quan chính phủ nào khác, không được đảm bảo bởi Nanoreal và có thể
          mất giá trị. Các cơ hội đầu tư được đăng trên Nền tảng Nanoreal này là các khoản đầu tư có rủi ro của các Bất
          động sản được giao dịch công khai, phải tuân theo các yêu cầu về thời gian nắm giữ và chỉ dành cho các nhà đầu
          tư không cần đầu tư thanh khoản.
        </span>
      </>,
    ],
  },
  {
    title: 'Nội dung của bên thứ ba và các website được liên kết',
    content: [
      'Tài liệu tham khảo trên Nền tảng Nanoreal cho bất kỳ tên, nhãn hiệu, sản phẩm hoặc dịch vụ của bên thứ ba, hoặc liên kết siêu văn bản đến các trang web bên thứ ba hoặc các thông tin hoặc nội dung được cung cấp bởi bên thứ ba chỉ nhằm cung cấp sự tiện lợi cho Người dùng và dưới mọi hình thức không cấu thành hoặc hàm ý cho sự chứng thực, tài trợ hoặc giới thiệu của chúng tôi về bên thứ ba, thông tin, tài liệu hoặc dịch vụ của bên thứ ba. Chúng tôi không chịu trách nhiệm về các thông lệ hoặc chính sách của các bên thứ ba đó cũng như Nội dung của bất kỳ trang web nào của bên thứ ba đồng thời không đưa ra bất kỳ tuyên bố nào liên quan đến tài liệu hoặc dịch vụ của bên thứ ba, hoặc Nội dung hoặc tính chính xác của bất kỳ tài liệu nào trên các trang web của bên thứ ba đó. Nếu Người dùng quyết định liên kết đến bất kỳ trang web của bên thứ ba nào như vậy, Người dùng cần biết rằng bản thân phải hoàn toàn tự chịu rủi ro.',
    ],
  },
  {
    title: 'Đăng ký tài khoản',
    content: [
      'Để sử dụng một số tính năng nhất định của Nền tảng Nanoreal, Người dùng phải đăng ký tài khoản (“Tài khoản”) và cung cấp một số thông tin nhất định về bản thân được nêu trong biểu mẫu đăng ký tài khoản. Người dùng tuyên bố và đảm bảo rằng:',
      '\t(i) Tất cả thông tin đăng ký bắt buộc mà Người dùng cung cấp cho Nanoreal là đầy đủ, trung thực và chính xác.',
      '\t(ii) Người dùng sẽ duy trì tính chính xác của thông tin đó.',
      '\t(iii) Người dùng có thể xóa Tài khoản của mình bất kỳ lúc nào, vì bất kỳ lý do gì, bằng cách làm theo các hướng dẫn của Nanoreal. Chúng tôi có thể đình chỉ hoặc chấm dứt Tài khoản của Người dùng theo Mục 15.',
      'Người dùng có trách nhiệm duy trì tính bảo mật của thông tin đăng nhập Tài khoản của mình và hoàn toàn chịu trách nhiệm cho tất cả các hoạt động xảy ra trong Tài khoản.',
      'Người dùng đồng ý thông báo ngay cho Nanoreal về bất kỳ hành vi sử dụng trái phép hoặc nghi ngờ sử dụng trái phép đối với Tài khoản của mình hoặc bất kỳ hành vi vi phạm bảo mật nào khác. Chúng tôi không thể và sẽ không chịu trách nhiệm đối với bất kỳ tổn thất hoặc thiệt hại nào phát sinh do Người dùng không tuân thủ các yêu cầu trên.',
      'Người dùng đồng ý rằng Tài khoản của mình sẽ được tự điều hành và Người dùng hoàn toàn chịu trách nhiệm về tất cả các giao dịch mua, bán, quyết định đầu tư và hướng dẫn được đặt trong Tài khoản. Mặc dù Nanoreal có thể cung cấp dữ liệu, thông tin hoặc nội dung do các bên khác cung cấp liên quan đến chiến lược đầu tư và / hoặc cơ hội mua và / hoặc bán bất động sản, Người dùng không nên xem bất kỳ nội dung nào như là một lời khuyên về thuế, pháp lý, tài chính hoặc đầu tư. Người dùng tuyên bố và tự chịu rủi ro cho bất kỳ quyết định đầu tư nào chỉ dựa trên quan điểm của Người dùng hoặc của một bên thứ ba (tức là cố vấn tài chính cá nhân của Người dùng). Chúng tôi khuyến nghị người dùng lưu ý: tất cả các khoản đầu tư đều có mức độ rủi ro nhất định.',
      'Người dùng thừa nhận và đồng ý hoàn toàn chịu trách nhiệm về việc xác định tính phù hợp của một khoản đầu tư và chấp nhận những rủi ro liên quan đến các quyết định như vậy, có thể bao gồm rủi ro mất hoàn toàn tiền gốc của Người dùng.',
      'Nanoreal không có mối quan hệ đặc biệt hoặc nghĩa vụ ủy thác đối với Người dùng. Người dùng đồng ý và thừa nhận hoàn toàn chịu trách nhiệm trong việc thực hiện đánh giá pháp lý, tài chính hoặc thẩm định về các Bất động sản, công ty được liệt kê trên Nền tảng Nanoreal. Người dùng nên tham khảo ý kiến của chuyên gia pháp lý và cố vấn đầu tư được cấp phép về bất kỳ lời khuyên nào về pháp lý, thuế, bảo hiểm hoặc đầu tư. Nanoreal sẽ chỉ cung cấp cho Người dùng ứng dụng để đầu tư mà không cung cấp bất kỳ lời khuyên nào từ Nanoreal.',
      'Bằng cách tạo Tài khoản, Người dùng tuyên bố và đảm bảo rằng tất cả Dữ liệu đăng ký cho Tài khoản mà Người dùng gửi là trung thực và chính xác. Người dùng đồng ý không sử dụng Tài khoản của người dùng khác. Người dùng hoàn toàn chịu trách nhiệm về bất kỳ và tất cả việc sử dụng Tài khoản của mình. Người dùng đồng ý rằng việc chia sẻ Dịch vụ với người khác hoặc cung cấp cho người khác quyền truy cập vào Dịch vụ thông qua Tài khoản của Người dùng là vi phạm các Điều khoản của Nền tảng Nanoreal này và có thể cấu thành hành vi gian lận hoặc trộm cắp, mà chúng tôi bảo lưu mọi quyền và biện pháp khắc phục. Người dùng đồng ý không cho phép bất kỳ cá nhân hoặc tổ chức nào khác ngoài các đại lý được ủy quyền của Người dùng (nếu có) sử dụng Nền tảng Nanoreal hoặc Dịch vụ thông qua Tài khoản của Người dùng.',
      'Theo quy định, Người dùng không có nghĩa vụ phải cung cấp cho chúng tôi bất kỳ thông tin nhận dạng cá nhân nào. Tuy nhiên, nếu Người dùng không cung cấp Dữ liệu đăng ký hoặc bất kỳ thông tin nhận dạng cá nhân nào được yêu cầu khác, Người dùng sẽ không thể sử dụng một số tính năng nhất định của Nền tảng Nanoreal hoặc Dịch vụ. Nanoreal sẽ sử dụng thông tin nhận dạng cá nhân của Người dùng như được quy định trong Chính sách quyền riêng tư của Nanoreal. Người dùng tuyên bố và đảm bảo rằng đã xem xét Chính sách Bảo mật và đồng ý với các điều khoản của Chính sách.',
      'Trước khi tham gia đầu tư BĐS thông qua Dịch vụ trên Nanoreal, Người dùng sẽ được nhắc cung cấp thông tin liên quan đến Ví điện tử / tài sản kỹ thuật số (Wallet) của mình. Nếu Người dùng không có Ví, Người dùng sẽ cần mua Ví lưu trữ hoặc thiết lập tài khoản với nhà cung cấp ví tiền điện tử do Người dùng chọn (Nhà cung cấp ví). Việc Người dùng sử dụng Ví sẽ phải tuân theo thỏa thuận điều khoản sử dụng giữa Người dùng và Nhà cung cấp Ví đó.',
    ],
  },
  {
    title: 'Năng lực pháp lý Người dùng',
    content: [
      'Bằng cách sử dụng dịch vụ, Người dùng tuyên bố rằng có thể ký kết hợp đồng hợp pháp trong khu vực pháp lý tại nơi mà Người dùng đang cư trú. Người dùng có thể truy cập Nền tảng Nanoreal nói chung và / hoặc trình duyệt thông thường mà không cần đăng ký với Nền tảng Nanoreal. Để truy cập các tính năng nhất định của Nền tảng Nanoreal, bao gồm xem các dịch vụ bất động sản hoặc đăng nội dung trên Nền tảng Nanoreal, Người dùng phải đăng ký tạo tài khoản (“Tài khoản”) và đáp ứng các tiêu chí nhất định. Người dùng phải hoàn tất quá trình đăng ký bằng cách cung cấp cho chúng tôi các thông tin hiện tại một cách đầy đủ và chính xác. Người dùng cũng sẽ toàn quyền lựa chọn mật khẩu và tên Người dùng. Trong một số trường hợp, Nanoreal có toàn quyền quyết định từ chối đăng ký hoặc hủy bỏ Tên Người dùng nếu không đáp ứng các yêu cầu về Đăng ký Tài khoản. Người dùng hoàn toàn chịu trách nhiệm trong việc duy trì tính bảo mật của mật khẩu và tài khoản của mình.',
    ],
  },
  {
    title: 'Sửa đổi, bảo trì Nền tảng ',
    content: [
      'Nanoreal có quyền sửa đổi, tạm ngừng hoặc ngừng cung cấp Nền tảng Nanoreal (toàn bộ hoặc một phần) bất cứ lúc nào có hoặc không có thông báo cho Người dùng. Người dùng đồng ý rằng Nanoreal sẽ không chịu trách nhiệm với Người dùng hoặc với bất kỳ bên thứ ba nào về bất kỳ sửa đổi, bảo trì, tạm ngừng hoặc ngừng cung cấp Nền tảng Nanoreal hoặc bất kỳ phần nào của Nền tảng.',
      'Không cần thông báo trước hoặc cảnh báo dưới bất kỳ hình thức nào, chúng tôi có thể hạn chế hoặc chấm dứt quyền truy cập của bất kỳ và tất cả Người dùng truy cập vào Nền tảng Nanoreal nếu chúng tôi kết luận một cách hợp lý rằng việc hạn chế hoặc chấm dứt đó là cần thiết để ngăn chặn hoặc chấm dứt sự lây lan thêm của virus hoặc vi phạm, xâm nhập bất hợp pháp hoặc trục trặc hệ thống.',
      'Khi truy cập trang Nền tảng, Người dùng cần lưu ý rằng Internet nói chung không được coi là môi trường an toàn và dữ liệu được gửi qua internet có thể bị truy cập bởi các bên thứ ba trái phép, có khả năng dẫn đến tiết lộ, thay đổi nội dung hoặc lỗi kỹ thuật. Dữ liệu được gửi qua internet có thể được truyền qua biên giới quốc tế mặc dù cả người gửi và người nhận đều ở cùng một quốc gia. Nanoreal không chịu bất kỳ trách nhiệm hoặc nghĩa vụ nào đối với việc bảo mật dữ liệu trong quá trình truyền qua internet và không đảm bảo rằng các trang web hoặc máy chủ của nó là miễn nhiễm virus hoặc các thành phần gây hại khác.',
      'Nanoreal không chịu trách nhiệm về lỗi đánh máy hoặc thiếu sót liên quan đến giá cả, thông tin sản phẩm, văn bản hoặc hình ảnh. Mặc dù Nanoreal cố gắng làm cho việc truy cập và sử dụng Nền tảng Nanoreal và Dịch vụ của Người dùng được an toàn và hiệu quả, nhưng Nanoreal không thể đảm bảo rằng các trang web hoặc các máy chủ của nó không có virus hoặc các thành phần có hại khác. Do đó, Người dùng nên sử dụng phần mềm được công nhận để phát hiện và diệt virus từ bất kỳ bản tải xuống nào từ Nền tảng Nanoreal.',
    ],
  },
  {
    title: 'Cảnh báo về gian lận và lừa đảo trên Nền tảng',
    content: [
      'Một hậu quả đáng tiếc đối với danh tiếng của chúng tôi là việc những kẻ mạo danh và gian lận sử dụng sai tên, thương hiệu và danh tiếng của chúng tôi để xuất bản các Nền tảng Nanoreal giả mạo và tham gia vào các trò gian lận “lừa đảo” nhằm tìm kiếm, chiếm đoạt thông tin cá nhân hoặc bí mật.',
      'Khi giao tiếp với Nanoreal thông qua phương tiện kỹ thuật số, Người dùng vui lòng:',
      '\t (i) Xác nhận rằng Người dùng đang truy cập Nền tảng Nanoreal được Nanoreal ủy quyền.',
      '\t(ii) Không chia sẻ mật khẩu và ID đăng nhập của Người dùng với bất kỳ ai, kể cả bất kỳ ai từ Nanoreal. Các Nền tảng Nanoreal là riêng tư, chỉ dành cho khách hàng thông qua các thủ tục đăng nhập an toàn. Ngoài việc cho phép Người dùng sử dụng mật khẩu và đăng nhập vào một Nền tảng Nanoreal, Nanoreal sẽ không bao giờ yêu cầu Người dùng cung cấp mật khẩu hoặc thông tin đăng nhập. (Nếu Người dùng quên mật khẩu hoặc thông tin đăng nhập, chúng tôi sẽ hỗ trợ cấp lại cho Người dùng mật khẩu mới sau khi đã xác thực, đối chiếu với các thông tin Người dùng đã cung cấp trước đó cho Nanoreal.)',
      '\t(iii) Không giao tiếp hoặc giao dịch với nhân viên không thuộc những văn phòng được ủy quyền từ Nanoreal. Tất cả các địa điểm văn phòng được ủy quyền đều được liệt kê trên trang liên hệ của chúng tôi, ngoài ra không có địa điểm, văn phòng nào khác được xem là văn phòng ủy quyền của Nanoreal.',
      '\t(iv) Không gửi email cho bất kỳ ai có một địa chỉ email khác so với địa chỉ email Nanoreal hoặc địa chỉ email Nanoreal đã ủy quyền. Nanoreal chỉ sử dụng “hi@Nanoreal.io” cho tất cả các địa chỉ email giao tiếp với Người dùng. Nanoreal không cho phép nhân viên và đại diện được ủy quyền của chúng tôi gửi hoặc nhận email liên quan đến công việc từ địa chỉ email cá nhân hoặc bất kỳ địa chỉ nào khác.',
      'Nếu Người dùng có bất kỳ câu hỏi nào về những điều trên, vui lòng liên hệ với Nanoreal theo địa chỉ help@nanoreal.io.',
    ],
  },
  {
    title: 'Hiệu lực đối với các thỏa thuận khác',
    content: [
      'Không có nội dung nào trong Điều khoản và Điều kiện sử dụng này nhằm sửa đổi hoặc bổ sung bất kỳ thỏa thuận bằng văn bản nào khác mà Người dùng có thể giao kết với Nanoreal (bao gồm nhưng không giới hạn bất kỳ thỏa thuận khách hàng, thỏa thuận tham gia, thỏa thuận hoạt động, thỏa thuận đầu tư hoặc tài khoản / thỏa thuận) ( “Các Thỏa thuận khác”) (nếu có) hiện đang có hiệu lực. Trong trường hợp có bất kỳ sự mâu thuẫn nào giữa các Điều khoản và Điều kiện sử dụng này và bất kỳ Thỏa thuận nào khác, các Thỏa thuận khác sẽ được áp dụng. Một số trang trong Nền tảng Nanoreal có chứa các điều khoản và điều kiện bổ sung cũng như tiết lộ và tuyên bố từ chối trách nhiệm bổ sung, bổ sung cho các Điều khoản và Điều kiện Sử dụng này. Trong trường hợp có xung đột, các điều khoản và điều kiện bổ sung cũng như tiết lộ và tuyên bố từ chối trách nhiệm bổ sung sẽ chi phối cho các phần của điều khoản này.',
    ],
  },
  {
    title: 'Pháp luật điều chỉnh',
    content: [
      'Các tiêu đề được sử dụng trong các Điều khoản và Điều kiện sử dụng là dành cho mục đích tham khảo và không có cách nào xác định hoặc giới hạn phạm vi của phần này. Các Điều khoản sử dụng này được điều chỉnh bởi luật pháp của Việt Nam. Nếu bất kỳ điều nào của các Điều khoản sử dụng bị coi là không thể thực thi, điều khoản đó sẽ được điều chỉnh chỉ trong phạm vi cần thiết để làm cho nó có hiệu lực, hoặc nếu có bất cứ điều khoản nào bị tuyên vô hiệu bởi toà án có thẩm quyền thì các điều khoản khác vẫn có hiệu lực áp dụng. Việc Nanoreal không hành động liên quan đến việc người dùng vi phạm các Điều khoản và Điều kiện Sử dụng này không cấu thành sự từ bỏ và sẽ không hạn chế quyền của Nanoreal đối với hành vi vi phạm đó hoặc bất kỳ vi phạm nào sau đó.',
    ],
  },
  {
    title: 'Giải quyết tranh chấp',
    content: [
      'Bằng cách sử dụng Nền tảng Nanoreal, Người dùng đồng ý và chấp thuận tuân thủ tất cả các quy định, điều khoản sử dụng của Nanoreal một cách tự nguyện, mọi hành vi vi phạm của Người dùng có thể dẫn đến tranh chấp, thiệt hại cho Người dùng khác hoặc Nanoreal. Trong mọi trường hợp có sự tranh chấp xảy ra Nanoreal bảo lưu quyền quyết định giải quyết tranh chấp theo các quy định, điều khoản sử dụng của Nanoreal. Nếu các tranh chấp ngoài phạm vi quy định của Nanoreal thì các Bên sẽ tiến hành thương lượng, đàm phán với tinh thần thiện chí, hợp tác … nếu không giải quyết được các Bên sẽ tiến thành thủ tục khoả kiện tại Toà án nhân dân Tp.TCM. Phán Quyết của Toà án là phán quyết cuối cùng các bên có nghĩa vụ thực hiện, Bên thua kiện sẽ chịu toàn bộ án phí và chi phí Luật sư cho các Bên còn lại.',
    ],
  },
  {
    title: 'Vi phạm và Xử lý vi phạm',
    content: [
      'Người dùng không được vi phạm hoặc cố gắng vi phạm tính bảo mật của Nền tảng Nanoreal. Việc giả mạo bất kỳ phần nào của Nền tảng Nanoreal, cung cấp thông tin không trung thực hoặc không chính xác, trình bày sai danh tính của Người dùng hoặc thực hiện các hoạt động gian lận trên Nền tảng Nanoreal đều bị cấm và cấu thành hành vi vi phạm các Điều khoản sử dụng này.',
      'Người dùng bị cấm vi phạm hoặc cấm hành vi cố gắng vi phạm bảo mật của Nền tảng Nanoreal bao gồm nhưng không giới hạn:',
      '\t(i) Truy cập dữ liệu không dành cho Người dùng hoặc đăng nhập vào máy chủ hoặc tài khoản mà Người dùng không được phép truy cập.',
      '\t(ii) Vô hiệu hóa, loại bỏ hoặc đánh sập bất kỳ thiết bị hoặc hệ thống bảo mật nào, bao gồm nhưng không giới hạn, bất kỳ mật khẩu và chức năng đăng nhập/được sử dụng để xác thực Người dùng',
      '\t(iii) Cố gắng thăm dò, quét hoặc kiểm tra lỗ hổng của hệ thống hoặc mạng hoặc vi phạm các biện pháp bảo mật hoặc xác thực mà không được cho phép',
      '\t(iv) Cố gắng can thiệp vào dịch vụ của bất kỳ Người dùng khác, máy chủ lưu trữ hoặc mạng nào, bao gồm nhưng không giới hạn, thông qua các phương tiện gửi virus đến Nền tảng Nanoreal, làm quá tải, “tràn ngập”, “gửi thư rác”, “đánh bom” hoặc “sự cố”.',
      '\t(v) Gửi các email không được yêu cầu, bao gồm các chương trình khuyến mãi và/hoặc quảng cáo sản phẩm hoặc dịch vụ.',
      '\t(vi) Giả mạo bất kỳ tiêu đề gói TCP/IP nào hoặc bất kỳ phần nào của thông tin tiêu đề trong bất kỳ email hoặc bài đăng nào.',
      '\t(vii) Sử dụng hoặc cố gắng sử dụng bất kỳ công cụ, phần mềm hoặc thiết bị khác hoặc cơ chế (bao gồm nhưng không giới hạn các trình duyệt, gián điệp, robot, đại diện hoặc đại lý thông minh) để di chuyển hoặc tìm kiếm các trang web khác hơn là công cụ tìm kiếm có sẵn trên Nền tảng Nanoreal hoặc các trình duyệt web của bên thứ ba thường có sẵn.',
      '\t(viii) Thiết kế ngược, dịch ngược hoặc tháo rời phần mềm bên dưới.',
      '\t(ix) Xóa bất kỳ thông báo, cảnh báo, nhãn, chú thích hoặc hướng dẫn nào khỏi bất kỳ phần nào của Nền tảng Nanoreal hoặc bất kỳ tài liệu liên quan nào, bao gồm nhưng không giới hạn, bất kỳ bằng sáng chế, nhãn hiệu, bản quyền hoặc các thông báo độc quyền khác hoặc các điều khoản cấp phép',
      '\t(x) Xâm phạm quyền riêng tư, lấy danh tính hoặc lấy bất kỳ thông tin cá nhân nào về bất kỳ Người dùng nào của Nền tảng Nanoreal.',
      'Bất kỳ hành vi vi phạm hệ thống hoặc an ninh mạng nào bao gồm: cố tình truy cập vào máy tính mà không được phép hoặc vượt quá cấp độ truy cập được phép của Người dùng có thể dẫn đến các hành vi vi phạm pháp luật về dân sự hoặc hình sự, bao gồm nhưng không giới hạn ở các vi phạm Lạm dụng và Lừa đảo. Nanoreal có thể điều tra các trường hợp được cho là liên quan đến các hanh vi vi phạm đó và có thể hợp tác với các cơ quan thực thi pháp luật trong việc truy tố những người dùng có liên quan.',
    ],
  },
  {
    title: 'Miễn trừ trách nhiệm',
    content: [
      'Bằng cách sử dụng Nền tảng Nanoreal, Người dùng đồng ý rằng việc sử dụng Nanoreal là có rủi ro cho Người dùng. Nền tảng Nanoreal và các dịch vụ có liên quan được cung cấp trên cơ sở “nguyên trạng”, “có sẵn” và “có thể có lỗi, lỗ hổng bảo mật”. Bất kỳ những gì liên quan đến Nanoreal hoặc bất cứ cá nhân, giám đốc, nhân viên, đại lý, nhà cung cấp nội dung của bên thứ ba, nhà thiết kế, nhà thầu, nhà phân phối, nhà sản xuất, nhà tài trợ, người cấp phép hoặc bên thứ ba, (gọi chung là “Cộng sự”) đều không bảo đảm rằng việc sử dụng Nền tảng Nanoreal hoặc các dịch vụ liên quan đều sẽ không bị gián đoạn hoặc không có lỗi. Không ai trong số Nanoreal và các Cộng sự  đảm bảo tính chính xác, hoàn thiện, sự có sẵn hoặc hạn định của nội dung đề cập trên Nền tảng Nanoreal hoặc các tài liệu hoặc dịch vụ cung cấp trên nền tảng doanh nghiệp hiện tại và cả trong tương lai. Nanoreal và Cộng sự đặc biệt từ chối mọi bảo đảm, dù là rõ ràng hay ngụ ý, bao gồm nhưng không giới hạn ở bảo đảm về quyền sở hữu, khả năng bán, sự phù hợp cho một mục đích cụ thể hoặc không vi phạm của nền tảng, thông tin trên Nền tảng hoặc các kết quả thu được từ việc sử dụng Nền tảng hoặc những dịch vụ có liên quan. Nanoreal  và Cộng sự không chịu trách nhiệm cho bất kỳ sự cập nhật của các bên về nền tảng  hoặc nội dung trong đó.',
      'Trong mọi trường hợp, Nanoreal hoặc Cộng sự không chịu trách nhiệm với Người dùng hoặc bất kỳ người nào khác cho bất cứ rủi ro trực tiếp, do hậu quả, ngẫu nhiên, đặc biệt, tổn hại hoặc gián tiếp khác, bao gồm nhưng không giới hạn việc mất lợi nhuận, mất tài khoản, mất ví, mất Token, giao dịch thất bại, truy cập không hợp lệ, hệ thống lỗi, đường truyền hỏng hoặc các hư hại khác mà do kết quả xuất phát từ việc sử dụng hay mất kết nối với Nền tảng, nội dung, sự bất tiện hoặc trì hoãn. Điều này là đúng ngay cả nếu đã được Nanoreal tư vấn về khả năng xảy ra các thiệt hại hoặc mất mát như vậy.',
      'Bất kỳ nội dung tải về hoặc có được thông qua Nền tảng Nanoreal được thực hiện theo quyết định và rủi ro của riêng Người dùng và Người dùng tự chịu trách nhiệm cho bất kỳ thiệt hại xảy ra đối với máy tính của Người dùng hoặc hệ thống điện tử khác hoặc mất dữ liệu mà kết quả xuất phát từ việc tải xuống của bất kỳ nội dung đó. Giới hạn trách nhiệm nêu trên sẽ được áp dụng trong bất kỳ hành động nào, dù là trong hợp đồng, vi phạm hoặc bất kỳ khiếu nại nào khác, ngay cả khi đại diện được ủy quyền của Nanoreal đã được thông báo hoặc phải biết về khả năng xảy ra những thiệt hại đó.',
    ],
  },
  {
    title: 'Thay đổi Điều khoản sử dụng',
    content: [
      'Chúng tôi có thể thay đổi Điều khoản sử dụng này bất kỳ lúc nào. Chúng tôi khuyến khích Người dùng thường xuyên truy cập Nền tảng Nanoreal để cập nhật các thông tin mới nhất liên quan đến thực tiễn hoạt động của chúng tôi. Nếu chúng tôi thực hiện bất kỳ thay đổi nào, chúng tôi sẽ thay đổi Ngày cập nhật lần cuối ở đầu Điều khoản này.',
      'Bất kỳ sửa đổi nào đối với Điều khoản sử dụng này sẽ có hiệu lực ngay khi chúng tôi đăng các điều khoản mới và / hoặc khi thực hiện các thay đổi đối với Nền tảng Nanoreal (hoặc theo cách khác được chỉ định tại thời điểm thay đổi). Trong mọi trường hợp, việc Người dùng tiếp tục sử dụng Nền tảng Nanoreal hoặc Dịch vụ sau khi Chúng tôi thực hiện bất kỳ sửa đổi đối với Điều khoản sử dụng  sẽ đồng nghĩa với việc Người dùng chấp nhận các điều kiện của Điều khoản sử dụng đã sửa đổi.',
    ],
  },
];

const RULE_LIST_PART_2 = [
  {
    title: 'Các nguồn dữ liệu mà Nanoreal thu thập được',
    content: [
      'Dữ liệu cá nhân mà chúng tôi thu thập về Người dùng chủ yếu đến từ việc đăng ký nền tảng, tạo Token BĐS Nanoreal và các ứng dụng cùng đầu tư bất động sản hoặc từ các biểu mẫu và tài liệu khác mà Người dùng gửi cho Nanoreal trong quá trình giao dịch với chúng tôi. Chúng tôi cũng có thể thu thập dữ liệu về các giao dịch và trải nghiệm của Người dùng với Nanoreal liên quan đến các dịch vụ mà Nanoreal cung cấp. Ngoài ra, tùy thuộc vào các dịch vụ Người dùng sử dụng, Nanoreal có thể thu thập thêm dữ liệu về Người dùng, chẳng hạn như thông tin KYC của Người dùng.',
      'Trong quá trình cung cấp các dịch vụ cho Người dùng và tuân thủ nghiêm ngặt tất cả các luật và quy định hiện hành của Nanoreal, dữ liệu về Người dùng có thể được thu thập gián tiếp từ việc giám sát hoặc các phương tiện khác (Ví dụ: giám sát qua email). Trong những trường hợp này, dữ liệu không được truy cập thường xuyên hoặc liên tục, nhưng nó có thể được sử dụng cho mục đích tuân thủ hoặc bảo mật.',
    ],
  },
  {
    title: 'Dữ liệu Chúng tôi có được về Người dùng',
    content: [
      'Nếu Người dùng giao dịch với Nanoreal với tư cách cá nhân của mình (ví dụ như khách hàng tư nhân), hoặc với tư cách là người định cư/người được ủy thác/người thụ hưởng quỹ tín thác, hoặc với tư cách là chủ sở hữu hoặc người điều hành của một công ty hoặc phương tiện đầu tư khác được thành lập để đầu tư thay mặt Người dùng hoặc thay mặt cho gia đình Người dùng, v.v… Dữ liệu điển hình mà chúng tôi thu thập về Người dùng có thể bao gồm (ngoài bất kỳ dữ liệu nào khác có thể được xác định tùy theo từng trường hợp):',
      '●	Tên đầy đủ, số điện thoại, địa chỉ email, và các chi tiết liên hệ khác',
      '●	Số nhận dạng cá nhân, chẳng hạn như, CMND / CCCD / Hộ chiếu / Bằng lái xe tùytheo lựa chọn của Người dùng cung cấp.',
      '●	Ngày tháng năm sinh, địa chỉ, số tài khoản ngân hàng, tài khoản ví điện tử…',
      'Tất nhiên, Người dùng không bắt buộc phải cung cấp bất kỳ dữ liệu cá nhân nào mà chúng tôi có thể yêu cầu. Tuy nhiên, việc không làm như vậy có thể dẫn đến việc chúng tôi không thể mở hoặc duy trì tài khoản trực tuyến của Người dùng hoặc cung cấp dịch vụ cho Người dùng. Mặc dù, chúng tôi cố gắng hết sức để đảm bảo rằng, tất cả dữ liệu chúng tôi nắm giữ về khách hàng của mình là chính xác, đầy đủ và cập nhật nhưng chúng tôi cũng phải dựa vào việc khách hàng của mình sẽ thông báo ngay cho chúng tôi nếu có bất kỳ thay đổi nào đối với dữ liệu cá nhân của họ.',
    ],
  },
  {
    title: 'Nanoreal sử dụng dữ liệu của Người dùng',
    content: [
      'Chúng tôi có thể sử dụng dữ liệu cá nhân của Người dùng để:',
      '●	Quản lý, vận hành, tạo điều kiện và quản lý mối quan hệ và/hoặc tài khoản của Người dùng với Nanoreal. Điều này có thể bao gồm việc chia sẻ dữ liệu đó trong nội bộ cũng như tiết lộ dữ liệu đó cho các bên thứ ba, như được mô tả trong hai phần sau, tương ứng.',
      '●	Liên hệ với Người dùng hoặc, nếu có, (các) đại diện được chỉ định của Người dùng qua bưu điện, điện thoại, thư điện tử, fax, v.v., liên quan đến mối quan hệ và / hoặc tài khoản của Người dùng.',
      '●	Cung cấp cho Người dùng dữ liệu, khuyến nghị hoặc lời khuyên liên quan đến các sản phẩm và dịch vụ do Nanoreal cung cấp.',
      '●	Tạo điều kiện thuận lợi cho các hoạt động kinh doanh nội bộ của chúng tôi, bao gồm đánh giá và quản lý rủi ro cũng như đáp ứng các yêu cầu pháp lý và quy định của chúng tôi.',
      'Nếu mối quan hệ của Người dùng với Nanoreal chấm dứt, Nanoreal sẽ tiếp tục xử lý dữ liệu cá nhân của Người dùng trong phạm vi chúng tôi giữ lại dữ liệu đó như được mô tả trong Chính sách này.',
    ],
  },
  {
    title: 'Tiết lộ dữ liệu của Người dùng',
    content: [
      'Để cung cấp các dịch vụ hiệu quả và đáng tin cậy cũng như để cải thiện các tùy chọn sản phẩm và dịch vụ có sẵn cho Người dùng, nhiều tổ chức trong Nanoreal có thể được cấp hoặc được cấp quyền truy cập vào dữ liệu cá nhân của Người dùng. Ví dụ: Một pháp nhân Nanoreal có thể chia sẻ dữ liệu của Người dùng với một pháp nhân khác để tạo điều kiện thuận lợi cho việc giải quyết các giao dịch của Người dùng hoặc duy trì tài khoản của Người dùng như là các đơn vị cung cấp dịch vụ thanh toán như Ngân hàng; Ví điện tử; đơn vị cung cấp dịch vụ ký hợp đồng điện tử…. Khi chia sẻ dữ liệu cá nhân của Người dùng như vậy, chúng tôi tuân thủ các tiêu chuẩn ngành và luật hiện hành liên quan đến việc bảo vệ dữ liệu cá nhân.',
    ],
  },
  {
    title: 'Tiết lộ dữ liệu của Người dùng cho Bên Thứ ba',
    content: [
      'Nanoreal không tiết lộ dữ liệu cá nhân của Người dùng cho các bên thứ ba, ngoại trừ các trường hợp được mô tả trong chính sách này. Việc tiết lộ cho bên thứ ba có thể bao gồm việc chia sẻ dữ liệu đó với các đối tác đầu tư (ví dụ: nhà tài trợ giao dịch), các tổ chức tài chính khác (ví dụ: các tổ chức cho vay yêu cầu dữ liệu đó theo yêu cầu quy định) và / hoặc các công ty không liên kết thực hiện các dịch vụ hỗ trợ cho tài khoản của Người dùng hoặc tạo điều kiện cho các giao dịch của Người dùng với Nanoreal, bao gồm những dịch vụ cung cấp tư vấn về chuyên môn, pháp lý hoặc kế toán cho Nanoreal. Mỗi bên thứ ba như vậy sẽ được yêu cầu duy trì tính bảo mật của dữ liệu đó trong phạm vi dữ liệu đã nhận được và chỉ sử dụng dữ liệu cá nhân của Người dùng trong quá trình cung cấp dịch vụ và cho các mục đích khác do Nanoreal yêu cầu.',
      'Chúng tôi cũng có thể tiết lộ dữ liệu cá nhân của Người dùng để thực hiện các chỉ dẫn của Người dùng, để bảo vệ quyền và lợi ích của chúng tôi và của các đối tác kinh doanh của chúng tôi hoặc theo sự đồng ý rõ ràng của Người dùng. Cuối cùng, trong một số trường hợp trong giới hạn, dữ liệu cá nhân của Người dùng có thể được tiết lộ cho các bên thứ ba khi được cho phép hoặc tuân theo các luật và quy định hiện hành.',
      'Đối với những khách hàng liên kết hoặc xác minh tài khoản ngân hàng qua Nền tảng của chúng tôi, chúng tôi có thể sử dụng các dịch vụ do Ngân hàng cung cấp để thu thập dữ liệu của Người dùng từ các tổ chức tài chính. Bằng cách sử dụng các tính năng đó của dịch vụ của chúng tôi, Người dùng cấp cho Khách hàng và Ngân hàng quyền, và quyền hạn để thay mặt Người dùng truy cập và truyền dữ liệu cá nhân và tài chính của Người dùng từ tổ chức tài chính có liên quan. Người dùng đồng ý để dữ liệu cá nhân và tài chính của Người dùng được Ngân hàng chuyển, lưu trữ và xử lý theo Chính sách của Ngân hàng. Người dùng nên biết rằng Nanoreal sẽ không bán bất kỳ dữ liệu cá nhân nào của Người dùng.',
    ],
  },
  {
    title: 'Bảo mật dữ liệu',
    content: [
      'Chúng tôi thực hiện mọi nỗ lực về các biện pháp bảo mật kỹ thuật và tổ chức để bảo vệ Dữ liệu của Người dùng không bị thao túng, bị mất hoặc bị truy cập bởi các bên thứ ba trái phép.',
      'Nền tảng Nanoreal của chúng tôi được quét thường xuyên để dò tìm các lỗ hổng bảo mật mới và các lỗ hổng bảo mật đã sửa đổi trước đó để giúp Người dùng truy cập Nền tảng Nanoreal an toàn nhất có thể.',
      'Dữ liệu Cá nhân của Người dùng được chứa đằng sau các mạng sẽ được bảo mật và chỉ có thể truy cập được bởi số lượng giới hạn cá nhân có quyền truy cập đặc biệt vào các hệ thống đó và được yêu cầu giữ bí mật dữ liệu.',
      'Mặc dù không có phương pháp truyền tải nào qua Internet hoặc phương pháp lưu trữ điện tử nào là an toàn tuyệt đối nhưng chúng tôi luôn cố gắng liên tục cập nhật và cải thiện các biện pháp bảo mật để bắt kịp với những phát triển công nghệ gần đây nhất.',
      'Nanoreal muốn Người dùng lưu ý rằng chúng tôi thường không bao giờ yêu cầu Người dùng cùng cấp các dữ liệu tài chính hoặc thanh toán, chẳng hạn như số thẻ tín dụng, mật mã, số tài khoản hoặc số pin của Người dùng, trong email, tin nhắn văn bản hoặc bất kỳ dữ liệu liên lạc nào khác mà chúng tôi gửi cho Người dùng. Vui lòng luôn kiểm tra xem bất kỳ Trang web nào yêu cầu cung cấp dữ liệu tài chính hoặc thanh toán liên quan đến dịch vụ của chúng tôi có chắc chắn được điều hành bởi Nanoreal hay không. Khi sử dụng Nền tảng Nanoreal và / hoặc Dịch vụ của chúng tôi, Người dùng cần cân nhắc đến nguy cơ tồn tại tin tặc mạo danh.',
      'Nếu Người dùng nhận được một yêu cầu đáng ngờ, vui lòng không cung cấp dữ liệu của Người dùng và ngay lập tức liên hệ với một trong những đại diện dịch vụ thành viên của chúng tôi như được quy định trong Điều khoản của nền tảng này.',
      'Chúng tôi không thể đảm bảo 100% rằng việc mất mát, sử dụng sai, thu thập trái phép hoặc thay đổi dữ liệu của Người dùng sẽ không xảy ra, vui lòng chấp nhận rằng Người dùng cũng đóng một vai trò quan trọng trong việc bảo vệ dữ liệu cá nhân của chính mình. Khi đăng ký với chúng tôi, điều quan trọng là Người dùng phải chọn một mật khẩu thích hợp có đủ độ dài và độ phức tạp, không tiết lộ mật khẩu này cho bất kỳ bên thứ ba nào và thông báo ngay cho chúng tôi nếu Người dùng biết hoặc nghi ngờ về bất kỳ truy cập hoặc sử dụng trái phép nào vào tài khoản của mình.',
      'Hơn nữa, chúng tôi không thể đảm bảo tính bảo mật hoặc bí mật của dữ liệu mà Người dùng truyền cho chúng tôi hoặc nhận được từ chúng tôi bằng kết nối Internet hoặc đường truyền không dây, bao gồm email, điện thoại hoặc SMS, vì chúng tôi không có cách nào để bảo vệ dữ liệu đó khi nó rời đi hoặc cho đến khi nó được truyền đến với chúng tôi. Nếu Người dùng có lý do để tin rằng dữ liệu của Người dùng không còn an toàn, vui lòng liên hệ với chúng tôi theo địa chỉ email, địa chỉ gửi thư hoặc số điện thoại được liệt kê trong Điều khoản của nền tảng này.',
      'Khi truy cập Nền tảng Nanoreal, người dùng cần lưu ý rằng internet nói chung không được xem là môi trường an toàn và dữ liệu được gửi qua internet có thể bị truy cập bởi các bên thứ ba trái phép, có khả năng dẫn đến tiết lộ, thay đổi nội dung hoặc lỗi kỹ thuật. Dữ liệu được gửi qua internet có thể được truyền qua biên giới quốc tế mặc dù cả người gửi và người nhận đều ở cùng một quốc gia. Nanoreal không chịu bất kỳ trách nhiệm hoặc nghĩa vụ nào đối với việc bảo mật dữ liệu trong quá trình truyền qua internet.',
      'Nền tảng Nanoreal có thể chứa một số liên kết nhất định. Việc kích hoạt các liên kết trên Nền tảng Nanoreal có thể khiến Người dùng cá nhân rời khỏi Nền tảng Nanoreal. Các liên kết như vậy chỉ được cung cấp vì sự thuận tiện và dữ liệu của Người dùng. Nanoreal hiện nay chưa xem xét bất kỳ Nền tảng nào khác được liên kết hoặc kết nối với Nền tảng Nanoreal và việc sử dụng các liên kết trên là rủi ro riêng của mỗi Người dùng.',
    ],
  },
  {
    title: 'Quyền riêng tư và Internet',
    content: [
      'Thông tin bổ sung sau đây cần được Người dùng quan tâm khi truy cập vào Nền tảng Nanoreal:',
      '●	Nanoreal.io được xây dựng dựa trên cơ sở hạ tầng an toàn với nhiều lớp bảo vệ. Nanoreal sử dụng các công nghệ mã hóa tiêu chuẩn ngành để bảo vệ dữ liệu của Người dùng khỏi sự xâm phạm từ bên ngoài.',
      '●	Bảo mật là một nỗ lực hợp tác giữa Nanoreal và Người dùng của Nanoreal.io. Hãy nhớ rằng dữ liệu đăng nhập và mật khẩu của Người dùng là cá nhân của Người dùng và không được cung cấp cho bất kỳ người nào khác. Ngoài ra, Người dùng nên ngừng sử dụng chúng và thông báo cho chúng tôi nếu Người dùng có bất kỳ lý do gì để nghi ngờ rằng ai đó có thể đang sử dụng chúng.',
      '●	Chúng tôi có thể thu thập một số dữ liệu tổng hợp và phi cá nhân khi Người dùng truy cập Nanoreal.io thông qua công nghệ "cookie". Cookie là các đoạn văn bản có thể được đặt trên ổ cứng máy tính của Người dùng khi truy cập các Nền tảng Nanoreal nhất định. Cookie có thể nâng cao trải nghiệm trực tuyến của Người dùng bằng cách lưu các tùy chọn của Người dùng khi đang truy cập một Nền tảng Nanoreal cụ thể. Phần “trợ giúp” của thanh công cụ trên hầu hết các trình duyệt sẽ cho Người dùng biết cách ngừng chấp nhận cookie mới, biết cách được thông báo khi Người dùng nhận được cookie mới và cách tắt cookie hiện có. Tuy nhiên, hãy nhớ rằng nếu không có cookie, Người dùng có thể không tận dụng được hết tất cả các tính năng của Nanoreal.io.',
    ],
  },
  {
    title: 'Thay đổi Chính sách bảo mật',
    content: [
      'Chúng tôi có thể thay đổi Chính sách bảo mật này bất kỳ lúc nào. Chúng tôi khuyến khích Người dùng thường xuyên truy cập Nền tảng Nanoreal để cập nhật các thông tin mới nhất liên quan đến thực tiễn bảo mật của chúng tôi. Nếu chúng tôi thực hiện bất kỳ thay đổi nào, chúng tôi sẽ thay đổi Ngày cập nhật lần cuối ở đầu Chính sách này.',
      'Bất kỳ sửa đổi nào đối với Chính sách bảo mật này sẽ có hiệu lực ngay khi chúng tôi đăng các điều khoản mới và / hoặc khi thực hiện các thay đổi đối với Nền tảng Nanoreal (hoặc theo cách khác được chỉ định tại thời điểm thay đổi). Trong mọi trường hợp, việc Người dùng tiếp tục sử dụng Nền tảng Nanoreal hoặc Dịch vụ sau khi Chúng tôi thực hiện bất kỳ sửa đổi đối với Chính sách Bảo mật sẽ đồng nghĩa với việc Người dùng chấp nhận các điều khoản của Chính sách Bảo mật đã sửa đổi.',
    ],
  },
];

const RULE_LIST_PART_3 = [
  'Nhà đầu tư là bất kỳ cá nhân bao gồm nhưng không giới hạn người Việt Nam, người gốc Việt Nam, người Việt Nam định cư ở nước ngoài và người nước ngoài.',
  'Khoản tiền tham gia đầu tư góp vốn cùng đầu tư bất động sản là hợp pháp',
  'Nhà đầu tư nước ngoài phải tham khảo quy định Pháp luật Việt Nam về BĐS, quyền chủ sở hữu BĐS đối với người nước ngoài trước khi quyết định tham gia đầu tư trên Nanoreal.',
  'Tham gia góp vốn trên tinh thần tự nguyện, không ép buộc, không vi phạm điều cấm của pháp luật, không trái đạo đức xã hội, không làm trái với quy định của Nanoreal và các điều khoản trong Hợp đồng nguyên tắc về việc góp vốn đầu tư BĐS.',
  'Nhà đầu tư phải cung cấp tên thật, địa chỉ, số điện thoại, địa chỉ email, tài khoản ngân hàng và các thông tin khác được yêu cầu tùy từng thời điểm. Nhà đầu tư đăng ký xác thực tài khoản đồng nghĩa đã tuyên bố và đảm bảo tất cả các dữ liệu đăng ký cho tài khoản là trung thực, chính chủ và chính xác',
  'Hoàn toàn chịu trách nhiệm về việc sử dụng nền tảng và dịch vụ của mình. Nhà đầu tư đồng ý rằng việc chia sẻ dịch vụ với người thứ ba hoặc cung cấp quyền truy cập cho người thứ ba vào nền tảng và dịch vụ của Nanoreal thông qua tài khoản của Nhà đầu tư là vi phạm các quy định Nanoreal.',
  'Nhà đầu tư phải hiểu rõ và chấp thuận tất cả các quy định của Nanoreal, Quy định của Hợp đồng nguyên tắc về việc góp vốn đầu tư BĐS và các quy định khác',
  'Nhà đầu tư không muốn tiếp tục góp vốn đầu tư bất động sản thì có quyền chuyển nhượng Token BĐS cho người khác, nhưng không được tự ý hoặc có yêu cầu rút lại phần vốn đã góp.',
  'Đảm bảo đủ kiến thức để hiểu và sử dụng thành thạo hệ sinh thái Nanoreal, Internet, Email, hiểu công nghệ Blockchain, Token BĐS ….',
  'Nhà đầu tư đã nghiên cứu và  hiểu rõ tất cả thông tin về Nanoreal, đơn vị hợp tác, hồ sơ pháp lý BĐS, thông tin của bất động sản và các thông tin khác được cập nhật trên nền tảng Nanoreal trước khi quyết định tham gia góp vốn vào pool đầu tư; Hiểu rõ việc đầu tư BĐS là một hình thức đầu tư có rủi ro và tự chịu mọi rủi ro với quyết định của mình.',
  'Nhà đầu tư tham gia góp vốn mua bất động sản trong trạng thái đầy đủ năng lực hành vi dân sự, hoàn toàn tự nguyện, không bị lừa dối, ép buộc hoặc bị gây nhầm lẫn hoặc nhầm trốn tránh bất kỳ nghĩa vụ nào khác.',
  'Đảm bảo thanh toán đúng và đủ phần vốn góp đã đăng ký trên Nền tảng Nanoreal theo đúng thời hạn quy định trong pool.',
  'Nhà đầu tư phải cập nhật, theo dõi và kiểm tra thông tin và tiến độ của pool đầu tư thường xuyên qua các phương tiện website Nanoreal.io, app Nanoreal trên Google Play/Apple Store, email, SMS.',
  'Tự chịu trách nhiệm về kê khai, nộp đầy đủ các loại thuế và các nghĩa vụ tài chính khác với Nhà Nước hoặc bên thứ ba từ việc hưởng lợi trên cơ sở tham gia góp vốn cùng đầu tư bất động sản theo quy định của pháp luật.',
  'Chấp nhận các hình thức phạt và bồi thường thiệt hại do lỗi, vi phạm quy định của của Nhà đầu tư gây ra theo quy định của Nanoreal.',
  'Tự chịu mọi rủi ro đối với việc sở hữu, bảo quản, lưu giữ Token BĐS. Nanoreal sẽ không chịu trách nhiệm giải quyết các khiếu nại của NĐT đối với các việc: quên password, mất Token BĐS, quên hoặc mất quyền kiểm soát ví điện tử….',
];

const RULE_LIST_PART_4 = [
  'Nền tảng Nanoreal không phải là đại lý hay môi giới của các thành viên đã đăng ký đưa các bất động sản, dự án lên nền tảng Nanoreal để kêu gọi các Nhà đầu tư góp vốn mua/bán/đầu tư. Không có thông tin nào trên nền tảng Nanoreal tạo thành khuyến nghị Nhà đầu tư mua/bán/thực hiện bất kỳ Token bất động sản, dự án hoặc tài sản nào khác, cũng không đưa ra lời khuyên tài chính hoặc cố vấn đầu tư và không tiến hành bất kỳ hoạt động, yêu cầu nào như vậy. Chúng tôi khuyên bạn nên tự tìm hiểu hoặc tham khảo ý kiến của các chuyên gia có năng lực về việc mua/bán/thực hiện các giao dịch bất động sản, dự án trước khi quyết định các khoản đầu tư thực tế hoặc các quyết định tài chính trên nền tảng Nanoreal. Chúng tôi không chịu trách nhiệm về bất kỳ sự nhầm lẫn, không rõ ràng nào của bạn hoặc bất kỳ ai về các thông tin, chính sách đã được công khai, sẵn có trên nền tảng Nanoreal.',
  'Các khoản đầu tư của bạn trên nền tảng Nanoreal không có tính thanh khoản nhanh và không bao giờ có bất kỳ đảm bảo nào rằng bạn sẽ có thể thu hồi các khoản đầu tư của mình trên thị trường thứ cấp với mức giá đạt được luôn cao hơn khoản đầu tư ban đầu. Bất kỳ đợt chào bán bất động sản, dự án hoặc tài sản nào khác đều là riêng tư và bạn có thể được yêu cầu xác minh về việc chuyển nhượng khoản đầu tư này cho bất kỳ cá nhân, tổ chức nào khác. Không có cơ quan chức năng nào xác thực việc chuyển nhượng Token BĐS của bạn trên các sàn giao dịch, P2P. Do đó, Chúng tôi sẽ không chịu trách nhiệm cho việc chuyển nhượng khoản đầu tư của bạn không trực tiếp thông qua Nanoreal.',
];

const QuyDinh = () => {
  // ------------
  // HANDLE LOADING
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  // -----------
  // HANDLE SCROLL TO PARAGRAPH 2
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const part = params.get('part');
  useEffect(() => {
    if (part === '2' && !isLoading) {
      const main_head_tilte = document.querySelector('#main-head-tilte');
      const title = document.querySelector('#title');
      const part_1 = document.querySelector('#part-1');
      document
        .querySelector('body')
        .scrollTo(0, title.clientHeight + part_1.clientHeight + main_head_tilte.clientHeight + 60);
    }
  }, [part, isLoading]);
  // --------------
  if (isLoading) {
    return <PageLoading />;
  }
  return (
    <div>
      <Navbar />
      <div className="min-h-screen break leading pt-25">
        <Container>
          <h4
            id="main-head-tilte"
            className="py-10 text-4xl font-bold leading-tight text-center sm:text-5xl text-primary"
          >
            QUY ĐỊNH VÀ ĐIỀU KHOẢN SỬ DỤNG <br /> PLATFORM NANOREAL
            <span className="block text-xl font-normal leading-tight text-center text-white">
              Version 1.0 áp dụng ngày 01.01.2022
            </span>
          </h4>
          <div className="space-y-8">
            {/* TITLE */}
            <div id="title" className="relative px-6 py-10 sm:px-14 bg-black-3 z-1 rounded-xl">
              <p className="leading-loose text-justify whitespace-pre-wrap">
                {'\t\t'}CHÀO MỪNG BẠN ĐẾN VỚI NỀN TẢNG BLOCKCHAIN BẤT ĐỘNG SẢN (BĐS) NANOREAL. ĐỂ TRỞ THÀNH NHÀ ĐẦU TƯ
                TRÊN PLATFORM NANOREAL CÁC BẠN CẦN BIẾT RẰNG ĐẦU TƯ BĐS TRÊN NANOREAL KHÔNG GIỐNG VỚI LOẠI HÌNH ĐẦU TƯ
                BĐS TRUYỀN THỐNG MÀ BẠN ĐÃ TỪNG BIẾT. BẠN CẦN HIỂU RÕ MÔ HÌNH NANOREAL TẠI WWW.NANOREAL.IO/ABOUT-US
                TRƯỚC KHI TIẾP TỤC XEM XÉT CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN SỬ DỤNG NÀY.
              </p>
            </div>
            {/* PART - 1 */}
            <div id="part-1" className="relative px-6 py-10 space-y-6 sm:px-14 bg-black-3 z-1 rounded-xl">
              <h5 className="text-xl font-bold text-center text-primary">
                PHẦN 1 <br />
                ĐIỀU KHOẢN SỬ DỤNG
              </h5>
              <p className="text-justify whitespace-pre-wrap">
                {'\t\t'}Chào mừng tất cả các người dùng tiếp cận nền tảng Nanoreal bao gồm đã đăng ký hoặc chưa đăng ký
                tài khoản (“Người dùng”) đến với Nanoreal.io (“Nanoreal”, “Công ty”, “chúng tôi”, “của chúng tôi” hoặc
                “chúng ta”). Các Điều khoản sử dụng này (“Điều khoản” hoặc “Điều khoản sử dụng”) chi phối việc Người
                dùng sử dụng Nền tảng Nanoreal có tại https://Nanoreal.io, nền tảng và tất cả các công cụ, ứng dụng, dữ
                liệu liên quan, phần mềm (“Nền tảng Nanoreal”) và các dịch vụ khác do chúng tôi cung cấp (“Dịch vụ”).
                Một số tính năng nhất định của Nền tảng Nanoreal tuân theo các nguyên tắc, điều khoản hoặc quy tắc bổ
                sung và đều sẽ được đăng tải trên các Nền tảng liên quan đến những tính năng đó. Tất cả các điều khoản,
                hướng dẫn và quy tắc bổ sung đều sẽ được kết hợp bằng cách tham chiếu Điều khoản này và tạo thành một
                thỏa thuận ràng buộc pháp lý giữa Người dùng và Nanoreal liên quan đến việc sử dụng Dịch vụ. Bất kỳ
                thông tin cá nhân nào được gửi liên quan đến việc sử dụng Dịch vụ đều phải tuân theo Chính sách bảo mật
                của chúng tôi, sau đây được kết hợp bằng cách tham chiếu vào các Điều khoản này.
              </p>
              <ol className="list-decimal list-inside text-primary">
                {RULE_LIST_PART_1.map((item, index) => (
                  <li key={`rule-${index}`} className="py-4 space-y-2 font-bold">
                    <span>{item.title}</span>
                    {item.content.map((i, idx) => (
                      <p
                        key={`rule-content-${idx}`}
                        className="font-normal text-justify text-white whitespace-pre-wrap"
                      >
                        {'\t\t'}
                        {i}
                      </p>
                    ))}
                  </li>
                ))}
              </ol>
            </div>
            {/* PART - 2 */}
            <div id="part-2" className="relative px-6 py-10 space-y-6 sm:px-14 bg-black-3 z-1 rounded-xl">
              <h5 className="text-xl font-bold text-center text-primary">
                PHẦN 2 <br />
                CHÍNH SÁCH BẢO MẬT VÀ QUYỀN RIÊNG TƯ
              </h5>
              <div>
                <p className="text-justify whitespace-pre-wrap">
                  {'\t\t'}Chính sách bảo mật này (“Chính sách”) mô tả cách Nanoreal (“Nanoreal” “Công ty”, “Chúng tôi”,
                  “Của chúng tôi”) thu thập, sử dụng, chia sẻ và lưu trữ Dữ liệu của Người dùng trên nền tảng Nanoreal
                  có tại https://Nanoreal.io và tất cả các công cụ, ứng dụng, thông tin liên quan, phần mềm (“Nền tảng
                  Nanoreal”) và các dịch vụ khác do chúng tôi cung cấp (“Dịch vụ”).
                </p>
                <p className="text-justify whitespace-pre-wrap">
                  {'\t\t'}Bằng cách truy cập Nền tảng Nanoreal, Người dùng chấp nhận các điều khoản của Chính sách này
                  và Điều khoản sử dụng của chúng tôi, đồng thời Người dùng đồng ý với việc chúng tôi thu thập, sử dụng,
                  tiết lộ và lưu giữ dữ liệu của Người dùng như được mô tả trong Chính sách này. Nếu Người dùng không
                  đồng ý với bất kỳ phần nào của Chính sách bảo mật này hoặc Điều khoản sử dụng của chúng tôi, vui lòng
                  không sử dụng Dịch vụ hoặc bất kỳ phần nào của Dịch vụ.
                </p>
                <p className="text-justify whitespace-pre-wrap">
                  {'\t\t'}Xin lưu ý rằng Chính sách bảo mật này không áp dụng cho dữ liệu thu thập được thông qua các
                  trang web hoặc dịch vụ của bên thứ ba mà Người dùng có thể truy cập thông qua Dịch vụ hoặc Người dùng
                  gửi cho chúng tôi qua email, tin nhắn văn bản hoặc tin nhắn điện tử khác hoặc ngoại tuyến.
                </p>
              </div>
              <ol className="list-decimal list-inside text-primary">
                {RULE_LIST_PART_2.map((item, index) => (
                  <li key={`rule-${index}`} className="py-4 space-y-2 font-bold">
                    <span>{item.title}</span>
                    {item.content.map((i, idx) => (
                      <p
                        key={`rule-content-${idx}`}
                        className="font-normal text-justify text-white whitespace-pre-wrap"
                      >
                        {'\t\t'}
                        {i}
                      </p>
                    ))}
                  </li>
                ))}
              </ol>
            </div>
            {/* PART - 3 */}
            <div className="relative px-6 py-10 sm:px-14 bg-black-3 z-1 rounded-xl">
              <h5 className="mb-4 text-xl font-bold text-center text-primary">
                PHẦN 3 <br />
                CAM KẾT CỦA NHÀ ĐẦU TƯ THAM GIA NỀN TẢNG NANOREAL
              </h5>
              <ol className="list-lower-alpha">
                {RULE_LIST_PART_3.map((item, index) => (
                  <li key={`rule-${index}`} className="mb-2 text-justify">
                    <span className="text-white whitespace-pre-wrap ">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            {/* PART - 4 */}
            <div className="relative px-6 py-10 sm:px-14 bg-black-3 z-1 rounded-xl">
              <h5 className="mb-4 text-xl font-bold text-center text-primary">
                PHẦN 4 <br />
                QUY ĐỊNH MIỄN TRỪ TRÁCH NHIỆM PHÁP LÝ CỦA NỀN TẢNG NANOREAL{' '}
              </h5>
              <ol className="list-lower-alpha">
                {RULE_LIST_PART_4.map((item, index) => (
                  <li key={`rule-${index}`} className="mb-2 text-justify">
                    <span className="text-white whitespace-pre-wrap ">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
            {/* ------------ */}
          </div>
        </Container>
      </div>
      <StarFall />
      <Footer />
    </div>
  );
};

export default QuyDinh;
