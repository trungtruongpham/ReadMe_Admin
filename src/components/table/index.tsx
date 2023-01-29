import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import DynamicFormData from "../form";

export default function TableData() {
  const loaderData = useLoaderData() as any;
  type keys = keyof typeof loaderData.data.items[0];
  const headers = Object.keys(loaderData.data.items[0]).sort();
  const [isShowForm, setIsShowForm] = useState(false);

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
          <p>{Number(indexRow + 1)}</p>
        </td>
        {row}
      </tr>
    );
  };

  const renderBodyTable = loaderData.data.items.map((data: any, index: any) => {
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
    </div>
  );
}
