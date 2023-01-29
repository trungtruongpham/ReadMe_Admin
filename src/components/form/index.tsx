export default function DynamicFormData(props: any) {
  const headers = Object.keys(props.props.data.items[0]).sort();

  const inputForm = headers.map((header, index) => {
    return (
      <div className="flex space-x-2 w-full">
        <label
          className="font-mono p-2 text-xl min-w-[150px]"
          htmlFor={"input_" + header}
        >
          {header.toUpperCase()}
        </label>
        <input
          type="text"
          name={header}
          key={index}
          id={"input_" + header}
          placeholder={"Insert " + header}
          className="w-full p-2 border border-cyan-700 focus:outline-none rounded"
        />
      </div>
    );
  });

  return (
    <>
      <form
        className={
          "grid p-4 border border-cyan-800 rounded-xl gap-4 grid-cols-" +
          headers.length
        }
      >
        {inputForm}
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
