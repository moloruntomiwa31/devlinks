<template>
  <div class="rounded-lg max-h-screen w-full min-h-screen">
    <!-- HEADER -->
    <div
      class="hero-wrapper md:bg-purple-secondary w-full h-[250px] p-3 rounded-bl-[2rem] rounded-br-[2rem]"
    >
      <div
        class="header w-full flex items-center justify-between md:bg-white p-3 rounded-lg h-[10vh]"
      >
        <BaseButton
          buttonText="Back to Editor"
          class="border border-purple-secondary rounded-lg text-purple-secondary p-4 md:p-2 hover:bg-light-gray-secondary"
          @click="router.back()"
        />
        <BaseButton
          buttonText="Copy Link"
          class="rounded-lg text-white bg-purple-secondary p-4 md:p-2 hover:bg-purple-primary hover:text-purple-secondary"
          @click="copyLink"
        />
      </div>
      <div
        class="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-white h-[600px] md:h-[400px] w-[80%] md:w-[300px] p-4 rounded-3xl"
      >
        <div class="flexCenter flex-col w-full">
          <OnboardAvatar height="100px" width="100px" />
          <OnboardUserDetails />
          <OnboardDisplayLinks containerHeight="200px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const toast = useToast();
const { addToast } = toast;

// definePageMeta({
// });
//functions
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    addToast("Link copied to clipboard", "success");
  } catch (err) {
    addToast("Failed to copy link: ", "error");
  }
};
//hooks
onMounted(() => {
  console.log(route.query.user);
});
</script>

<style scoped></style>
