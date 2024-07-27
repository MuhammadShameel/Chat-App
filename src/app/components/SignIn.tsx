"use client";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase.utils";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.email || !values.password || submitDisabled) {
      return;
    }

    setErrorMsg("");
    setSubmitDisabled(true);

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = res.user;
      console.log(user);
      setSuccessMessage("User is successfully entered");
      window.location.href = "/";
    } catch (err: any) {
      setSubmitDisabled(false);

      if (err.code === "auth/wrong-password") {
        setErrorMsg("Wrong password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        setErrorMsg("User not found. Please sign up first.");
      } else {
        setErrorMsg(err.message);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!values.email) {
      setErrorMsg("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, values.email);
      setSuccessMessage("Password reset email sent. Check your inbox.");
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      console.log(user);
      window.location.href = "/";
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700">Email address</label>
            <input
              type="email"
              onChange={(event) =>
                setValues({ ...values, email: event.target.value })
              }
              className="w-full px-3 py-2 mt-1 border rounded-md"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                className="w-full px-3 py-2 mt-1 border rounded-md"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={(event) =>
                  setValues({ ...values, password: event.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                onClick={togglePasswordVisibility}
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
          <div className="text-center text-red-600">
            <b>{errorMsg}</b>
            <b className="text-green-600">{successMessage}</b>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-blue-500"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              onClick={handleLogin}
              disabled={submitDisabled}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Login
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-white bg-red-500 rounded-md"
              onClick={signInWithGoogle}
            >
              Login with Google
            </button>
            <p>
              Not a member?{" "}
              <a href="/signup" className="text-blue-500">
                SignUp
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
