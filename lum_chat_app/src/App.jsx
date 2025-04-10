import { useState, useEffect } from "react";
import supabase from "./helper/supabaseClient";
import Chat from "./componets/chat/Chat"
import Detail from "./componets/detail/Detail"
import List from "./componets/list/List"
import Login from "./componets/login/Login"
import Notification from "./componets/notification/Notification"

const App = () => {
  const [user, setUser] = useState(null);
  //проверка на пользователя

  useEffect(() => {
    // Проверка текущей сессии пользователя
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Подписка на изменения аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);


  return (
    <div className="container">
      {
        user ? (
          <>
            <List user={user} setUser={setUser} />
            <Chat />
            <Detail />
          </>
        ) : (
        <Login />
      )}
      <Notification/>
      
    </div>
  )
}

export default App
