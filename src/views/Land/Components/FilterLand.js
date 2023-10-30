import FilterProvince from 'components/Filter/FilterProvince';
import FilterDistrict from 'components/Filter/FilterDistrict';
import InputSearchLandPage from './InputSearchLandPage';
import SelectMenuCategory from './SelectMenuCategory';
import SelectMenuStatus from './SelectMenuStatus';

const FilterLand = () => {
  return (
    <div className="absolute w-full max-w-screen-lg px-10 py-10 transform -translate-x-1/2 md:translate-y-2 bg-black-3-90% bottom-0 left-1/2 z-2">
      <div className="flex flex-col mb-5 md:flex-row">
        <SelectMenuCategory />
        <InputSearchLandPage />
      </div>
      <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row">
        <FilterProvince className="w-full md:w-56" />
        <FilterDistrict className="w-full md:w-56" />
        <SelectMenuStatus className="w-full md:w-56" />
      </div>
    </div>
  );
};

// FilterLand.propTypes = {

// };

export default FilterLand;
