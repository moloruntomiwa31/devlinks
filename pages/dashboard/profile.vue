<template>
  <main class="w-full lg:w-3/5 bg-white md:h-[560px] rounded-lg p-4">
    <TabLayout
      title="Profile Details"
      description="Add your details to create a personal touch to your profile."
    >
      <template #body>
        <div
          class="profile-header mt-4 h-[200px] bg-light-gray-primary w-full p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between"
        >
          <p class="text-sm text-dark-gray-primary">Profile picture</p>
          <div
            :class="{ 'text-white': user.image }"
            class="uploader cursor-pointer flexCenter flex-col text-purple-secondary bg-light-gray-secondary p-6 rounded-lg h-[150px] w-fit bg-contain"
            :style="{
              backgroundImage: user.image
                ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${user.image})`
                : '',
            }"
          >
            <Icon name="ph:image-bold" size="36px" />
            <BaseInput
              type="file"
              class="w-full font-bold cursor-pointer"
              labelText="Upload Image"
              accept=".png, .jpg, .jpeg"
              @change="handleImageUpload"
            />
          </div>
          <p class="text-sm text-dark-gray-primary">
            Image must be below 1024*1024px.<br />
            Use PNG or JPG format.
          </p>
        </div>

        <Form class="bg-light-gray-primary rounded-lg p-4 my-2 md:h-[200px]">
          <BaseInput
            labelText="First Name"
            placeholder="e.g John"
            type="text"
            class="grid md:grid-cols-2 mb-2"
            v-model.trim="first_name"
          />
          <BaseInput
            labelText="Last Name"
            placeholder="e.g Applessed"
            type="text"
            class="grid md:grid-cols-2 mb-2"
            v-model.trim="last_name"
          />
          <BaseInput
            labelText="Email"
            placeholder="e.g email@example.com"
            type="email"
            class="grid md:grid-cols-2 mb-2"
            v-model.trim="email"
          />
        </Form>
      </template>
    </TabLayout>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "onboard",
});
const user = useUser();
const toast = useToast();
const { first_name, last_name, email } = storeToRefs(user);

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.item(0);
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = function () {
        if (this.width > 1024 || this.height > 1024) {
          toast.addToast(
            "Image dimensions must be less than 1024x1024px",
            "error"
          );
        } else {
          user.image = (e.target as FileReader).result as string;
        }
      };
      img.src = URL.createObjectURL(file);
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped></style>
