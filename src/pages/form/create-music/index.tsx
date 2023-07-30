import { ChangeEvent, useEffect, useState } from "react";
import axiosPrivateClient from "../../../utils/services/axios/axiosPrivateClient";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import toast from "react-hot-toast";
import JsonToFormData from "../../../utils/helpers/JsonToFormData";

export default function CreateMusicForm() {
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
    data.file = fileUpload;
    JsonToFormData(data);
    console.log(data);

    axiosPrivateClient
      .post("/music", data, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=something",
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          toast.error("Create music failed! Please check again your data and try again.");
        }

        toast.success("Create music successful!");
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Create music failed! Please check again your data.");
      });
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
            Create Music Form
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
                  placeholder="Enter your music name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  {...register("name", {
                    required: "Music name is required.",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => <p className=" p-2 text-danger">{message}</p>}
                ></ErrorMessage>
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-3 block text-black dark:text-white">
                Attach music fileUpload
              </label>
              <Controller
                control={control}
                name="uploadMusic"
                rules={{ required: "File is required." }}
                render={({ field: { value, onChange, ...field } }) => (
                  <>
                    <input
                      {...field}
                      type="file"
                      id="uploadMusic"
                      value={value?.filename}
                      accept="audio/mp3,audio/*;capture=microphone"
                      onChange={(e) => {
                        if (!e.currentTarget.files) return;
                        onChange(e.currentTarget.files[0]);
                        setFileUpload(e.currentTarget.files);
                      }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="uploadImage"
                      render={({ message }) => <p className=" p-2 text-danger">{message}</p>}
                    ></ErrorMessage>
                  </>
                )}
              />
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
              type="submit"
            >
              Upload New Music
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
