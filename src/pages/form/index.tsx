import { Outlet } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";

export default function Forms() {
  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div id="forms" className="w-full h-full rounded-md overflow-auto p-4">
          <Outlet></Outlet>
        </div>
      </div>
    </DefaultLayout>
  );
}
