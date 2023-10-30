import { useHistory } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import { useState } from 'react';
import Products from './Components/Products';
import FinishedProducts from './Components/FinishedProducts';
import { useUserInvestmentProducts, useUserInvestmentProductsFinished } from '../../store/userInvestmentProduct/hooks';

const TABS = {
  all: 'all',
  finished: 'finished',
};

const InvestmentProducts = () => {
  const history = useHistory();
  const query = useQuery();
  const [tab, setTab] = useState(query.get('tab') || TABS.all);
  const { data: products, isDataLoaded: isDataLoadedProducts } = useUserInvestmentProducts();
  const { data: productsFinished, isDataLoaded: isDataLoadedProductsFinished } = useUserInvestmentProductsFinished();

  const handleChangeTab = (tabSelect) => {
    history.push(`/investment-products?tab=${tabSelect}`);
    setTab(tabSelect);
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h5 className="text-2xl font-bold lg:text-4xl">Sản phẩm đầu tư</h5>
      </div>
      <div className="divide-y bg-black-3 divide-black-2 rounded-xl">
        <div className="flex px-3 space-x-6 text-sm font-bold lg:px-10 lg:text-2xl sm:text-xl lg:space-x-14">
          <h5
            className={`py-6 border-b-4 ${tab === TABS.all ? 'border-primary' : 'border-transparent cursor-pointer'}`}
            onClick={() => {
              handleChangeTab(TABS.all);
            }}
          >
            Sản phẩm đầu tư
          </h5>
          <h5
            className={`cursor-pointer py-6 border-b-4 ${
              tab === TABS.finished ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => {
              handleChangeTab(TABS.finished);
            }}
          >
            Đã kết thúc
          </h5>
        </div>
        <div className="p-3 animate-fade-in lg:p-10">
          {tab === TABS.all && <Products data={products} isDataLoaded={isDataLoadedProducts} />}
          {tab === TABS.finished && (
            <FinishedProducts data={productsFinished} isDataLoaded={isDataLoadedProductsFinished} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentProducts;
