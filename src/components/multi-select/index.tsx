import { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import Option from "../../types/options";
import { ErrorMessage } from "@hookform/error-message";

interface MultiSelectProps {
  options: Option[];
  title: string;
  name: string;
  register: any;
  errors: any;
  handleMultiSelectClick: (data: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  title,
  name,
  register,
  errors,
  handleMultiSelectClick,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleOptionClick = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = {
      id: event.currentTarget.selectedOptions[0].value,
      name: event.currentTarget.selectedOptions[0].text,
    };

    console.log(selectedOptions);

    if (
      selectedOptions.length == 0 ||
      !selectedOptions.some(
        (selectedOption) => selectedOption.id === selectedValue.id
      )
    ) {
      setSelectedOptions((current: Option[]) => {
        const newSelectedOptions = [...current, selectedValue];
        return newSelectedOptions;
      });
    }
  };

  const handleDeleteOptionClick = (
    event: MouseEvent<HTMLSpanElement, Event>
  ) => {
    if (event.currentTarget?.textContent !== undefined) {
      setSelectedOptions((current: Option[]) => {
        current.filter((e) => e.name !== event.currentTarget.textContent);

        return current;
      });
    }
  };

  useEffect(() => {
    if (selectedOptions.length != 0) {
      handleMultiSelectClick(selectedOptions.map((o) => o.id));
    }
  }, [selectedOptions.length]);

  const renderOptions = options.map((optionRender, i) => {
    return (
      <option value={optionRender.id} key={i}>
        {optionRender.name}
      </option>
    );
  });

  const renderSelectedOptions = selectedOptions.map((selectedOption, i) => {
    return (
      <span
        className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke dark:border-strokedark bg-gray dark:bg-white/30 py-1.5 px-2.5 text-sm font-medium"
        onClick={(e) => handleDeleteOptionClick(e)}
        key={i}
      >
        {selectedOption.name}
        <span className="cursor-pointer pl-2 hover:text-danger">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </span>
    );
  });

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">{title}</label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <div className="flex flex-wrap items-center">
          {renderSelectedOptions}
        </div>

        <select
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          {...register(name, {
            onchange: (e: any) => {
              handleOptionClick(e);
            },
          })}
          onChange={handleOptionClick}
        >
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

export default MultiSelect;
