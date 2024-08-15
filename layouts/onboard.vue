<template>
  <div class="p-2 rounded-lg max-h-screen w-full min-h-screen">
    <!-- HEADER -->
    <div
      class="header w-full flex items-center justify-between bg-white p-3 rounded-lg h-[10vh]"
    >
      <div class="header flex items-center">
        <img src="~/assets/images/app-logo.svg" alt="app-logo" />
        <img
          src="~/assets/images/app-logo-text.svg"
          alt="app-logo"
          class="hidden md:inline"
        />
      </div>
      <div class="space-x-4">
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          :to="link.url"
          class="rounded-lg text-purple-secondary p-2 hover:bg-light-gray-secondary font-bold cursor-pointer"
        >
          <Icon :name="link.iconName" size="20px" />
          <span class="hidden md:inline">{{ link.name }}</span>
        </NuxtLink>
      </div>
      <div>
        <BaseButton
          buttonText="Preview"
          buttonColor="bg-white"
          class="border border-purple-secondary rounded-lg text-purple-secondary p-2 hover:bg-light-gray-secondary"
          @click="
            router.push({
              path: `/preview/${userStore.userId}`,
              query: { user: userStore.user.uid },
            })
          "
        />
        <BaseButton
          iconName="ic:outline-logout"
          iconSize="24px"
          buttonColor="bg-white"
          class="shadow w-10 h-10 ml-2 rounded-lg text-purple-secondary p-2 hover:bg-light-gray-secondary"
          @click="signOutUser"
        />
      </div>
    </div>
    <!-- BODY -->
    <div
      class="body w-full flex items-center justify-center gap-6 py-4 min-h-[88vh]"
    >
      <div class="relative w-2/5 bg-white rounded-lg h-[560px] hidden lg:block">
        <img
          src="~/assets/images/phone-frame.png"
          alt="phone-frame"
          class="w-full h-full object-cover"
        />
        <div
          class="skeleton-loader flexCenter flex-col absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-full"
        >
          <OnboardAvatar />
          <OnboardUserDetails />
          <OnboardDisplayLinks />
        </div>
      </div>
      <!-- DYNAMIC BODY -->
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type Link from "~/types/Link";
import useAuth from "~/composables/useAuth";
const { signOutUser } = useAuth();

const router = useRouter();
const links = ref<Link[]>([
  {
    name: "Links",
    url: "/dashboard/links",
    iconName: "dashicons:admin-links",
  },
  {
    name: "Profile Details",
    url: "/dashboard/profile",
    iconName: "gg:profile",
  },
]);
const userStore = useUser();
</script>

<style scoped>
.router-link-active {
  background-color: #d9d9d9;
}
.skeleton-loader {
  width: 100%;
}
</style>
