import React, { useState, useEffect, useRef } from "react";
import ChatInput from "../Components/ChatInput";
import ChatMessages from "../Components/ChatMessages";
import NavItem from "../Components/NavItem";
import DrawerBackdrop from "../Components/DrawerBackdrop";
import UserInfoModal from "../Components/UserModal";
import HeartBeatModal from "../Components/HeartBeatModal";

function ChatBotPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const inputFieldRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showHeartBeatModal, setShowHeartBeatModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [heartRate, setHeartRate] = useState(null);


  useEffect(() => {
    inputFieldRef.current.focus();

    // Dummy chats
    setChats([{ id: 1, title: "Chat with AI" }]);

    // Show modal initially
    setShowModal(true);
    //setShowHeartBeatModal(true);

    // Intro message from the AI assistant
    // setMessages([
    //   {
    //     role: "assistant",
    //     content: [
    //       {
    //         text: "Hi, I’m your Mental Wellness ChatBot. I’m here to support you — whether you’re feeling stressed, anxious, or just want to talk. How are you feeling today?",
    //       },
    //     ],
    //   },
    //   // {
    //   //   role: "assistant",
    //   //   content: {
    //   //     type: "stress",
    //   //     level: 72,
    //   //     message: "It looks like you're under a bit of stress. Try deep breathing. 💨",
    //   //   }
    //   // }

    // ]);
  }, []);

  const startChat = (data) => {
    //Intro message from the AI assistant
    console.log(userData);
    setMessages([
      {
        role: "assistant",
        content: [
          {
            text: `Hi ${data.name}, I’m your Mental Wellness ChatBot. I’m here to support you. Do you want to measure your stress levels?.`,
          },
        ],
      },
      // {
      //   role: "assistant",
      //   content: {
      //     type: "stress",
      //     level: 72,
      //     message: "It looks like you're under a bit of stress. Try deep breathing. 💨",
      //   }
      // }
    ]);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSendMessage = async (input) => {
    const newMessage = {
      role: "user",
      content: [{ text: input }],
    };

    setMessages((prev) => [...prev, newMessage]);
    
    if(input != "Yes"){
      scrollToBottom();
      setLoading(true); // 👈 Start loading
  
      try {
        const response = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: input,
          }),
        });
  
        const data = await response.json();
  
        const responseMessage = {
          role: "assistant",
          content: [{ text: data.answer || "No response received." }],
        };
  
        setMessages((prev) => [...prev, responseMessage]);
        scrollToBottom();
      } catch (error) {
        console.error("Error communicating with backend:", error);
        const errorMessage = {
          role: "assistant",
          content: [{ text: "Sorry, I couldn't reach the server." }],
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setLoading(false); // 👈 Stop loading
        scrollToBottom();
      }
    }else{
      setShowHeartBeatModal(true)
      try {
        const res = await fetch("http://localhost:5000/heartrate");
        const data = await res.json();

        setHeartRate(data.heartRate);
        const responseMessage = {
          role: "assistant",
          content: [{ text: "Your heart rate is : "+(data.heartRate)+" BPM." || "No response received." }],
        };
  
        setMessages((prev) => [...prev, responseMessage]);
        setShowHeartBeatModal(false);
      } catch (error) {
        console.error("Error fetching heart rate:", error);
        setShowHeartBeatModal(false);
      }

      //handleSendMessage(`My heart rate is ${heartRate}, what do you think about my`)
    }
  };

  const openChat = (chatId) => {
    setChatId(chatId);
    setDrawerOpen(false);
    // Dummy messages
    setMessages([
      { role: "user", content: [{ text: "Hello" }] },
      { role: "assistant", content: [{ text: "Hi! How can I help you?" }] },
    ]);
    scrollToBottom();
    inputFieldRef.current.focus();
  };

  const newChat = () => {
    setChatId(null);
    setMessages([]);
    inputFieldRef.current.focus();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <nav className="bg-white border-b border-gray-200 px-8 py-4 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50 h-16">
          <div className="flex justify-start items-center">
            <button
              className="p-1 mr-1 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={toggleDrawer}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <span className="p-1 font-semibold whitespace-nowrap dark:text-white">
              MindPulse
            </span>
          </div>
        </nav>

        {drawerOpen && <DrawerBackdrop onClick={toggleDrawer} />}

        <aside
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidenav"
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
            {chats.length > 0 && (
              <ul className="space-y-2">
                {chats.map((chat, index) => (
                  <NavItem
                    key={index}
                    active={chatId === chat.id}
                    onClick={() => openChat(chat.id)}
                  >
                    <span className="truncate text-ellipsis">{chat.title}</span>
                  </NavItem>
                ))}
              </ul>
            )}
            <ul
              className={`pt-5 space-y-2 ${
                chats.length > 0
                  ? "mt-5 border-t border-gray-200 dark:border-gray-700"
                  : ""
              }`}
            >
              <NavItem active={!chatId} onClick={() => newChat()}>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
                <span className="ml-3 truncate text-ellipsis">New chat</span>
              </NavItem>
            </ul>
          </div>
        </aside>

        <main className="p-4 md:ml-64 pt-20 dark:text-white h-screen">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full py-2 px-4">
            <div className="h-full overflow-x-auto mb-6">
              <ChatMessages messages={messages} loading={loading} />
              <div ref={messagesEndRef} />
            </div>
            <ChatInput onSendMessage={handleSendMessage} ref={inputFieldRef} />
          </div>
        </main>
      </div>

      <UserInfoModal
        isOpen={showModal}
        //onClose={() => setShowModal(false)}
        onSubmit={(data) => {
          //console.log("User Info:", data);
          setUserData(data);
          setShowModal(false);
          startChat(data);
        }}
      />
      <HeartBeatModal
        isOpen={showHeartBeatModal}
        onClose={() => {
          setShowHeartBeatModal(false);
          console.log("Heartbeat modal closed after 60 seconds or manually");
        }}
      />
    </>
  );
}

export default ChatBotPage;
