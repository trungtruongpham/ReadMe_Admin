import { Link } from "react-router-dom";

export default function Dashboard() {
  const items = [
    "Book",
    "BookTag",
    "BookCategory",
    "BookQuote",
    "BookAuthor",
    "Author",
    "Chapter",
    "Image",
    "Review",
    "Status",
    "Tag",
  ];
  const listItemRender = items.map((item, index) => {
    return (
      <Link key={index} className="bg-slate-400 rounded-md p-2" to={"/home/data/" + item.toLowerCase()}>
        {item}
      </Link>
    );
  });

  return (
    <>
      <div className="m-auto w-full">
        <p className="text-xl font-mono font-semibold">Dashboard</p>
      </div>
      <div className="grid grid-cols-4 grid-flow-row gap-4">
        {listItemRender}
      </div>
    </>
  );
}
