export const useToast = defineStore("useToast", () => {
  const showToast = ref(false);
  const toastText = ref("");
  const bgColor = ref("");
  const icon = ref("");

  const addToast = (text: string, status: string) => {
    showToast.value = true;
    toastText.value = text;
    switch (status) {
      case "success":
        bgColor.value = "#90D26D";
        icon.value = "icon-park-solid:success";
        break;
      case "error":
        bgColor.value = "#FF204E";
        icon.value = "ic:sharp-error";
        break;
      case "info":
        bgColor.value = "#ffc700";
        break;
    }
    setTimeout(() => {
      showToast.value = false;
      toastText.value = "";
      bgColor.value = "";
    }, 4000);
  };
  return { showToast, addToast, bgColor, toastText, icon };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToast, import.meta.hot));
}
