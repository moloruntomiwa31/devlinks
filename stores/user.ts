import type User from "~/types/User";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { db, app } from "~/firebaseInit";

export const useUser = defineStore("useUser", () => {
  const user = ref(null);
  const first_name = ref<string>("");
  const last_name = ref<string>("");
  const email = ref<string>("");
  const image = ref<string>("");
  const userId = uuidv4();

  const auth = getAuth(app);

  const fetchUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        first_name.value = userData.first_name || "";
        last_name.value = userData.last_name || "";
        email.value = userData.email || "";
        image.value = userData.image || "";
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const isProfileComplete = computed(() => {
    return (
      first_name.value.length > 0 &&
      last_name.value.length > 0 &&
      email.value.length > 0
    );
  });
  const userProfileDetails = computed<User>(() => {
    return {
      first_name: first_name.value,
      last_name: last_name.value,
      image: image.value,
      email: email.value,
      id: userId,
    };
  });
  const setUser = (newUser: any) => {
    user.value = newUser;
  };

  const reset = () => {
    user.value = null;
    first_name.value = "";
    last_name.value = "";
    email.value = "";
    image.value = "";
  };

  fetchUserData();

  // Set up onAuthStateChanged to keep user logged in
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user);
      const userId = user.uid; // Assuming user.id is the unique identifier
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.image) {
          image.value = userData.image;
        }
        if (userData.first_name) {
          first_name.value = userData.first_name;
        }
        if (userData.last_name) {
          last_name.value = userData.last_name;
        }
        if (userData.email) {
          email.value = userData.email;
        }
      }
    } else {
      setUser(null);
    }
  });

  return {
    userProfileDetails,
    user,
    setUser,
    userId,
    image,
    first_name,
    last_name,
    email,
    isProfileComplete,
    reset,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
