import "./chat.css";
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from "react";
/* ДОБАВЛЕНО: Импорт Supabase */
import supabase from "../../helper/supabaseClient";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  /* ДОБАВЛЕНО: Состояние для сообщений */
  const [messages, setMessages] = useState([]);

  const endRef = useRef(null);

  /* ИЗМЕНЕНО: Добавлена загрузка сообщений */
  useEffect(() => {
    // Загрузка сообщений из Supabase
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    // Подписка на новые сообщения в реальном времени
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages'
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  /* ДОБАВЛЕНО: Отправка сообщений */
  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const { error } = await supabase
        .from("messages")
        .insert([{ 
          text, 
          user_id: supabase.auth.user()?.id 
        }]);

      if (error) throw error;
      setText("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Теперь зависит от messages

  const handleEmoji = e => {
    setText(prev => prev + e.emoji);
    setOpen(false);
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.jpg" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor, sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {/* ИЗМЕНЕНО: Рендеринг сообщений из Supabase */}
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.user_id === supabase.auth.user()?.id ? "own" : ""}`}
          >
            {message.user_id !== supabase.auth.user()?.id && (
              <img src="./avatar.jpg" alt="" />
            )}
            <div className="texts">
              {message.image && (
                <img src={message.image} alt="attached" />
              )}
              <p>{message.text}</p>
              <span>{new Date(message.created_at).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input 
          type="text" 
          placeholder="Type a message" 
          onChange={e => setText(e.target.value)} 
          value={text}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <div className="emoji">
          <img 
            src="./emoji.png" 
            alt="" 
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className="sendButton" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;