import React, { useState, useRef, useEffect } from 'react';
import Navbar from 'components/Layout/Navbar/Navbar';
import Table from 'components/Table/Table';
import SimpleCell from 'components/Table/TableCells/SimpleCell';
import NumberCell from 'components/Table/TableCells/NumberCell';
import coinApi from 'api/coinApi';
import { Link } from 'react-router-dom';
import ButtonRound from 'components/Button/ButtonRound';
import { FiPlus } from 'react-icons/fi';
import Container from 'components/Layout/Container/Container';
import withAuthAdmin from 'hoc/withAuthAdmin';

const TokenView = () => {
  const [coinData, setCoinData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const getDataApi = async () => {
    try {
      const res = await coinApi.get();
      await setCoinData(res);
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      await setLoading(false);
    }
  };
  useEffect(() => {
    getDataApi();
  }, [isLoading]);
  // const tableColumns = [
  //   {
  //     Headers: 'Tên Coin',
  //     Cell: ({ row }) => <SimpleCell className="text-center" data={row?.original?.nameCoin} />,
  //   },
  // ];
  const tableColumns = [
    {
      Header: 'Name Coin',
      Cell: ({ row }) => <SimpleCell className="text-center" data={row?.original?.nameCoin} />,
    },
    {
      Header: 'Total Coin',
      Cell: ({ row }) => <NumberCell className="text-center" data={row?.original?.totalCoin} />,
    },
  ];
  // console.log('data', coinData);
  return (
    <div className="flex flex-col gap-3 ">
      <Navbar />
      <h1>.</h1>
      <h1>.</h1>
      <h1>.</h1>
      <h1>.</h1>
      <div className="flex px-6 py-4">
        <Link to="/TokenViewTest/CoinCreateForm">
          <ButtonRound className="flex items-center py-2 font-bold leading-none uppercase transition-transform duration-300 transform border-none text-black-1 bg-primary hover:-translate-y-1">
            <FiPlus size={'1.1rem'} />
            <span>Tạo mới</span>
          </ButtonRound>
        </Link>
      </div>

      {coinData.length > 0 && tableColumns ? (
        <Table
          isLoading={isLoading}
          columns={tableColumns}
          data={coinData}
          headCellsClassName="bg-primary text-black-1 font-bold border border-black-1 uppercase"
          bodyCellsClassName="border-b border-black-3"
          tableClassName={''}
        />
      ) : (
        ''
      )}
      {/* {coinData.map((item) => {
          return (
            <>
              {item.nameCoin} {item.totalCoin}
            </>
          );
        })} */}
    </div>
  );
};
export default withAuthAdmin(TokenView);
