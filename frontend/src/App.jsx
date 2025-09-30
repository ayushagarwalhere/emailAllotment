import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./pages/404";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import StudentInfo from "./pages/studentinfo";
import CreateAdmin from "./pages/createAdmin";
import CreateForm from "./pages/createform";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SuperAdmin from "./pages/superAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/student/dashboard" element={<Dashboard />}></Route>
        <Route path="admin/studentinfo" element={<StudentInfo />}></Route>
        <Route path="admin/createform" element={<CreateForm />}></Route>
        <Route path="/superadmin" element={<SuperAdmin />}></Route>
        <Route path="/superadmin/viewadmin" element={<CreateAdmin />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
