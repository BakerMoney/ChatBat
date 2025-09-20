import List from "./comps/list/List";
import Chat from "./comps/chat/Chat";
import Details from "./comps/details/Details";
import Login from "./comps/login/login";
import Notification from "./comps/notification/notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./libraries/firebase";
import { useUserStore } from "./libraries/userStore";
import { useChatStore } from "./libraries/chatStore";

const App = () => {
  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser)

  if (isLoading) return <div className="loading">Loading...</div>

  return (
    <div className='container' style={!currentUser ? { width: "60vw", height: "60vh" } : {}}>
      { currentUser ? (      
          <>
            <List/>
            {chatId && <Chat/>}
            {chatId && <Details/>}
          </>
        ) : (<Login />)
      }
      <Notification/>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default App;