import "./userInfo.css"
import supabase from "../../../helper/supabaseClient"
import { useState } from "react";

const Userinfo = ({ user, setUser }) => {
    const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error);
      } else {
        // Optionally, you can redirect the user or update the UI here
        console.log("User logged out successfully");
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }setUser(null)
  }

  return (
    <div className="userInfo">
      <div className="user">
        <img src="./avatar.jpg" alt="" />
        <h2>{user?.email || "Guest"}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
       
      </div>
    </div>
  );
}

export default Userinfo
  