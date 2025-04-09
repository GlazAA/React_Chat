import Chat from "./componets/chat/Chat"
import Detail from "./componets/detail/Detail"
import List from "./componets/list/List"
import Login from "./componets/login/Login"
import Notification from "./componets/notification/Notification"

const App = () => {

  const user = false

  return (
    <div className="container">
      {
        user ? (
          <>
            <List />
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
