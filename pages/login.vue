<template>
  <div class="w-full md:w-[450px] h-[500px] p-6">
    <AppLogo />
    <div
      class="w-full h-auto my-4 p-4 rounded-lg flex flex-col justify-center bg-white"
    >
      <AuthHeader
        title="Login"
        details="Add your details below to get back into the app."
      />
      <Form class="mt-4">
        <BaseInput
          v-model="email"
          labelText="Email address"
          inputType="email"
          placeholder="Enter your email"
          class="mb-4"
        />
        <BaseInput
          v-model="password"
          labelText="Password"
          inputType="password"
          placeholder="At least 8 characters long"
          :eye="true"
          class="mb-4"
        />
        <BaseButton
          buttonText="Login"
          buttonColor="bg-purple-secondary"
          @click="navigateTo('/dashboard/links')"
          class="text-white p-2 bg-purple-secondary rounded-lg hover:bg-purple-primary hover:text-dark-gray-secondary w-full"
        />
      </Form>
      <p class="text-center mt-4 text-dark-gray-primary">
        Don't have an account?
        <NuxtLink to="/register" class="text-purple-secondary block md:inline"
          >Create account</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref<string>("");
const password = ref<string>("");
</script>

<style scoped></style>
