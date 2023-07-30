import { ChangeEvent, useEffect, useState } from "react";
import axiosPrivateClient from "../../../utils/services/axios/axiosPrivateClient";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import toast from "react-hot-toast";

export default function CreateCategoryForm() {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfDeath, setDateOfDeath] = useState(new Date());

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
    data.dateOfBirth = dateOfBirth;
    data.dateOfDeath = dateOfDeath;
    console.log(data);

    axiosPrivateClient
      .post("/author", data, {
        headers: {
          "Content-Type": "application/json-patch+json",
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          toast.error(
            "Create author failed! Please check again your data and try again."
          );
        }

        toast.success("Create author successful!");
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Create author failed! Please check again your data.");
      });
  };

  const handleDateOfBirthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(new Date(event.target.value));
  };

  const handleDateOfDeathChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateOfDeath(new Date(event.target.value));
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  });

  return (
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Create Category Form
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
                  placeholder="Enter your author name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("name", {
                    required: "Author name is required.",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <p className="p-2 text-danger">{message}</p>
                  )}
                ></ErrorMessage>
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Nationality <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter author nationality"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                {...register("nationality", {
                  required: "Nationality is required.",
                })}
              />
              <ErrorMessage
                errors={errors}
                name="nationality"
                render={({ message }) => (
                  <p className=" p-2 text-danger">{message}</p>
                )}
              ></ErrorMessage>
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white w-full">
                Select DateOfBirth
              </label>
              <div className="relative">
                <input
                  type="date"
                  placeholder="dateOfBirth"
                  name="dateOfBirth"
                  id="author_dateOfBirth"
                  title="dateOfBirth"
                  onChange={(e) => handleDateOfBirthChange(e)}
                  className="rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white w-full">
                Select DateOfDeath
              </label>
              <div className="relative">
                <input
                  type="date"
                  placeholder="dateOfDeath"
                  name="dateOfDeath"
                  id="author_dateOfDeath"
                  title="dateOfDeath"
                  onChange={(e) => handleDateOfDeathChange(e)}
                  className="rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
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

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              type="submit"
            >
              Create New Author
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
