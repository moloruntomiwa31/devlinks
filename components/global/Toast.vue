<template>
  <Transition name="toast">
    <div
      id="toast-default"
      class="toast flex items-center w-full md:w-full max-w-xs p-4 bg-black rounded-lg shadow"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
      >
        <Icon :name="toast.icon" size="24px" :color="toast.bgColor" />
      </div>
      <div class="ms-3 text-sm font-normal text-white-primary">
        {{ toast.toastText }}
      </div>
      <button
        @click="handleToast"
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 bg-white-primary rounded-lg focus:ring-2 focus:ring-light-gray-primary p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        data-dismiss-target="#toast-default"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const toast = useToast();
const emit = defineEmits(["close"]);
const handleToast = () => {
  emit("close");
};
const clearToast = () => {
  toast.toastText = "";
  toast.bgColor = "";
};
</script>

<style scoped>
.toast-enter-from,
.toast-leave-to {
  transform: translateY(100%);
}
.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s ease-in-out;
}
.toast {
  position: fixed;
  right: 40%;
  bottom: 20px;
  z-index: 1000;
}
@media screen and (max-width: 450px) {
  .toast {
    right: 5%;
  }  
}
</style>
