import SelectMenuProjectStatus from 'components/SelectMenu/SelectMenuProjectStatus';
import { ASSET_STATUS_FILTER } from 'constants/config';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCircle } from 'react-icons/fi';

const SelectMenuStatus = ({ className }) => {
  const history = useHistory();
  const [query, setQuery] = useState(new URLSearchParams(history?.location?.search));
  const [menuStatus, setMenuStatus] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const assetOption = ASSET_STATUS_FILTER();
    setMenuStatus(assetOption);
    const statusQuery = query?.get('status');

    if (statusQuery) {
      setValue(assetOption.find((item) => item.value === statusQuery));
    } else {
      setValue(assetOption[0]);
    }

    history.listen((location) => {
      const queryURL = new URLSearchParams(location?.search);
      setQuery(queryURL);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeStatus = (data) => {
    if (data?.value) {
      query.set('status', data?.value);
    } else {
      query.delete('status');
    }
    history.push({
      search: query.toString(),
    });
  };

  return (
    <SelectMenuProjectStatus
      className={className}
      iconAppend
      iconPrepend={<FiCircle className="text-xl " />}
      classNameButton="flex items-center"
      menuList={menuStatus}
      onChange={handleChangeStatus}
      value={value}
    />
  );
};

SelectMenuStatus.propTypes = {
  className: PropTypes.string,
};

SelectMenuStatus.defaultProps = {
  className: '',
};

export default SelectMenuStatus;
