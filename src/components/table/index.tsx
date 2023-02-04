import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import axiosPublicClient from "../../utils/services/axiosPublicClient";
import DynamicFormData from "../form";

export default function TableData() {
  const loaderData = useLoaderData() as any;
  type keys = keyof typeof loaderData.data.items[0];
  const headers = Object.keys(loaderData.data.items[0]).sort();
  const [isShowForm, setIsShowForm] = useState(false);
  const { entity } = useParams();
  const [data, setData] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(
    loaderData.data.pageNumber
  );

  useEffect(() => {
    axiosPublicClient
      .get(`/${entity}/?pageNumber=${currentPage}&pageSize=5`)
      .then((res) => {
        setData(res.data);
      });
  }, [currentPage]);

  const renderHeaderTable = headers.map((header, index) => {
    return (
      <th
        className={
          "w-full border-r border-cyan-900 last:border-0 text-center max-w-1/" +
          Number(headers.length + 1)
        }
        key={index}
        colSpan={1}
      >
        {header.toUpperCase()}
      </th>
    );
  });

  const renderRowTable = (data: any, indexRow: any) => {
    const row = headers.map((header, index) => {
      return (
        <>
          <td
            className={
              "flex p-4 max-h-[200px] border-r border-cyan-900 last:border-0 overflow-hidden text-ellipsis justify-center text-center w-full items-center max-w-1/" +
              Number(headers.length + 1)
            }
            key={index}
          >
            <p className="items-center">{data[header as keys]}</p>
          </td>
        </>
      );
    });

    return (
      <tr
        className="flex gap-4 w-full border-b border-cyan-900 last:border-0"
        key={indexRow}
      >
        <td
          className={
            "flex p-4 overflow-hidden border-r border-cyan-900 text-ellipsis justify-center text-center w-full items-center max-w-1/" +
            Number(headers.length + 1)
          }
        >
          <p>{Number(indexRow + 1 + (currentPage - 1) * 5)}</p>
        </td>
        {row}
      </tr>
    );
  };

  const renderBodyTable =
    data !== undefined &&
    data.items.map((data: any, index: any) => {
      return renderRowTable(data, index);
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="space-x-4">
        <input
          type="text"
          className="border p-2 rounded-xl focus:outline-none"
          name="name"
          id="data-name"
          placeholder="Name"
        />
        <button
          className="border p-2 rounded-xl bg-slate-500"
          onClick={() => setIsShowForm(!isShowForm)}
        >
          Add new data
        </button>
      </div>
      {isShowForm && <DynamicFormData props={loaderData}></DynamicFormData>}
      <table
        id="data-grid"
        className="border border-cyan-700 border-separate rounded-xl"
      >
        <thead>
          <tr className={"flex gap-4 w-full border-b border-cyan-900 py-2"}>
            <th
              className={
                "w-full text-center border-r border-cyan-900 last:border-0 max-w-1/" +
                Number(headers.length + 1)
              }
              colSpan={1}
            >
              Index
            </th>
            {renderHeaderTable}
          </tr>
        </thead>
        <tbody className="w-full">{renderBodyTable}</tbody>
      </table>
      <div className="flex flex-row-reverse w-full gap-4">
        {data !== undefined && (
          <div className="pt-2">
            <p>Total items: {data.totalCount}</p>
          </div>
        )}
        <div className=" flex gap-4 p-2 border rounded">
          <button
            className="border border-cyan-900 rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <p>{currentPage}</p>
          <button
            className="border border-cyan-900 rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={data != undefined && currentPage == data.totalPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
