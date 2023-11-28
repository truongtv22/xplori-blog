import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useState } from 'react';
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { useTranslation } from 'next-i18next';
import serverSideTranslations from '@/utils/serverSideTranslations';
import { regions, REGION, data } from '@/data/data';

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const LayoutWrapper = dynamic(
  () => import('../../src/components/layout/LayoutWrapper'),
  { ssr: false },
);

const columnHelper = createColumnHelper<any>();

const Index = () => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState(REGION.APAC);

  const dataFilter = React.useMemo(() => {
    return data.filter((item) => item.region === selected);
  }, [data, selected]);

  const columns: any = [
    columnHelper.accessor('number', {
      header: () => (
        <div className="grid grid-rows-2">
          <div className="text-indigo-600 row-span-1 font-semibold text-xl text-left">
            STT
          </div>
        </div>
      ),
      cell: (info) => (
        <div className="text-lg font-semibold">{info.row.index + 1}</div>
      ),
    }),
    columnHelper.accessor('country', {
      header: () => (
        <div className="grid grid-rows-2">
          <div className="text-indigo-600 row-span-1 font-semibold text-xl">
            Quốc gia/Khu vực
          </div>
        </div>
      ),
      cell: (info) => (
        <div className="text-lg font-semibold text-center">{info.getValue()}</div>
      ),
    }),
  ];

  const table = useReactTable({
    data: dataFilter,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Head>
        <title>Lọc theo gói - Xplori</title>
      </Head>
      <div className="container md:py-52 py-36">
        <div className="p-5 border-[0.5px] border-gray-200 rounded-lg shadow-xl overflow-scroll">
          <div className="font-bold leading-normal text-4xl lg:text-5xl mb-2 text-center">
            Lọc theo gói
          </div>
          <div className="grid lg:grid-cols-6 grid-cols-3 mt-3">
            {regions.map((re) => (
              <div
                key={re.region}
                onClick={() => setSelected(re.region)}
                className={
                  'col-span-1 text-neutral-500 hover:border-b-red-500 py-2 border-b text-xl text-center hover:cursor-pointer ' +
                  (selected === re.region
                    ? 'text-red-500 border-red-500 font-bold'
                    : 'border-b-white font-semibold')
                }
              >
                {re.title}
              </div>
            ))}
          </div>
          <div className="mt-10">
            <table className="w-full table-auto">
              <thead>
                {table?.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table?.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? 'bg-[#F5F5F5]' : ''}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

Index.layout = LayoutWrapper;
export default Index;
