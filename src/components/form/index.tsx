import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import axiosPrivateClient from "../../utils/services/axios/axiosPrivateClient";
import JsonToFormData from "../../utils/helpers/JsonToFormData";
import { log } from "console";

interface FormDataTrops {
  data: any;
  updateIndex: number;
  isUpdate: boolean;
}

export default function DynamicFormData(props: FormDataTrops) {
  const headers = Object.keys(props.data).sort();
  const location = useLocation();
  var entity = location.pathname.split("/")[3];

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<any>({
    defaultValues: props.isUpdate ? props.data : {},
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    
    const formData = JsonToFormData(data);

    if (props.isUpdate) {
      axiosPrivateClient
        .put("/" + entity, formData, {
          headers: {
            "Content-Type":
              entity === "book"
                ? "multipart/form-data; boundary=something"
                : "application/json",
          },
        })
        .then((res) => {
          if (res.status !== 200) {
          }

          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosPrivateClient
        .post("/" + entity, formData, {
          headers: {
            "Content-Type":
              entity === "book"
                ? "multipart/form-data; boundary=something"
                : "application/json",
          },
        })
        .then((res) => {
          if (res.status !== 200) {
          }

          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  });
  
  const inputForm = headers.map((header, index) => {
    return (
      <div className="flex space-x-2 w-full" key={index}>
        <label
          className="font-mono p-2 text-xl min-w-[150px]"
          htmlFor={"input_" + header}
        >
          {header.toUpperCase()}
        </label>
        <input
          type="text"
          id={"input_" + header}
          placeholder={"Insert " + header}
          {...register(header)}
          className="w-full p-2 border border-cyan-700 focus:outline-none rounded"
        />
      </div>
    );
  });

  return (
    <>
      <form
        action="post"
        onSubmit={handleSubmit(onSubmit)}
        className={
          "grid p-4 border border-cyan-800 rounded-xl gap-4 grid-rows-" +
          headers.length
        }
      >
        {inputForm}

        {entity === "book" && (
          <div className="flex space-x-2 w-full">
            <label
              className="font-mono p-2 text-xl min-w-[150px]"
              htmlFor={"uploadImage"}
            >
              Image
            </label>
            <input
              type="file"
              id="uploadImage"
              accept="image/png, image/jpeg"
              placeholder={"Insert upload image"}
              {...register("uploadImage")}
              className="w-full p-2 border border-cyan-700 focus:outline-none rounded"
            />
          </div>
        )}
        <button
          type="submit"
          className="border p-2 border-cyan-700 rounded-xl text-xl font-semibold hover:bg-slate-500"
        >
          Submit data
        </button>
      </form>
    </>
  );
}
