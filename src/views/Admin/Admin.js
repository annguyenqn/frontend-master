import classNames from 'classnames';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import Container from 'components/Layout/Container/Container';
import Navbar from 'components/Layout/Navbar/Navbar';
import withAuthAdmin from 'hoc/withAuthAdmin';
import { Link } from 'react-router-dom';

const MENU_LIST = [
  {
    id: 'land',
    width: 'w-full sm:w-1/2',
    title: { name: 'Dự án', link: '/admin/lands' },
    children: [{ id: 'create', name: 'Tạo mới', link: '/admin/lands/create' }],
  },
  {
    id: 'user',
    width: 'w-full sm:w-1/2',
    title: { name: 'Người dùng', link: '/admin/users' },
    // children: [{ id: 'create', name: 'Tạo mới', link: '' }],
  },
  {
    id: 'report',
    width: 'w-full sm:w-1/2',
    title: { name: 'Báo cáo', link: '/admin/report/payment-history' },
    children: [{ id: 'payment-history', name: 'Lịch sử thanh toán', link: '/admin/report/payment-history' }],
  },
  {
    id: 'refund',
    width: 'w-full sm:w-1/2',
    title: { name: 'Hoàn tiền', link: '/admin/refund' },
    children: [{ id: 'expired-asset', name: 'Dự án hết hạn', link: '/admin/refund/expired-asset' }],
  },
  // {
  //   id: 'settingConfig',
  //   width: 'w-full',
  //   title: { name: 'Tùy chỉnh', link: '' },
  //   children: [
  //     { id: 'setting', name: 'Hệ thống', link: '' },
  //     { id: 'config', name: 'Chức năng', link: '' },
  //   ],
  // },
];

const Admin = () => {
  return (
    <div>
      <Navbar />
      <div className={classNames('min-h-screen break leading dark:text-black-1 bg-black-2 pt-25', 'dark:bg-white-2')}>
        <Container>
          <Breadcrumb />
          <div className="flex flex-col lg:flex-row">
            {/*  */}
            {/* Menu - Left Col */}
            <div className="flex-1">
              <div className="flex flex-wrap">
                {MENU_LIST.map((item) => (
                  <div key={item?.id} className={`flex p-4 ${item?.width}`}>
                    <div
                      className={classNames(
                        'w-full p-4 transition duration-300 transform rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 bg-black-3',
                        'dark:bg-white',
                      )}
                    >
                      {item?.title?.link ? (
                        <Link to={item?.title?.link}>
                          <h5 className="text-2xl font-bold hover:text-primary">{item?.title?.name}</h5>
                        </Link>
                      ) : (
                        <h5 className="text-2xl font-bold">{item?.title?.name}</h5>
                      )}
                      <div className="mt-2 space-x-4">
                        {item?.children?.map((i) =>
                          i?.link ? (
                            <Link key={i?.id} to={i?.link}>
                              <span className="hover:text-primary hover:underline">{i?.name}</span>
                            </Link>
                          ) : (
                            <span key={i?.id}>{i?.name}</span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Logo */}
            <div className="flex-1 p-4">
              <div className={classNames('w-full h-full p-10 rounded-lg shadow-2xl bg-black-3', 'dark:bg-white')}>
                <img
                  className="object-cover h-full px-20 py-10 mx-auto rounded-lg dark:bg-black-3"
                  src="/images/logo/logo-dashboard.png"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default withAuthAdmin(Admin);
