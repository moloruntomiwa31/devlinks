<template>
  <div class="w-3/4 md:w-[450px] p-6 h-[250px]">
    <AppLogo />
    <div
      class="w-full bg-white h-[150px] my-4 p-4 rounded-lg flex flex-col gap-6 justify-center"
    >
      <h2 class="text-xl font-semibold capitalize">Go to Login Page</h2>
      <BaseButton
        buttonText="Login"
        buttonColor="bg-purple-secondary"
        @click="navigateTo('/login')"
        class="text-white p-2 rounded-lg bg-purple-secondary hover:bg-purple-primary hover:text-dark-gray-secondary"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
