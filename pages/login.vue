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
      <Form class="mt-4" @submit="handleLogIn">
        <BaseInput
          v-for="field in inputFields"
          :key="field.label"
          v-model="field.value"
          :labelText="field.label"
          :inputType="field.type"
          :placeholder="field.placeholder"
          :eye="field.eye"
          :errorMessage="field.error"
          class="mb-4"
        />
        <BaseButton
          buttonText="Login"
          buttonColor="bg-purple-secondary"
          class="text-white p-2 bg-purple-secondary rounded-lg hover:bg-purple-primary hover:text-dark-gray-secondary w-full"
          :rotate="isLoggingIn"
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
const { isValidEmail } = useValidations();
const { logIn } = useAuth();
const isLoggingIn = ref(false);

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
]);

// const errors = computed(() => inputFields.value.filter((field) => field.error));

// const formInvalid = computed(() => {
//   watch(inputFields, () => {
//     return errors.value.length > 0;
//   });
// });

const errorExists = computed(() => {
  return inputFields.value.filter((field) => field.error.length > 1);
});

const handleLogIn = async () => {
  isLoggingIn.value = true;
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
  }

  try {
    await logIn(inputFields.value[0].value, inputFields.value[1].value);
    isLoggingIn.value = false;
    resetForm();
  } catch (error) {
    isLoggingIn.value = false;
  }
};

const resetForm = () => {
  inputFields.value.forEach((field) => (field.value = ""));
};
</script>

<style scoped></style>
