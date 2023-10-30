import assetsApi from 'api/assetsApi';
import Navbar from 'components/Layout/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LandCreateEditForm from './LandCreateEditForm';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import SpinnerLoading from 'components/SpinnerLoading';
import Container from 'components/Layout/Container/Container';
import withAuthAdmin from 'hoc/withAuthAdmin';

const LandCreateEdit = () => {
  const { id } = useParams();
  const [land, setLand] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const breadcrumb = [
    { name: 'Dự án', link: '/admin/lands' },
    id ? { name: land?.name, isActive: true } : { name: 'Tạo dự án', isActive: true },
  ];

  useEffect(() => {
    if (id) {
      (async () => {
        await setLoading(true);
        try {
          const res = await assetsApi.get({ id });
          setLand(res);
        } catch (e) {
          console.log(e);
        } finally {
          await setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <div className="pt-25 bg-black-2">
        <Container>
          <Breadcrumb breadcrumb={breadcrumb} />
        </Container>

        {isLoading ? (
          <Container className="text-center">
            <div className="py-8 rounded-lg bg-black-3">
              <SpinnerLoading className="h-8 mx-auto text-primary" />
            </div>
          </Container>
        ) : !land && id ? ( // in case edit land but no data found
          <Container className="text-center">
            <div className="py-8 rounded-lg bg-black-3">Không tìm thấy dữ liệu</div>
          </Container>
        ) : (
          <LandCreateEditForm land={land} />
        )}
      </div>
    </div>
  );
};

export default withAuthAdmin(LandCreateEdit);
