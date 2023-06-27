import { RouterProvider } from "react-router-dom";
import MainRouter from "./routes/main-route";

function App() {
  return (
    <div className="App min-h-full h-full">
      <RouterProvider router={MainRouter}></RouterProvider>
    </div>
  );
}

export default App;
