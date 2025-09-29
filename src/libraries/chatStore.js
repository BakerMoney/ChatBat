import { doc, onSnapshot } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";
import { useUserStore } from "./userStore";

export const useChatStore = create((set, get) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // initial check
    if (user.blocked.includes(currentUser.id)) {
      set({
        chatId,
        user,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    } else if (currentUser.blocked.includes(user.id)) {
      set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    } else {
      set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }

    // listen to currentUser's "blocked" field in real time
    const unsub = onSnapshot(doc(db, "users", currentUser.id), (docSnap) => {
      if (!docSnap.exists()) return;
      const blocked = docSnap.data().blocked || [];
      set({
        isReceiverBlocked: user ? blocked.includes(user.id) : false,
      });
    });

    // listen to other user's "blocked" field in real time
    const unsub2 = onSnapshot(doc(db, "users", user.id), (docSnap) => {
      if (!docSnap.exists()) return;
      const blocked = docSnap.data().blocked || [];
      set({
        isCurrentUserBlocked: blocked.includes(currentUser.id),
      });
    });

    return () => {
      unsub();
      unsub2();
    };
  },
}));
