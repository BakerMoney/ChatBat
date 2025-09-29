import { doc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../libraries/chatStore";
import { db, auth } from "../../libraries/firebase";
import { useUserStore } from "../../libraries/userStore";
import "./details.css";

const Details = () => {
  const { user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", currentUser.id);
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked
          ? arrayRemove(user.id) // unblock → remove their ID
          : arrayUnion(user.id), // block → add their ID
      });

      // ❌ remove updateBlock()
      // ✅ Firestore snapshot in chatStore will auto-update the state
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="details">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>lorem ipsum</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            {/* ... your photo list ... */}
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <button onClick={handleBlock} disabled={isCurrentUserBlocked}>
          {isCurrentUserBlocked
            ? "You were blocked by this user"
            : isReceiverBlocked
            ? "Unblock user"
            : "Block user"}
        </button>

        <button className="logout" onClick={() => auth.signOut()}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Details;
