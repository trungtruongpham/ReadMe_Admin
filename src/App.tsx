import { RouterProvider } from "react-router-dom";
import MainRouter from "./routes/main-route";

function App() {
  return (
    <div className="App">
       <RouterProvider router={MainRouter}></RouterProvider>
    </div>
  );
}

export default App;
