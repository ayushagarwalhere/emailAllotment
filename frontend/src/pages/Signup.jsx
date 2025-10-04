import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [branch, setBranch] = useState("CS");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("personal"); // 'personal' | 'account'

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

  const canProceedPersonal = Boolean(name.trim() && branch.trim());
  const canSubmit = Boolean(
    canProceedPersonal && email.trim() && password.trim(),
  );

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields across tabs
    if (!name.trim() || !branch.trim()) {
      setActiveTab("personal");
      setError("Please complete your personal information (Name and Branch).");
      return;
    }
    if (!email.trim() || !password.trim()) {
      setActiveTab("account");
      setError("Please enter your email and password.");
      return;
    }

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
      const response = await axios.post("http://localhost:5000/auth/signup", user);
      if (typeof window !== "undefined") {
        window.location.assign(`/verify-otp/?id=${response.data.id}`);
      }
    } catch (err) {
      if (err?.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex">
      <div className="w-full lg:w-1/2 h-full bg-neutral-950">
        <div className="mx-auto w-full max-w-xl px-4 py-8 flex flex-col gap-6">
          <header className="text-center space-y-1">
            <h1 className="font-bold text-2xl">Create your account</h1>
            <p className="text-neutral-400">
              Signup to Online Email Allotment System by NITH
            </p>
          </header>

          {error ? (
            <p
              role="alert"
              className="text-red-500 text-sm font-medium text-center"
            >
              {error}
            </p>
          ) : null}

          <div className="w-full">
            <div
              role="tablist"
              aria-label="Signup sections"
              className="grid grid-cols-2 gap-2 bg-neutral-900 p-1 rounded-lg"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "personal"}
                className={[
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  activeTab === "personal"
                    ? "bg-white text-black"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800",
                ].join(" ")}
                onClick={() => setActiveTab("personal")}
              >
                Personal Information
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "account"}
                className={[
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  activeTab === "account"
                    ? "bg-white text-black"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800",
                ].join(" ")}
                onClick={() => setActiveTab("account")}
              >
                Password & Email
              </button>
            </div>
          </div>

          <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
            <section
              role="tabpanel"
              hidden={activeTab !== "personal"}
              aria-labelledby="tab-personal"
              className={activeTab === "personal" ? "block" : "hidden"}
            >
              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="firstName" className="font-medium">
                    Name
                  </label>
                  <input
                    id="firstName"
                    placeholder="John"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError("");
                    }}
                    className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-3 py-2 w-full rounded-md"
                    required={activeTab === "personal"}
                  />
                </div>

                <div>
                  <label htmlFor="middleName" className="font-medium">
                    Middle Name
                  </label>
                  <input
                    id="middleName"
                    placeholder="—"
                    type="text"
                    value={middleName}
                    onChange={(e) => setmiddleName(e.target.value)}
                    className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-3 py-2 w-full rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="font-medium">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    placeholder="Doe"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-3 py-2 w-full rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="rollNumber" className="font-medium">
                    Roll Number
                  </label>
                  <input
                    id="rollNumber"
                    placeholder="24BCS001"
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-3 py-2 w-full rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="branch" className="font-medium">
                    Branch
                  </label>
                  <select
                    id="branch"
                    name="Branch"
                    className="w-full bg-neutral-800 rounded-md px-3 py-2 mt-2"
                    value={branch}
                    onChange={(e) => {
                      setBranch(e.target.value);
                      if (error) setError("");
                    }}
                  >
                    {branches.map((b, i) => (
                      <option
                        className="rounded-md px-2 py-1"
                        value={b}
                        key={i}
                      >
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section
              role="tabpanel"
              hidden={activeTab !== "account"}
              aria-labelledby="tab-account"
              className={activeTab === "account" ? "block" : "hidden"}
            >
              <div className="flex flex-col gap-5">
                <div>
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    placeholder="hello@gmail.com"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-3 py-2 w-full rounded-md"
                    required={activeTab === "account"}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    className="bg-neutral-800 text-sm mt-2 outline-neutral-500 outline-1 px-3 py-2 w-full rounded-md"
                    required={activeTab === "account"}
                  />
                </div>
              </div>
            </section>

            {activeTab === "personal" ? (
              <button
                type="button"
                onClick={() => {
                  if (canProceedPersonal) {
                    setError("");
                    setActiveTab("account");
                  } else {
                    setError(
                      "Please complete your personal information (Name and Branch).",
                    );
                  }
                }}
                className={[
                  "rounded-md px-4 py-2 font-medium transition-colors",
                  canProceedPersonal
                    ? "bg-white text-black hover:bg-neutral-200"
                    : "bg-neutral-700 text-neutral-300 cursor-not-allowed",
                ].join(" ")}
                aria-disabled={!canProceedPersonal}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  "rounded-md px-4 py-2 font-medium transition-colors",
                  canSubmit
                    ? "bg-white text-black hover:bg-neutral-200"
                    : "bg-neutral-700 text-neutral-300 cursor-not-allowed",
                ].join(" ")}
                aria-disabled={!canSubmit}
              >
                Sign Up
              </button>
            )}

            <p className="text-sm text-center text-neutral-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline underline-offset-2 hover:text-white"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div
        className="hidden lg:block w-1/2 h-full bg-neutral-800"
        aria-hidden="true"
      />
    </div>
  );
};

export default Signup;
