import React, { useState, useRef, useEffect } from 'react';
import Navbar from 'components/Layout/Navbar/Navbar';
import Table from 'components/Table/Table';
import SimpleCell from 'components/Table/TableCells/SimpleCell';
import NumberCell from 'components/Table/TableCells/NumberCell';
import coinApi from 'api/coinApi';
const TokenView = () => {
  const [coinData, setCoinData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const getDataApi = async () => {
    try {
      const res = await coinApi.get();
      await setCoinData(res);
      // console.log(coinData);
    } catch (e) {
      console.log(e);
    } finally {
      await setLoading(false);
    }
  };
  useEffect(() => {
    if (isLoading) {
      getDataApi();
    }
  });
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
  return (
    <>
      <div className="flex flex-col gap-3 ">
        <Navbar />
        <h1>.</h1>
        <h1>.</h1>
        <h1>.</h1>
        <h1>.</h1>
        <Table
          isLoading={isLoading}
          columns={tableColumns}
          data={coinData?.data}
          headCellsClassName="bg-primary text-black-1 font-bold border border-black-1 uppercase"
          bodyCellsClassName="border-b border-black-3"
          tableClassName={''}
        />
        {/* {coinData.map((item) => {
          return (
            <>
              {item.nameCoin} {item.totalCoin}
            </>
          );
        })} */}
      </div>
    </>
  );
};
export default TokenView;
