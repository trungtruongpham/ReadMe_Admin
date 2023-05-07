import { Link } from "react-router-dom";

export default function Dashboard() {
  const itemsDashboard = [
    {
      "entityName": "Book",
      "path": "Book"
    },
    {
      "entityName": "BookTag",
      "path":"book-tag"
    },
    {
      "entityName": "BookCategory",
      "path":"book-category"
    },
    {
      "entityName": "Author",
      "path":"author"
    },
    {
      "entityName": "AppInfo",
      "path":"app-info"
    },
    {
      "entityName": "Chapter",
      "path":"Chapter"
    },
    {
      "entityName": "Category",
      "path":"Category"
    },
    {
      "entityName": "Image",
      "path":"Image"
    },
    {
      "entityName": "Status",
      "path":"Status"
    },
    {
      "entityName": "Tag",
      "path":"Tag"
    },
    {
      "entityName": "Quote",
      "path":"Quote"
    },
  ]
  
  const listItemRender = itemsDashboard.map((item, index) => {
    return (
      <Link key={index} className="bg-slate-400 border rounded-md p-2" to={"/home/data/" + item.path.toLowerCase()}>
        {item.entityName}
      </Link>
    );
  });

  return (
    <>
      <div className="m-auto w-full flex items-center text-center">
        <p className="font-mono font-bold text-title-xl2 w-full">Dashboard</p>
      </div>
      <div className="grid grid-cols-4 grid-flow-row gap-4 mt-4">
        {listItemRender}
      </div>
    </>
  );
}
