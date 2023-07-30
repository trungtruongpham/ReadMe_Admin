import { useEffect, useState } from "react";
import Option from "../../../types/options";
import axiosPrivateClient from "../../../utils/services/axios/axiosPrivateClient";
import Select from "../../../components/select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import JsonToFormData from "../../../utils/helpers/JsonToFormData";
import MultiSelect from "../../../components/multi-select";
import { ErrorMessage } from "@hookform/error-message";
import toast from "react-hot-toast";

interface BookFormMetadata {
  authors: Option[];
  categories: Option[];
}

export default function CreateBookForm() {
  const [bookFormMetadata, setBookFormMetadata] = useState<BookFormMetadata>({
    authors: [],
    categories: [],
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [fileUpload, setFileUpload] = useState<FileList>();

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
    data.category = categories;
    data.uploadImage = fileUpload;
    const formData = JsonToFormData(data);

    axiosPrivateClient
      .post("/book", formData, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=something",
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          if (res.status !== 200) {
            toast.error(
              "Create book failed! Please check again your data and try again."
            );
          }
        }

        toast.success("Create book successful!");
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Create book failed! Please check again your data.");
      });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  });

  useEffect(() => {
    axiosPrivateClient.get("/admin/book-form-metadata").then((res) => {
      if (res.status) {
        setBookFormMetadata(res.data);
      }
    });

    return () => {};
  }, [bookFormMetadata.authors.length, bookFormMetadata.categories.length]);

  const handleMultiSelectOnclick = (data: string[]) => {
    if (data.length > 0) {
      setCategories(data);
    }
  };

  return (
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Create Book Form
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
                  placeholder="Enter your book name"
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

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                AvgRating <span className="text-meta-1">*</span>
              </label>
              <input
                type="number"
                step={0.01}
                placeholder="Enter your average rating of book"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                {...register("avgRating", {
                  required: "Average rating is required.",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="avgRating"
                render={({ message }) => (
                  <p className=" p-2 text-danger">{message}</p>
                )}
              ></ErrorMessage>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                BuyLink <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your buy link of book"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                {...register("buyLink", { required: "Buy link is required." })}
              />
              <ErrorMessage
                errors={errors}
                name="buyLink"
                render={({ message }) => (
                  <p className=" p-2 text-danger">{message}</p>
                )}
              ></ErrorMessage>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Views
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

            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Description
              </label>
              <textarea
                rows={6}
                placeholder="Type your book description"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                {...register("description", {
                  required: "Description is required.",
                })}
              ></textarea>
              <ErrorMessage
                errors={errors}
                name="description"
                render={({ message }) => (
                  <p className=" p-2 text-danger">{message}</p>
                )}
              ></ErrorMessage>
            </div>

            <div className="mb-6">
              <Select
                options={bookFormMetadata.authors}
                title={"Author"}
                name="authors"
                register={register}
                errors={errors}
              ></Select>
            </div>

            <div className="mb-6">
              <MultiSelect
                options={bookFormMetadata.categories}
                title={"Category"}
                name="categories"
                register={register}
                errors={errors}
                handleMultiSelectClick={handleMultiSelectOnclick}
              ></MultiSelect>
            </div>

            <div className="mb-6">
              <label className="mb-3 block text-black dark:text-white">
                Attach image
              </label>
              <Controller
                control={control}
                name="uploadImage"
                rules={{ required: "Image is required." }}
                render={({ field: { value, onChange, ...field } }) => (
                  <>
                    <input
                      {...field}
                      type="file"
                      id="uploadImage"
                      value={value?.filename}
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        if (!e.currentTarget.files) return;
                        onChange(e.currentTarget.files[0]);
                        setFileUpload(e.currentTarget.files);
                      }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="uploadImage"
                      render={({ message }) => (
                        <p className=" p-2 text-danger">{message}</p>
                      )}
                    ></ErrorMessage>
                  </>
                )}
              />
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              type="submit"
            >
              Create New Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
