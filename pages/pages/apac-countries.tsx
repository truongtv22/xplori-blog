import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { useTranslation } from 'next-i18next';
import serverSideTranslations from '@/utils/serverSideTranslations';

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

export const dataQuadsell = [
  {
    country: 'Australia',
    operator: 'Optus',
  },
  {
    country: 'Cambodia',
    operator: 'Metfone',
  },
  {
    country: 'China',
    operator: 'China Unicom',
  },
  {
    country: 'Hong Kong',
    operator: '3HK',
  },
  {
    country: 'Indonesia',
    operator: 'Indosat',
  },
  {
    country: 'Japan',
    operator: 'Softbank',
  },
  {
    country: 'Korea',
    operator: 'SK Telecom',
  },
  {
    country: 'Laos',
    operator: 'Star Telecom',
  },
  {
    country: 'Macau',
    operator: 'CTM',
  },
  {
    country: 'Malaysia',
    operator: 'DiGi',
  },
  {
    country: 'Myanmar',
    operator: 'Telenor',
  },
  {
    country: 'New Zealand',
    operator: '2Degrees',
  },
  {
    country: 'Philippines',
    operator: 'Globe',
  },
  {
    country: 'Singapore',
    operator: 'Starhub',
  },
  {
    country: 'Taiwan',
    operator: 'Taiwan Star',
  },
  {
    country: 'Thailand',
    operator: 'DTAC',
  },
  {
    country: 'Vietnam',
    operator: 'Viettel',
  },
];

const columnHelper = createColumnHelper<any>();

const Index = () => {
  const { t } = useTranslation();

  const columns: any = [
    columnHelper.accessor('country', {
      header: () => (
        <div className="grid grid-rows-2">
          <div className="text-indigo-600 row-span-1 font-semibold text-xl text-left">
            Quốc gia/Khu vực
          </div>
        </div>
      ),
      cell: (info) => (
        <div className="text-lg font-semibold">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('operator', {
      header: () => (
        <div className="grid grid-rows-2">
          <div className="text-indigo-600 row-span-1 font-semibold text-xl">
            {t('ratesCoverage.operator')}
          </div>
        </div>
      ),
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    }),
  ];

  const table = useReactTable({
    data: dataQuadsell,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Head>
        <title>Châu Á & Thái Bình Dương - Xplori</title>
      </Head>
      <div className="container md:py-52 py-36">
        <div className="p-5 border-[0.5px] border-gray-200 rounded-lg shadow-xl overflow-scroll">
          <div className="font-bold leading-normal text-4xl lg:text-5xl mb-2 text-center">
            {t('ratesCoverage.asiaPacific')}
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
