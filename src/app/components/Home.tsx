// pages/index.tsx
import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
// import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

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

  return (
    <div className="flex flex-col h-screen">
      {/* <Navbar userName={userName} userPhoto={userPhoto} /> */}
      <div className="flex flex-grow">
        <div className="w-1/4 bg-gray-200">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
