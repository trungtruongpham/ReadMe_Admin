import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/book-stack.png";
import dashboard from "../../assets/dashboard.png";
import data from "../../assets/folder.png";

export default function HomePage() {
  return (
    <>
      <div className="flex w-full h-full min-h-vh">
        <div id="menu" className="w-1/6 h-vh min-h-screen bg-slate-100 pt-8 ">
          <div id="logo-section" className="m-auto w-fit space-y-4">
            <img src={logo} alt="App logo" className="w-16 h-16 ml-8" />
            <p className="text-xl font-extrabold font-mono">ReadNow Admin</p>
          </div>
          <div
            id="menu-section"
            className="flex flex-col pt-8 m-auto max-w-[200px] space-y-2"
          >
            <Link
              to={"/home/dashboard"}
              className="flex flex-row hover:bg-slate-300 rounded-sm p-2 w-full"
            >
              <img
                src={dashboard}
                alt="Dashboard button logo"
                className="relative top-1 w-4 h-4 mr-2"
              />
              Dashboard
            </Link>
            <Link
              to={"/home/data"}
              className="flex flex-row hover:bg-slate-300 rounded-sm p-2"
            >
              <img
                src={data}
                alt="Data button logo"
                className="relative top-1 w-4 h-4 mr-2"
              />
              Data
            </Link>
            <Link
              to={"/home/users"}
              className="flex flex-row hover:bg-slate-300 rounded-sm p-2"
            >
              <img
                src={data}
                alt="Data button logo"
                className="relative top-1 w-4 h-4 mr-2"
              />
              Users
            </Link>
          </div>
        </div>
        <div
          id="main"
          className="w-5/6 h-full m-4 p-4 border border-zinc-400 rounded-md"
        >
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
