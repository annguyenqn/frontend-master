import React, { useState, useRef, useEffect } from 'react';
import Navbar from 'components/Layout/Navbar/Navbar';
import Table from 'components/Table/Table';
import ActionCells from 'components/Table/TableCells/ActionCell';
import BadgeCell from 'components/Table/TableCells/BadgeCell';
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
  const tableColumns = [
    {
      Headers: 'Tên Coin',
      Cell: ({ row }) => <SimpleCell className="text-center" data={row?.original?.nameCoin} />,
    },
  ];
  return (
    <>
      <Navbar />
      {/* {coinData.map((item, index) => {
        return <>{item.nameCoin}</>;
      })} */}
      {/* <Table
        isLoading={isLoading}
        columns={tableColumns}
        data={coinData?.data}
        headCellsClassName="bg-primary text-black-1 font-bold border border-black-1 uppercase"
        bodyCellsClassName="border-b border-black-3"
        tableClassName={''}
        // pagination keys
        totalPage={coinData?.totalPage}
        currentPage={coinData?.currentPage}
        totalItems={coinData?.totalItems}
        onChangePage={handleChangePage}
      /> */}
    </>
  );
};
export default TokenView;
