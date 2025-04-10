import "./detail.css"
import supabase from "../../helper/supabaseClient"
import { useState } from "react"

const Detail = () => {
  //вставлено вместе с userinfo 10/04
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
    <div className="detail">
      <div className="user">
        <img src="./avatar.jpg" alt="" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
          
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://get.wallhere.com/photo/kitten-muzzle-paws-cute-eyes-fluffy-lie-666356.jpg" alt="" />
                <span>photo_2025_2.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://get.wallhere.com/photo/kitten-muzzle-paws-cute-eyes-fluffy-lie-666356.jpg" alt="" />
                <span>photo_2025_2.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://get.wallhere.com/photo/kitten-muzzle-paws-cute-eyes-fluffy-lie-666356.jpg" alt="" />
                <span>photo_2025_2.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Detail
