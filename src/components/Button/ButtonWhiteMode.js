import Switch from 'components/Switch/Switch';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { VIEW_MODE } from 'utils/storage';

const ButtonWhiteMode = () => {
  const viewMode = VIEW_MODE.get();
  const [state, setState] = useState(viewMode === '');

  useEffect(() => {
    setTimeout(() => {
      if (state) {
        VIEW_MODE.delete();
        document.documentElement.classList.remove('dark');
      } else {
        VIEW_MODE.set('dark');
        document.documentElement.classList.add('dark');
      }
    }, 300);
  }, [state]);

  return (
    <div className="flex flex-col items-center">
      <Switch
        checked={state}
        onChange={() => {
          setState(!state);
        }}
        className=""
        id="whiteModeBtn"
      />
      <label
        htmlFor={'whiteModeBtn'}
        className="flex items-center my-1 space-x-2 font-medium leading-none dark:text-black"
      >
        <FiSun /> <span>/</span> <FiMoon />
      </label>
    </div>
  );
};

export default ButtonWhiteMode;
