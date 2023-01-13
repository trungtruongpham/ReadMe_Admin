import { Route, Router, Routes } from "react-router-dom";

export default function LoginRoute() {
    return(
        <Route>
            <Route path="test" element={<p>test route</p>}></Route>
        </Route>
    )

}