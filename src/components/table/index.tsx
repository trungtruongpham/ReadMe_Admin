import {useEffect, useState} from "react";
import {useLoaderData, useParams} from "react-router-dom";
import axiosPrivateClient from "../../utils/services/axios/axiosPrivateClient";
import DynamicFormData from "../form";
import toast from "react-hot-toast";

export default function TableData() {
    const loaderData = useLoaderData() as any;
    const {entity} = useParams();
    const [isShowForm, setIsShowForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [formData, setFormData] = useState(loaderData.data.items[0]);
    const [updateDataIndex, setUpdateDataIndex] = useState(0);
    const [data, setData] = useState<any>();
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(
        loaderData.data.pageNumber
    );

    console.log(loaderData);

    const [headers, setHeaders] = useState(
        loaderData.data.items.length === 0
            ? []
            : Object.keys(loaderData.data.items[0]).sort()
    );

    type keys = keyof (typeof loaderData.data.items)[0];

    useEffect(() => {
        axiosPrivateClient
            .get(
                `/${entity}/search?IsFromClient=false&name=${searchValue}&pageNumber=${currentPage}&pageSize=5`
            )
            .then((res) => {
                setData(res.data);
                setHeaders(Object.keys(res.data.items[0]).sort());
            });
    }, [currentPage, searchValue]);

    const handleSearchValueChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchValue(event.target.value);
        setIsUpdate(true);
    };

    const handleUpdateClick = (index: number) => {
        setUpdateDataIndex(index);
        if (!isShowForm) {
            setFormData(
                searchValue === "" ? loaderData.data.items[index] : data.items[index]
            );
            setIsUpdate(true);
        }

        setIsShowForm(!isShowForm);
    };

    const handleAddData = () => {
        setIsShowForm(!isShowForm);
        setIsUpdate(false);
    };

    const handleDeleteData = (id: string) => {
        axiosPrivateClient
            .delete("/" + entity + "/" + id, {
                headers: {
                    "Content-Type": "text/plain",
                },
            })
            .then((res) => {
                if (res.status !== 200) {
                }

                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data);
            });
    };

    const renderHeaderTable = headers.map((header, index) => {
        return (
            <th
                className={
                    "w-full border-r border-cyan-900 last:border-0 text-center max-w-1/" +
                    Number(headers.length + 2)
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
                            "flex p-4 max-h-[300px] border-r border-cyan-900 last:border-0 overflow-x-auto overflow-y-hidden text-ellipsis justify-center text-center w-full items-center max-w-1/" +
                            Number(headers.length + 2)
                        }
                        key={index}
                    >
            <span className="items-center text-ellipsis max-h-100">
              {data[header as keys]}
            </span>
                    </td>
                </>
            );
        });

        return (
            <tr
                className="flex w-full border-b border-cyan-900 last:border-0"
                key={indexRow}
            >
                <td
                    className={
                        "flex p-4 overflow-hidden border-r border-cyan-900 text-ellipsis justify-center text-center w-full items-center max-w-1/" +
                        Number(headers.length + 2)
                    }
                >
                    <p>{Number(indexRow + 1 + (currentPage - 1) * 5)}</p>
                </td>
                {row}
                <td
                    className={
                        "flex flex-col gap-2 p-4 m-auto overflow-hidden text-ellipsis justify-center text-center w-full items-center max-w-1/" +
                        Number(headers.length + 2)
                    }
                >
                    <button
                        className="min-w-[100px] p-2 bg-warning rounded font-semibold text-white"
                        onClick={() => handleUpdateClick(indexRow)}
                    >
                        Update
                    </button>
                    <button
                        className="min-w-[100px] p-2 bg-danger rounded font-semibold text-white"
                        onClick={() => handleDeleteData(data.id)}
                    >
                        Delete
                    </button>
                </td>
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
                    value={searchValue}
                    onChange={handleSearchValueChange}
                />
                <button
                    className="border p-2 rounded-xl bg-slate-500"
                    onClick={handleAddData}
                >
                    Add new data
                </button>
            </div>
            {isShowForm && (
                <DynamicFormData
                    data={formData}
                    updateIndex={updateDataIndex}
                    isUpdate={isUpdate}
                ></DynamicFormData>
            )}

            {loaderData.status !== 200 && <p>There is no data to show.</p>}

            <table
                id="data-grid"
                className="border border-cyan-700 border-separate rounded-xl"
            >
                <thead>
                <tr className={"flex w-full border-b border-cyan-900 py-2"}>
                    <th
                        className={
                            "w-full text-center border-r border-cyan-900 last:border-0 max-w-1/" +
                            Number(headers.length + 2)
                        }
                        colSpan={1}
                    >
                        Index
                    </th>
                    {renderHeaderTable}
                    <th
                        className={
                            "w-full text-center border-r border-cyan-900 last:border-0 max-w-1/" +
                            Number(headers.length + 2)
                        }
                        colSpan={1}
                    >
                        Action
                    </th>
                </tr>
                </thead>
                <tbody className="w-full">{renderBodyTable}</tbody>
            </table>
            <div className="flex flex-row-reverse w-full gap-4 content-center items-center">
                {data !== undefined && (
                    <div className="">
                        <p>Total items: {data.totalCount}</p>
                    </div>
                )}
                <div className="flex gap-4 p-2 m-4 border rounded">
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
                        disabled={data !== undefined && currentPage === data.totalPages}
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
