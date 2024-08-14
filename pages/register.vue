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
        <BaseInput v-for="field in inputFields" :key="field.label"
          v-model="field.value"
          :labelText="field.label"
          :inputType="field.type"
          :placeholder="field.placeholder"
          :eye="field.eye"
          :errorMessage="field.error"
          class="mb-4"
        />
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
const isRegistering = ref(false);

//inputFields
const inputFields = ref([
  {
    label: "Email",
    placeholder: "e.g example@gmail.com",
    type: "email",
    value: "",
    error: "",
  },
  {
    label: "Password",
    placeholder: "At least 8 characters long",
    type: "password",
    eye: true,
    value: "",
    error: "",
  },
  {
    label: "Confirm Password",
    placeholder: "At least 8 characters long",
    type: "password",
    eye: true,
    value: "",
    error: "",
  },
]);
//validations

const handleSignUp = async () => {
  isRegistering.value = true;
  // // Clear previous errors
  inputFields.value.forEach((field) => (field.error = ""));

  // Validate email
  const emailField = inputFields.value.find((field) => field.type === "email");
  if (!isValidEmail(emailField!.value)) {
    emailField!.error = "Invalid email";
    return;
  }

  // // Validate password length
  const passwordField = inputFields.value.find(
    (field) => field.type === "password"
  );
  if (passwordField!.value.length < 8) {
    passwordField!.error = "Password must be at least 8 characters long";
    return;
  }else if (!sameAs(inputFields.value[1].value, inputFields.value[2].value)) {
    passwordField!.error = "Passwords must be the same";
    return false;
  }

  try {
    await signUp(inputFields.value[0].value, inputFields.value[1].value);
    isRegistering.value = false;
    resetForm();
  } catch (error) {
    isRegistering.value = false;
  }
};
const resetForm = () => {
  inputFields.value.forEach((field) => (field.value = ""));
};
</script>

<style scoped></style>
