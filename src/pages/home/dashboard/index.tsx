import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosPrivateClient from "../../../utils/services/axios/axiosPrivateClient";

class Entity {
  entityName: string;
  path: string;

  constructor() {
    this.entityName = "";
    this.path = "";
  }
}

const itemsDashboard = [
  {
    entityName: "Book",
    path: "Book",
  },
  {
    entityName: "BookTag",
    path: "book-tag",
  },
  {
    entityName: "BookCategory",
    path: "book-category",
  },
  {
    entityName: "Author",
    path: "author",
  },
  {
    entityName: "AppInfo",
    path: "app-info",
  },
  {
    entityName: "Chapter",
    path: "Chapter",
  },
  {
    entityName: "Category",
    path: "Category",
  },
  {
    entityName: "Image",
    path: "Image",
  },
  {
    entityName: "Status",
    path: "Status",
  },
  {
    entityName: "Tag",
    path: "Tag",
  },
  {
    entityName: "Quote",
    path: "Quote",
  },
];

export default function Dashboard() {
  const [entityList, setEntityList] = useState<Entity[]>(itemsDashboard);

  const convertToKebabCase = (text: string): string => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1-$2") // Insert hyphen between lowercase and uppercase letters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .toLowerCase(); // Convert to lowercase
  };

  useEffect(() => {
    var entityFromBE: Entity[] = [];

    axiosPrivateClient.get("admin/entity").then((data) => {
      data.data.forEach((entityData: any) => {
        const convertedEntity = new Entity();

        // Convert the required properties from `BookAuthor` to `book-author`
        convertedEntity.path = convertToKebabCase(entityData);

        // Assign other properties as needed
        convertedEntity.entityName = entityData;

        entityFromBE.push(convertedEntity);
      });

      setEntityList(entityFromBE);
    });
  }, [entityList.length]);

  const listItemRender = entityList.map((item, index) => {
    return (
      <Link
        key={index}
        className="bg-slate-400 border rounded-md p-2"
        to={"/home/data/" + item.path.toLowerCase()}
      >
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
