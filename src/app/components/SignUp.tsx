"use client";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase.utils";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.password || submitDisabled) {
      return;
    }

    setErrorMsg("");
    setSubmitDisabled(true);

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = res.user;
      await updateProfile(user, {
        displayName: values.name,
      });
      window.location.href = "/login";
    } catch (err: any) {
      setSubmitDisabled(false);
      if (err.code === "auth/email-already-in-use") {
        setErrorMsg(
          "The email address is already in use. Please use a different email."
        );
      } else {
        setErrorMsg(err.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Sign Up
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              onChange={(event) =>
                setValues({ ...values, name: event.target.value })
              }
              className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              type="email"
              onChange={(event) =>
                setValues({ ...values, email: event.target.value })
              }
              className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(event) =>
                  setValues({ ...values, password: event.target.value })
                }
                className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-700 dark:text-gray-300"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {errorMsg && (
            <div className="mb-4 text-center text-red-500">{errorMsg}</div>
          )}
          <div className="flex flex-col items-center space-y-4">
            <button
              type="button"
              onClick={handleSubmission}
              disabled={submitDisabled}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:bg-blue-700 dark:focus:bg-blue-600"
            >
              Signup
            </button>
            <p className="text-gray-700 dark:text-gray-300">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 dark:text-blue-300">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
