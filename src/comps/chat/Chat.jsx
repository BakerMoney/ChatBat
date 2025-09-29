import { useEffect, useRef, useState } from "react";
import "./chat.css"
import EmojiPicker from "emoji-picker-react";
import { onSnapshot, doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore";
import { db } from "../../libraries/firebase";
import { useChatStore } from "../../libraries/chatStore";
import { useUserStore } from "../../libraries/userStore";
import upload from "../../libraries/upload";

const Chat = () => {
const [chat,setChat] = useState();
const [open,setOpen] = useState(false);
const [text,setText] = useState("");
const [img, setImg] = useState({
    file: null,
    url: "",
});

const {currentUser} = useUserStore();
const {chatId, user, isCurrentUserBlocked, isReceiverBlocked} = useChatStore();

const endRef = useRef(null)

useEffect(() => {
  if (chat?.messages?.length > 0) {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [chat?.messages, chatId]);


useEffect(() => {
    const unSub = onSnapshot(
        doc(db, "chats", chatId), (res) => {
            setChat(res.data());
        }
    );

    return () => {
        unSub();
    };
}, [chatId]);

console.log(chat)

const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false)
};

const handleImg = (e) =>{
    if(e.target.files[0]){
      setImg({
        file:e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
};

const handleSend = async () => {
    if (text === "" && !img.file) return;

    let imgUrl = null;

    try{

        if (img.file){
            imgUrl = await upload(img.file);
        }

        await updateDoc(doc(db, "chats", chatId),{
            messages:arrayUnion({
                senderId: currentUser.id,
                text,
                createdAt: new Date(),
                ...(imgUrl && {img: imgUrl}),
            }),
        });

        const userIDs = [currentUser.id, user.id]

        userIDs.forEach(async (id)=>{

        
            const userChatsRef = doc(db, "userchats", id)
            const userChatSnapshot = await getDoc(userChatsRef)

            if(userChatSnapshot.exists()){
                const userChatsData = userChatSnapshot.data()

                const chatIndex = userChatsData.chats.findIndex(c=> c.chatId === chatId)

                userChatsData.chats[chatIndex].lastMessage = text;
                userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                userChatsData.chats[chatIndex].updatedAt = Date.now();

                await updateDoc(userChatsRef, {
                    chats: userChatsData.chats,
                });
            }
        })
    }
    catch(err){
        console.log(err)
    }

    setImg({
        file: null,
        url: "",
    });

    setText("");
};

    return(
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={user?.avatar || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{user?.username}</span>
                        <p>Hello bybis</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                {chat?.messages?.map((message) => (
                    <div className={message.senderId === currentUser?.id ? "messageown" : "message"} key={message?.createdAt}>
                        
                        <img
                            src={message.senderId === currentUser.id 
                                ? currentUser.avatar || "./avatar.png"
                                : user?.avatar || "./avatar.png"}
                            alt=""
                        />


                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
                {img.url && (
                    <div className="messageown">
                        <div className="texts">
                            <img src={img.url} alt="" />
                        </div>
                    </div>
                )}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src="./img.png" alt=""/>
                    </label>
                    <input type="file" id="file" style={{display: "none"}} onChange={handleImg} />
                    <img src="./camera.png" alt=""/>
                    <img src="./mic.png" alt=""/>
                </div>
                <input 
                    type="text" 
                    placeholder={isCurrentUserBlocked || isReceiverBlocked ? "Cannot send message" : "Type.."}
                    value={text}
                    onChange={e=>setText(e.target.value)}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                />
                <div className="emoji">
                    <img src="./emoji.png" alt="" onClick={() => setOpen(prev => !prev)}/>
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>

                </div>
                <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
            </div>
        </div>
    )
    
}

export default Chat