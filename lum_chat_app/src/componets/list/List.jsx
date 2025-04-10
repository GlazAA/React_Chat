import ChatList from "./chatList/chatList"
import "./list.css"
import Userinfo from "./userInfo/Userinfo"
const List = ({setUser, user}) => {
    return (
      <div className="list">
        <Userinfo setUser={setUser} user={user}/>
        <ChatList/>
      </div>
    )
  }
  
  export default List
  