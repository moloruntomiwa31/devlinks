import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import {app} from "~/firebaseInit";

export default function useAuth() {
  const { setUser, reset } = useUser();
  const { addToast } = useToast();
  const auth = getAuth(app);

  const logIn = async (email: string, password: string) => {
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);

      if (response.user) {
        addToast("Logged in successfully.", "success");
        setUser(response.user);
        navigateTo("/dashboard/links");
      }
    } catch (error) {
      addToast("Invalid email or password", "error");
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (response.user) {
        addToast("User successfully created", "success");
        setUser(response.user);
        navigateTo("/dashboard/links");
      }
    } catch (error) {
      addToast("Error occured", "error");
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
    reset();
    addToast("Logged Out", "success");
    navigateTo("/login");
  }
    
  return { logIn, signUp, signOutUser };
}
