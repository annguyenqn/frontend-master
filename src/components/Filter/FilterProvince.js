import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SelectSearchable from 'components/SelectMenu/SelectSearchable';
import locationApi from 'api/locationApi';
import { FiCompass } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

export const SEARCH_PROVINCE = {
  apiKey: 'slug', // key to get api district
  queryKey: 'province', // query key to get api asset
};

const FilterProvince = ({ className }) => {
  const [options, setOptions] = useState([]);
  const history = useHistory();
  const [query, setQuery] = useState(new URLSearchParams(history?.location?.search));
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    history.listen((location) => {
      const queryURL = new URLSearchParams(location?.search);
      setQuery(queryURL);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await locationApi.getProvince();
        const updateOp = res?.data?.map((item) => ({
          ...item,
          label: item?.name,
          value: item?._id,
        }));
        await setOptions(updateOp);
        const province = query.get(SEARCH_PROVINCE.queryKey);
        if (province) {
          setSelected(updateOp?.find((item) => item?.[SEARCH_PROVINCE.apiKey] === province));
        }
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeSelect = (v) => {
    if (v) {
      query?.set(SEARCH_PROVINCE.queryKey, v?.[SEARCH_PROVINCE.apiKey]);
      setSelected(options?.find((item) => item?.[SEARCH_PROVINCE.apiKey] === v?.[SEARCH_PROVINCE.apiKey]));
    } else {
      query?.delete(SEARCH_PROVINCE.queryKey);
      setSelected(null);
    }
    history.push({
      search: query?.toString(),
    });
  };

  return (
    <SelectSearchable
      isClearable
      iconPrepend={<FiCompass className="mx-2 text-xl" />}
      options={options}
      placeholder="Toàn quốc"
      className={className}
      onChange={handleChangeSelect}
      selected={selected}
    />
  );
};

FilterProvince.propTypes = {
  className: PropTypes.string,
};

FilterProvince.defaultProps = {
  className: '',
};

export default FilterProvince;
