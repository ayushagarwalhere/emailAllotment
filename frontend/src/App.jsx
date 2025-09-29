import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import StudentInfo from "./pages/studentinfo";
import Error from "./pages/404";

import CreateForm from "./pages/createform";
import SuperAdmin from "./pages/superAdmin";  
import CreateAdmin from "./pages/createAdmin";
import FaqSection from "./components/FaqSection";
import Footer from "./pages/footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";



function App() {
  return (
    <BrowserRouter>
      <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/student/dashboard" element={<Dashboard/>}></Route>
              <Route path="admin/studentinfo" element={<StudentInfo/>}></Route>  
              <Route path="admin/createform" element={<CreateForm/>}></Route>
              <Route path="/superadmin" element={<SuperAdmin/>}></Route>
              <Route path="/superadmin/viewadmin" element={<CreateAdmin/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/signup" element={<Signup/>}></Route>
              <Route path="/*" element={<Error/>}></Route>        
      </Routes>
      <FaqSection />  
      <Footer></Footer> 
    </BrowserRouter>
  );
}

export default App;
