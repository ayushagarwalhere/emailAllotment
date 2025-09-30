import React, { use, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
   const navigate = useNavigate();
  const [name, setName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [branch, setBranch] = useState("CS");
  const branches = [
    "CS",
    "DCS",
    "EC",
    "DEC",
    "EE",
    "ME",
    "MNC",
    "CH",
    "CE",
    "EP",
    "CH",
    "MS",
  ];
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, middleName, lastName, email, password, branch });
    const user = {
      name,
      middleName,
      lastName,
      email,
      password,
      rollNumber,
      branch,
    };
    try {
      const response = await axios.post("/api/student/signup", user);
      localStorage.setItem("email", email);
      navigate("/verify-otp");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen h-max w-full flex bg-black">
      <div className="w-1/2 h-full bg-neutral-950 text-white">
        <div className="flex flex-col gap-3 items-center justify-center w-full h-full py-5">
          <h1 className="w-full text-center font-bold text-2xl">
            Login to your account
          </h1>
          <p className="w-full text-center text-neutral-400">
            Login to Online Email Allotment System by NITH
          </p>
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-5 w-full items-center justify-around "
          >
            <div className="w-2/3">
              <label htmlFor="firstName" className="font-medium">
                Name
              </label>
              <input
                placeholder="John"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md"
                required
              />
            </div>
            <div className="w-2/3">
              <label htmlFor="middleName" className="font-medium">
                Madien Name
              </label>
              <input
                placeholder="Doe"
                type="text"
                value={middleName}
                onChange={(e) => {
                  setmiddleName(e.target.value);
                }}
                className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md"
              />
            </div>
            <div className="w-2/3">
              <label htmlFor="lastName" className="font-medium">
                Last Name
              </label>
              <input
                placeholder="Doe"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md"
              />
            </div>
            <div className="w-2/3">
              <label htmlFor="lastName" className="font-medium">
                Roll Number
              </label>
              <input
                placeholder="24BCS001"
                type="text"
                value={rollNumber}
                onChange={(e) => {
                  setRollNumber(e.target.value);
                }}
                className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md"
              />
            </div>
            <div className="w-2/3">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                placeholder="hello@gmail.com"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md"
                required
              />
            </div>
            <div className="w-2/3">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                placeholder=""
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-2 py-1 w-full rounded-md"
                required
              />
            </div>
            <div className="w-2/3">
              <label htmlFor="branch" className="font-medium">
                Branch
              </label>
              <select
                name="Branch"
                className="w-full bg-neutral-800 rounded-md px-2 py-1 mt-2"
                value={branch}
                onChange={(e) => {setBranch(e.target.value);}}
                required
              >
                {branches.map((branch, i) => {
                  return (
                    <option
                      className="rounded-md px-2 py-1"
                      value={branch}
                      key={i}
                    >
                      {branch}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type="submit"
              className="bg-white w-2/3 rounded-md px-3 py-1 font-medium text-black"
            >
              Sign Up
            </button>
            <h1 className="text-sm">
              Already have a account?{" "}
              <span className="underline underline-offset-1">Login</span>
            </h1>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-full bg-neutral-500"></div>
    </div>
  );
};

export default Signup;
