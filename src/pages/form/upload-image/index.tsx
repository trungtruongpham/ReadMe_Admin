import { useEffect, useState } from "react";
import axiosPrivateClient from "../../../utils/services/axios/axiosPrivateClient";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import toast from "react-hot-toast";
import JsonToFormData from "../../../utils/helpers/JsonToFormData";

export default function UploadImageForm() {
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
    data.image = fileUpload;
    data.isBanner = true;
    const formData = JsonToFormData(data);
    console.log(data);

    axiosPrivateClient
      .post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=something",
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          toast.error(
            "Create image failed! Please check again your data and try again."
          );
        }

        toast.success("Create image successful!");
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Create image failed! Please check again your data.");
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
            Upload Image Form
          </h3>
        </div>
        <form
          action="post"
          onSubmit={handleSubmit(onSubmit)}
          className={""}
          encType="multipart/form-data"
        >
          <div className="p-6.5">
            <div className="mb-6">
              <label className="mb-3 block text-black dark:text-white">
                Attach image banner
              </label>
              <Controller
                control={control}
                name="image"
                rules={{ required: "File is required." }}
                render={({ field: { value, onChange, ...field } }) => (
                  <>
                    <input
                      {...field}
                      type="file"
                      id="image"
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
                      name="image"
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
              Upload New Banner Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
