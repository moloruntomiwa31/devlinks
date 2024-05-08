import type User from "~/types/User";

export const useUser = defineStore("useUser", () => {
  const first_name = ref<string>("");
  const last_name = ref<string>("");
  const email = ref<string>("");
  const image = ref<string>("");
  const userId = useId();
  const isProfileComplete = computed(() => {
    return (
      first_name.value.length > 0 &&
      last_name.value.length > 0 &&
      email.value.length > 0
    );
  });
  const user = computed<User>(() => {
    return {
      first_name: first_name.value,
      last_name: last_name.value,
      image: image.value,
      email: email.value,
      id: userId,
    };
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
