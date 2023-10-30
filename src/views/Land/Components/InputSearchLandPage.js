import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const InputSearchLandPage = () => {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const [query, setQuery] = useState(new URLSearchParams(history?.location?.search));

  const handleSearch = () => {
    if (search) {
      query.set('textSearch', search);
    } else {
      query.delete('textSearch');
    }
    history.push({
      search: query.toString(),
    });
  };

  const handleChangeInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    setSearch(query?.get('textSearch'));
    history.listen((location) => {
      const queryURL = new URLSearchParams(location?.search);
      setQuery(queryURL);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full mt-4 md:mt-0">
      <input
        className="flex-auto pl-3 bg-transparent border-t border-b border-l rounded-l-lg md:border-l-0 md:rounded-l-none focus:bg-black focus:outline-none "
        placeholder="Tìm kiếm địa điểm, khu vực ..."
        value={search}
        onChange={handleChangeInputSearch}
        onKeyDown={handleKeyDown}
      />
      <button
        className="px-4 py-2 border rounded-r-lg md:p-0 md:w-40 hover:border-primary hover:text-primary"
        onClick={handleSearch}
      >
        <span className="hidden md:inline">Search </span>
        <FiSearch className="inline text-2xl md:hidden" />
      </button>
    </div>
  );
};

InputSearchLandPage.propTypes = {};

export default InputSearchLandPage;
