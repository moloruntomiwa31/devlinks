<template>
  <div class="w-full md:w-[450px] p-6">
    <AppLogo />
    <div
      class="w-full h-auto my-4 p-4 rounded-lg flex flex-col justify-center bg-white"
    >
      <AuthHeader
        title="Create account"
        details="Let's get you started sharing your links!"
      />
      <Form class="mt-4" @submit="handleSignUp">
        <BaseInput
          v-model="emailAddress"
          labelText="Email address"
          inputType="email"
          placeholder="e.g alex@gmail.com"
          :errorMessage="errors.length > 0"
          class="mb-4"
        />
        <BaseInput
          v-model="password"
          labelText="Create Password"
          inputType="password"
          placeholder="At least 8 characters"
          :eye="true"
          :errorMessage="errors.length > 0"
          class="mb-4"
        />
        <BaseInput
          v-model="confirmPassword"
          labelText="Confirm Password"
          inputType="password"
          placeholder="At least 8 characters"
          :eye="true"
          :errorMessage="errors.length > 0"
          class="mb-2"
        />
        <div class="mb-4">
          <span v-for="error in errors" class="text-red-secondary"
            >{{ error }}.
          </span>
        </div>
        <BaseButton
          buttonText="Create an account"
          buttonColor="bg-purple-secondary"
          class="text-white p-2 bg-purple-secondary rounded-lg hover:bg-purple-primary hover:text-dark-gray-secondary w-full"
          :rotate="isRegistering"
        />
      </Form>
      <p class="text-center mt-4 text-dark-gray-primary">
        Already have an account?
        <NuxtLink to="/login" class="text-purple-secondary block md:inline"
          >Login</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signUp } = useAuth();
const { sameAs, isValidEmail } = useValidations();
const emailAddress = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
let errors = ref<any>([]);
const isRegistering = ref(false);
//validations

const handleSignUp = () => {
  isRegistering.value = true;
  //validations
  if (!isValidEmail(emailAddress.value)) {
    errors.value.push("Email field error");
    return false;
  } else if (!sameAs(password.value, confirmPassword.value)) {
    errors.value.push("Passwords might not be the same, minimum length is 8");
    return false;
  }
  //setup
  signUp(emailAddress.value, password.value);
  isRegistering.value = false;
  emailAddress.value = "";
  password.value = "";
  confirmPassword.value = "";
  errors.value = [];
};
</script>

<style scoped></style>
