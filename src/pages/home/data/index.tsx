import { Outlet } from "react-router-dom";

export default function Data() {
  return (
    <>
      <div className="">
        <div className="flex text-center justify-center">
          <p className="font-mono font-bold text-title-xl2">Data</p>
        </div>
        <div className="flex flex-col gap-4">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
