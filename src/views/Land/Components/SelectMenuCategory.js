import DisclosurePopover from 'components/Popover/DisclosurePopover';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import categoryApi from 'api/categoryApi';

export const SEARCH_TYPE = {
  apiKey: 'value', // key to get api district
  queryKey: 'category', // query URL
};

const SelectMenuCategory = () => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const history = useHistory();
  const [query, setQuery] = useState(new URLSearchParams(history?.location?.search));

  useEffect(() => {
    // -------------
    // tracking query URL change
    history.listen((location) => {
      const queryURL = new URLSearchParams(location?.search);
      setQuery(queryURL);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // --------------
    // set default value
    (async () => {
      try {
        const res = await categoryApi.get();
        console.log(res)
        const updateRes = res?.map((item) =>
          item?.subCategories?.length > 0
            ? {
                ...item,
                label: item?.name,
                value: item?.slug,
                children: item?.subCategories?.map((child) => ({
                  ...child,
                  label: child?.name,
                  value: child?.slug,
                })),
              }
            : {
                ...item,
                label: item?.name,
                value: item?.slug,
              },
        );
        await updateRes.unshift({
          label: 'Tất cả bất động sản',
          value: '',
        });
        await setOptions(updateRes);

        const typeQuery = query?.get(SEARCH_TYPE.queryKey);
        if (typeQuery) {
          setSelected(() => {
            let result = null;
            updateRes?.forEach((item) => {
              if (item.children) {
                const updateValue = item?.children?.find((child) => child?.[SEARCH_TYPE.apiKey] === typeQuery);
                result = updateValue || result;
              } else if (item?.[SEARCH_TYPE.apiKey] === typeQuery) {
                result = item;
              }
            });
            return result;
          });
        } else {
          setSelected(updateRes[0]);
        }
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (selected) => {
    setSelected(selected);
    if (selected[SEARCH_TYPE.apiKey]) {
      query.set(SEARCH_TYPE.queryKey, selected?.[SEARCH_TYPE.apiKey]);
    } else {
      query.delete(SEARCH_TYPE.queryKey);
    }
    history.push({
      search: query.toString(),
    });
  };

  return (
    <DisclosurePopover
      classNameButton="rounded-l-lg  whitespace-nowrap flex items-center"
      iconPrepend={<FiHome className="mr-2 text-xl" />}
      panelArray={options}
      selected={selected}
      onChange={handleChange}
    />
  );
};

export default SelectMenuCategory;
