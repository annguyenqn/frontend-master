import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SelectSearchable from 'components/SelectMenu/SelectSearchable';
import locationApi from 'api/locationApi';
import { useHistory } from 'react-router-dom';
import { SEARCH_PROVINCE } from './FilterProvince';

const SEARCH_DISTRICT = {
  apiKey: 'slug', // key to get api district
  queryKey: 'district', // query key at URL
};

const FilterDistrict = ({ className }) => {
  const [options, setOptions] = useState([]);
  const history = useHistory();
  const [query, setQuery] = useState(new URLSearchParams(history?.location?.search));
  const [selected, setSelected] = useState(null);
  const [province, setProvince] = useState(null);

  useEffect(() => {
    history.listen((location) => {
      const urlParams = new URLSearchParams(location.search);
      setQuery(urlParams);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const provinceSlug = query.get(SEARCH_PROVINCE?.queryKey);
    if (provinceSlug && province !== provinceSlug) {
      setProvince(provinceSlug);
      (async () => {
        try {
          const res = await locationApi.getDistrict({ provinceSlug });
          const updateOp = res?.data?.map((item) => ({
            ...item,
            label: item?.name,
            value: item?._id,
          }));
          await setOptions(updateOp);
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      const district = query.get(SEARCH_DISTRICT.queryKey);
      if (district) {
        setSelected(options.find((item) => item?.[SEARCH_DISTRICT.apiKey] === district));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, options]);

  const handleChangeSelect = (v) => {
    setSelected(v);
    if (v) {
      query.set(SEARCH_DISTRICT.queryKey, v?.[SEARCH_DISTRICT.apiKey]);
      setSelected(options?.find((item) => item?.[SEARCH_DISTRICT.apiKey] === v?.[SEARCH_DISTRICT.apiKey]));
    } else {
      query.delete(SEARCH_DISTRICT.queryKey);
      setSelected(null);
    }
    history.push({
      search: query.toString(),
    });
  };

  return (
    <SelectSearchable
      isClearable
      options={options}
      placeholder="Tất cả Quận Huyện"
      className={className}
      onChange={handleChangeSelect}
      selected={selected}
    />
  );
};

FilterDistrict.propTypes = {
  className: PropTypes.string,
};

FilterDistrict.defaultProps = {
  className: '',
};

export default FilterDistrict;
