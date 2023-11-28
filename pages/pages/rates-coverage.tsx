import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState } from "react";
import { createColumnHelper, getCoreRowModel } from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { useGetListRateCoverage } from "@/query/useGetListRateCoverage";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import serverSideTranslations from "@/utils/serverSideTranslations";

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

const LayoutWrapper = dynamic(
  () => import("../../src/components/layout/LayoutWrapper"),
  { ssr: false }
);

const columnHelper = createColumnHelper<any>();

const Index = () => {
  const { t } = useTranslation();
  const { data } = useGetListRateCoverage();

  const regions = [
    { code: "All", title: t('ratesCoverage.all') },
    { code: "Americas", title: t('ratesCoverage.americas') },
    { code: "Africa", title: t('ratesCoverage.africa') },
    { code: "Europe", title: t('ratesCoverage.europe') },
    { code: "Asia Pacific", title: t('ratesCoverage.asiaPacific') },
    { code: "West Asia", title: t('ratesCoverage.westAsia') },
  ];

  const [selected, setSelected] = useState(regions[0].code);

  const dataFilter = React.useMemo(() => {
    const dataPackage = get(data, "data", []);
    return dataPackage.filter((item) => {
      if (selected === regions[0].code) {
        return item;
      } else {
        return item.code === selected;
      }
    });
  }, [data, selected]);

  const columns: any = [
    columnHelper.accessor("country", {
      header: () => "",
      cell: (info) => (
        <div className="text-lg font-semibold">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor("operator", {
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      header: () => (
        <div className="grid grid-rows-2">
          <div className="text-indigo-600 row-span-1 font-semibold text-xl">
            {t('ratesCoverage.operator')}
          </div>
        </div>
      ),
    }),
    // columnHelper.accessor("network_type", {
    //   header: () => (
    //     <div className="grid grid-rows-2">
    //       <div className="text-indigo-600 row-span-1 font-semibold text-xl">
    //         {t('ratesCoverage.networkType')}
    //       </div>
    //     </div>
    //   ),
    //   cell: (info) =>
    //     info.getValue() === "4G" ? (
    //       <div className="flex justify-center items-center gap-1">
    //         <div className="bg-yellow-300 p-1">
    //           <div>4G</div>
    //         </div>
    //         <div className="bg-gray-400 p-1">
    //           <div>3G</div>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="flex justify-center items-center  ">
    //         <div className="bg-gray-400 p-1">
    //           <div>{info.getValue()}</div>
    //         </div>
    //       </div>
    //     ),
    // }),
    columnHelper.accessor("data", {
      header: () => (
        <div className="grid grid-rows-2">
          <div className="text-indigo-600 row-span-1 font-semibold text-xl">
            {t('ratesCoverage.dataRate')}
          </div>
          <div className="text-indigo-600 row-span-1 font-light text-xs">
            ({t('ratesCoverage.rateForData')})
          </div>
        </div>
      ),
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    }),
    columnHelper.accessor("call", {
      header: () => (
        <div className="grid grid-rows-2">
          <div className="text-indigo-600 row-span-1 font-semibold text-xl">
            {t('ratesCoverage.callRate')}
          </div>
          <div className="text-indigo-600 row-span-1 font-light text-xs">
            ({t('ratesCoverage.rateForCall')})
          </div>
        </div>
      ),
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
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
        <title>Rate & Coverage - Xplori</title>
      </Head>
      <div className="container md:py-52 py-36">
        <div className="p-5 border-[0.5px] border-gray-200 rounded-lg shadow-xl overflow-scroll">
          <div className="font-bold leading-normal text-4xl lg:text-5xl mb-2 text-center">
            {t('ratesCoverage.title')}
          </div>
          <div className="grid lg:grid-cols-6 grid-cols-3 mt-3">
            {regions.map((re) => (
              <div
                  key={re.code}
                  onClick={() => setSelected(re.code)}
                  className={
                      "col-span-1 text-neutral-500 hover:border-b-red-500 py-2 border-b text-xl text-center hover:cursor-pointer " +
                      (selected === re.code ? "text-red-500 border-red-500 font-bold": "border-b-white font-semibold")
                  }>
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
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table?.getRowModel().rows.map((row, index) => (
                  <tr
                    className={index % 2 === 0 ? "bg-[#F5F5F5]" : ""}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
