import type User from "~/types/User";

export const useUser = defineStore("useUser", () => {
  const user = ref<User | null>(null);
  const first_name = ref<string>("");
  const last_name = ref<string>("");
  const email = ref<string>("");
  const image = ref<string>("");
  const isProfileComplete = computed(() => {
    return (
      first_name.value.length > 0 &&
      last_name.value.length > 0 &&
      email.value.length > 0
    );
  });
  //   const setUser = (newUser: User) => {
  //     user.value = newUser;
  //   };
  //   const clearUser = () => {
  //     user.value = null;
  //   };
  return {
    user,
    // setUser,
    // clearUser,
    image,
    first_name,
    last_name,
    email,
    isProfileComplete,
  };
});
