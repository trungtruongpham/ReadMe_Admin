import { ErrorMessage } from "@hookform/error-message";
import Option from "../../types/options";
import { SubmitHandler, useForm } from "react-hook-form";

interface MultiSelectProps {
  options: Option[];
  title: string;
  name: string;
  register: any;
  errors: any;
}

const Select: React.FC<MultiSelectProps> = ({
  options,
  title,
  name,
  register,
  errors,
}) => {
  const renderOptions = options.map((optionRender, i) => {
    return (
      <option value={optionRender.id} key={i}>
        {optionRender.name}
      </option>
    );
  });

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">{title}</label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          {...register(name)}
        >
          <option value="">Type Your {title}</option>
          {renderOptions}
        </select>
        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>

        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <p>{message}</p>}
        ></ErrorMessage>
      </div>
    </div>
  );
};

export default Select;
