import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import axiosPrivateClient from "../../utils/services/axiosPrivateClient";

export default function DynamicFormData(props: any) {
  const headers = Object.keys(props.props.data.items[0]).sort();
  const location = useLocation();
  var entity = location.pathname.split("/")[3];

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<any>({});

  const onSubmit: SubmitHandler<any> = (data) => {
    const formData = jsonToFormData(data);

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
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  });

  function jsonToFormData(json: any) {
    let formData = new FormData();
    for (let key in json) {
      if (json[key] instanceof FileList) {
        formData.append(key, json[key][0]);
      } else {
        formData.append(key, json[key]);
      }
    }
    return formData;
  }

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
          key={index}
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
          "grid p-4 border border-cyan-800 rounded-xl gap-4 grid-cols-" +
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
