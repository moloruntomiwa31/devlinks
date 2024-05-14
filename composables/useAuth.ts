import { supabase } from "~/supabase";

export default function useAuth() {
  const { setUser } = useUser();
  const { addToast } = useToast();

  const logIn = async (email: string, password: string) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      addToast(error.message, "error");
      return;
    }

    addToast("Logged in successfully.", "success");
    setUser(data.user);
    navigateTo("/dashboard/links");
  };

  const signUp = async (email: string, password: string) => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      addToast(error.message, "error");
      return;
    }

    addToast("Verification link has been sent to your email.", "success");
    setUser(data.user);
  };
  return { logIn, signUp };
}
