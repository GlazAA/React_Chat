import "./login.css";
import { useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../lib/firebase";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }


    const handleRegister = async (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target)

        const {username, email, password} = Object.fromEntries(formData);

        console.log(username)
    }

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
    
        await setDoc(doc(db, "users", res.user.uid), {
            username,
            email,
            id: res.user.uid,
            blocked: [],
        });

        await setDoc(doc(db, "userchats", res.user.uid), {
            chats: [],
            });
            
        
            toast.success("Account created! You can login now!");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
        
    };



    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create An Account</h2>
                <form onSubmit={handleRegister}>  
                    <label htmlFor="file"> 
                        <img src={avatar.url || "./avatar.jpg"} alt="" />
                        Upload An Image</label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                    <input type="text" placeholder="Username" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )

}
export default Login