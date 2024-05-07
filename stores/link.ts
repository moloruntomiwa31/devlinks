import type Devlink from "~/types/DevLink";

export const useDevLinks = defineStore("useDevLinks", () => {
  const links = ref<Devlink[]>([]);
  const numberOfLinks = ref(0);
  const addLink = (devlink: Devlink): void => {
    links.value.push(devlink);
  };
  const removeLink = (index: number): void => {
    links.value.splice(index, 1);
  };
  const updateLink = (index: number, updatedLink: Devlink): void => {
    links.value[index] = updatedLink;
  };
  return {
    links,
    addLink,
    numberOfLinks,
    removeLink,
    updateLink,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToast, import.meta.hot));
}
