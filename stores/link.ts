import type Devlink from "~/types/DevLink";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { db, app } from "../firebaseInit";

export const useDevLinks = defineStore("useDevLinks", () => {
  const links = ref<Devlink[]>([]);
  const { user } = storeToRefs(useUser());
  const listenerSetUp = ref(false); 

  const auth = getAuth(app);
  const userLinksCollection = () =>
    collection(db, `users/${user.value.uid}/links`);

  const fetchLinks = async () => {
    if (!user.value) return;
    const querySnapshot = await getDocs(userLinksCollection());
    links.value = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Devlink[];
  };

  const addLink = async (devlink: Devlink) => {
    if (!user.value) return;
    await addDoc(userLinksCollection(), devlink);
  };
  const removeLink = async (index: number) => {
    if (!user.value) return;
    const linkId = links.value[index].id;
    await deleteDoc(doc(db, `users/${user.value.uid}/links/${linkId}`));
  };
  const updateLink = async (index: number, updatedLink: Devlink) => {
    if (!user.value) return;
    const linkId = links.value[index].id;
    await updateDoc(doc(db, `users/${user.value.uid}/links/${linkId}`), {
      ...updatedLink,
    });
  };

  const updateLinkOrder = async (newOrder: Devlink[]) => {
    links.value = newOrder;
    if (!user.value) return;
    const userDoc = doc(db, `users/${user.value.uid}`);
    await updateDoc(userDoc, { links: newOrder });
  };

  // Set up real-time listener
  const setupRealtimeListener = () => {
    if (!user.value || listenerSetUp.value) return;
    listenerSetUp.value = true;
    onSnapshot(userLinksCollection(), (snapshot) => {
      links.value = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Devlink[];
    });
  };

  // Call the real-time listener setup function
  setupRealtimeListener();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser;
      fetchLinks();
    }
  });

  return {
    links,
    addLink,
    removeLink,
    updateLink,
    fetchLinks,
    updateLinkOrder,
    setupRealtimeListener,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDevLinks, import.meta.hot));
}
