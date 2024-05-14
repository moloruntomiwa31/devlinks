import type User from "~/types/User";
import { v4 as uuidv4 } from 'uuid';
// import { supabase } from "~/supabase";

export const useUser = defineStore("useUser", () => {
  const user = ref(null);
  const first_name = ref<string>("");
  const last_name = ref<string>("");
  const email = ref<string>("");
  const image = ref<string>("");
  const userId = uuidv4();
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
  // supabase.auth.onAuthStateChange((event, session) => {
  //   console.log(event, session)
  // })
  //   const clearUser = () => {
  //     user.value = null;
  //   };
  return {
    userProfileDetails,
    user,
    setUser,
    // clearUser,
    userId,
    image,
    first_name,
    last_name,
    email,
    isProfileComplete,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
