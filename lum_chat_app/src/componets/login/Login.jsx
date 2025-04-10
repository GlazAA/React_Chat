import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

/* УДАЛЕНО: Firebase-импорты
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../lib/firebase"; 
*/

/* ДОБАВЛЕНО: Supabase-клиент */
import supabase from "../../helper/supabaseClient";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });

  // handleAvatar остаётся без изменений
  const handleAvatar = e => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  /* ИЗМЕНЕНО: Логика входа */
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      /* БЫЛО (Firebase):
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      */

      /* СТАЛО (Supabase): */
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      toast.success("Logged in successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ИЗМЕНЕНО: Логика регистрации */
  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      /* БЫЛО (Firebase):
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        blocked: [],
      });
      */

      /* СТАЛО (Supabase): */
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { // Дополнительные данные профиля
          data: { 
            username 
          }
        }
      });

      if (error) throw error;
      
      /* Дополнительно: Загрузка аватара в Supabase Storage (если нужно)
      if (avatar.file) {
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(`user_${data.user.id}/avatar`, avatar.file);
      }
      */

      toast.success("Account created! Check your email for confirmation.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // JSX остаётся без изменений
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
        <form onSubmit={handleSignUp}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.jpg"} alt="" />
            Upload An Image
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;