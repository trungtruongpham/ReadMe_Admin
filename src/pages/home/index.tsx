import logo from "../../assets/book-stack.png";
import dashboard from "../../assets/dashboard.png";
import data from "../../assets/folder.png";

export default function HomePage() {
  return (
    <>
      <div className="home w-full h-screen flex">
        <div id="menu" className="w-1/6 h-screen bg-slate-100 pt-8">
          <div id="logo-section" className="m-auto w-fit space-y-4">
            <img src={logo} alt="App logo" className="w-16 h-16 ml-8" />
            <p className="text-2xl font-extrabold">ReadNow Admin</p>
          </div>
          <div id="menu-section" className="flex flex-col pt-8 m-auto max-w-[200px] space-y-2">
            <button className="flex flex-row hover:bg-slate-300 rounded-sm p-2 w-full">
              <img src={dashboard} alt="Dashboard button logo" className="relative top-1 w-4 h-4 mr-2" />
              Dashboard
            </button>
            <button className="flex flex-row hover:bg-slate-300 rounded-sm p-2">
              <img src={data} alt="Data button logo" className="relative top-1 w-4 h-4 mr-2" />
              Data
            </button>
            <button className="flex flex-row hover:bg-slate-300 rounded-sm p-2">
              <img src={data} alt="Data button logo" className="relative top-1 w-4 h-4 mr-2" />
              Users
            </button>
          </div>
        </div>
        <div id="main" className="w-full">
            <div className="m-4 p-4 border rounded space-y-4">
                <p>Data</p>
                <ol>
                    <li className="grid grid-cols-4 gap-4">
                        <div className="max-w-[100px]">Id</div>
                        <div className="max-w-[100px]">Name</div>
                        <div className="max-w-[100px]">Created At</div>
                        <div className="max-w-[100px]">Updated At</div>
                    </li>
                    <li className="grid grid-cols-4 gap-2">
                        <div className="max-w-[100px]">1</div>
                        <div className="max-w-[100px]">2</div>
                        <div className="max-w-[100px]">3</div>
                        <div className="max-w-[100px]">4</div>
                        <div className="max-w-[100px]">1</div>
                        <div className="max-w-[100px]">2</div>
                        <div className="max-w-[100px]">3</div>
                        <div className="max-w-[100px]">4</div>
                    </li>
                </ol>
            </div>
        </div>
      </div>
    </>
  );
}
