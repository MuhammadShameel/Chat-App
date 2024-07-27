"use client";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import Login from "./SignIn";
import { Button } from "../../components/ui/button";

const Home = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUserName(user.displayName);
        setUserPhoto(user.photoURL);
        setUser(user);
      } else {
        setUserName(null);
        setUserPhoto(null);
        setUser(null);
        router.push("/login");
      }
    });
  }, [auth, router]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        router.push("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="d-flex  p-3 " style={{ backgroundColor: "#f2f2f2" }}>
        {userName ? (
          <div className="d-flex">
            <h2 className="d-flex">
              Welcome{" "}
              {userPhoto && (
                <img
                  src={userPhoto}
                  alt="Profile"
                  className="rounded-full w-10 h-10 ml-4"
                />
              )}{" "}
              <span className="font-bold">{userName}</span>
            </h2>

            <Button onClick={handleLogout} className="btn btn-primary ml-4">
              Logout
            </Button>
          </div>
        ) : (
          <div className="container">
            <Login />
            <h1>Loading....</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
