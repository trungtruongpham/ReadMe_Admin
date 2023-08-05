import { useEffect, useState } from "react";
import Option from "../../../types/options";
import axiosPrivateClient from "../../../utils/services/axios/axiosPrivateClient";
import Select from "../../../components/select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import toast from "react-hot-toast";

export default function CreateChapterForm() {
  const [bookMetadata, setBookMetadata] = useState<Option[]>([]);
  const [book, setBook] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState,
    formState: { isSubmitSuccessful, errors },
  } = useForm<any>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    

    axiosPrivateClient
      .post("/chapter", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          if (res.status !== 200) {
            toast.error(
              "Create chapter failed! Please check again your data and try again."
            );
          }
        }

        toast.success("Create chapter successful!");
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Create chapter failed! Please check again your data.");
      });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  });

  useEffect(() => {
    axiosPrivateClient.get("/admin/book-metadata").then((res) => {
      if (res.status) {
        setBookMetadata(res.data);
      }
    });

    return () => {};
  }, [bookMetadata.length]);

  return (
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Create Chapter Form
          </h3>
        </div>
        <form
          action="post"
          onSubmit={handleSubmit(onSubmit)}
          className={""}
          encType="multipart/form-data"
        >
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your chapter name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("name", { required: "Book name is required." })}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <p className=" p-2 text-danger">{message}</p>
                  )}
                ></ErrorMessage>
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Content
              </label>
              <textarea
                rows={6}
                placeholder="Type your chapter content"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                {...register("content", {
                  required: "Content is required.",
                })}
              ></textarea>
              <ErrorMessage
                errors={errors}
                name="content"
                render={({ message }) => (
                  <p className=" p-2 text-danger">{message}</p>
                )}
              ></ErrorMessage>
            </div>

            <div className="mb-6">
              <Select
                options={bookMetadata}
                title={"Book"}
                name="bookId"
                register={register}
                errors={errors}
              ></Select>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Display Order
              </label>
              <input
                type="number"
                placeholder="Type views"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                {...register("views", { required: "Views is required." })}
              />
              <ErrorMessage
                errors={errors}
                name="views"
                render={({ message }) => (
                  <p className=" p-2 text-danger">{message}</p>
                )}
              ></ErrorMessage>
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              type="submit"
            >
              Create New Chapter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
