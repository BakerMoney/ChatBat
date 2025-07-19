import './App.css';
import {useRef, useState} from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, serverTimestamp, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDC6ZK-AlTHIqSctKo3mGq_GmJxJ-KkH3U",
  authDomain: "chat-app-85366.firebaseapp.com",
  projectId: "chat-app-85366",
  storageBucket: "chat-app-85366.firebasestorage.app",
  messagingSenderId: "681939526623",
  appId: "1:681939526623:web:d787b9eeca81a4da095a6a",
  measurementId: "G-7F14F4BDHV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">{
        user && (
          <button onClick={() =>signOut(auth)}>Sign Out</button>
          )
      }
      </header>
      <div className="App">

      </div>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}



function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}


function ChatRoom() {
  const messagesRef = collection(firestore, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messages] = useCollectionData(q, { idField: 'id' });
  const [formValue, setFormValue] = useState('');
  const dummy = useRef()

  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');

    dummy.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy} style={{ height: "10vh" }}>

        </div>
      </div>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">Send</button>
      </form>

    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>

  )
}

export default App;
