import { maxHeaderSize } from "http";
import { useLoaderData } from "react-router-dom";

export default function TableData() {
  const loaderData = useLoaderData() as any;
  console.log(loaderData);
  console.log(loaderData.data.items);
  type keys = keyof typeof loaderData.data.items[0];
  const headers = Object.keys(loaderData.data.items[0]).sort();

  const renderHeaderTable = headers.map((header, index) => {
    return (
      <th className={"w-full max-w-1/" + headers.length} key={index} colSpan={1}>
        {header.toUpperCase()}
      </th>
    );
  });

  const renderRowTable = (data: any, indexRow: any) => {
    const row = headers.map((header, index) => {
      return (
        <td
          className={"p-4 overflow-hidden text-ellipsis line-clamp-2 text-center w-full max-w-1/" + headers.length}
          key={index}
        >
          {data[header as keys]}
        </td>
      );
    });

    return (
      <tr className="flex w-full" key={indexRow}>
        {row}
      </tr>
    );
  };

  const renderBodyTable = loaderData.data.items.map((data: any, index: any) => {
    return renderRowTable(data, index);
  });
  return (
    <>
      <thead>
        <tr className={"flex gap-4 w-full"}>{renderHeaderTable}</tr>
      </thead>
      <tbody className="w-full">{renderBodyTable}</tbody>
    </>
  );
}
