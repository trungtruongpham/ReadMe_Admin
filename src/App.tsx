import { RouterProvider } from "react-router-dom";
import MainRouter from "./routes/main-route";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App min-h-full h-full">
      <RouterProvider router={MainRouter}></RouterProvider>
      <Toaster gutter={10} containerStyle={{ position: 'fixed' }}/>
    </div>
  );
}

export default App;
