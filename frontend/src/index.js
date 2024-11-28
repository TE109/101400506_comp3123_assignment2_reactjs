import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Details from "./pages/detail";
import EmployeeComponents from "./pages/EmployeeComponents";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="SignUp" element={<SignUp />} />        
        <Route path="details/:eid" element={<Details />} />
        <Route path="EmployeeComponents" element={<EmployeeComponents/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);