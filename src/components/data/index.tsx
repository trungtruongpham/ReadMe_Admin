import { Outlet } from "react-router-dom";

export default function Data() {
  return (
    <>
      <div className="">
        <p>Data</p>
      </div>
      <div className="flex flex-col">
        <input type="text" name="name" id="data-name" placeholder="Name" />
        <table id="data-grid" className="">
          <Outlet></Outlet>
        </table>
      </div>
    </>
  );
}
