import { Link } from "react-router-dom";
import Button from "../components/Button";
import FaqSection from "../components/FaqSection";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

function Home() {
  return (
    <>
      <div className="min-h-screen w-full relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
          }}
        />
        <div className="min-h-screen w-full flex flex-col justify-center items-center">
          <h1 className="text-6xl text-center font-bold z-10">
            Online email Allotement
          </h1>
          <h2 className="text-center mt-3 font-medium z-10">
            one stop solution for students to get their verified NIT Hamirpur
            Email ID and access campus services{" "}
          </h2>
          <div className="flex gap-5 mt-10 z-10">
            <Link to="/login"><Button variant="primary"> Login</Button></Link>
            <Link to="/signup"><Button variant="secondary">Sign Up</Button></Link>
          </div>
          <div className="w-full fixed top-0 left-0 font-medium ">
            <Navbar></Navbar>
          </div>
        </div>
      </div>
      <FaqSection/>
      <Footer/>
    </>
    
  );
}
export default Home;

