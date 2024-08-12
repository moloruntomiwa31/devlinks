<template>
  <main class="w-full lg:w-3/5 bg-white md:h-[560px] rounded-lg p-4">
    <TabLayout
      title="Profile Details"
      description="Add your details to create a personal touch to your profile."
      @handleSave="handleSave"
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
            Image must be below 1024x1024px.<br />
            Use PNG or JPG format.
          </p>
        </div>

        <Form class="bg-light-gray-primary rounded-lg p-4 my-2 md:h-[200px]">
          <BaseInput
            v-for="i in inputfields"
            :labelText="i.label"
            :placeholder="i.placeholder"
            :type="i.type"
            :asterix="true"
            class="grid md:grid-cols-2 mb-2"
            v-model.trim="i.value"
          />
        </Form>
      </template>
    </TabLayout>
  </main>
</template>

<script setup lang="ts">
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseInit";

const storage = getStorage();
definePageMeta({
  layout: "onboard",
});
const user = useUser();
const toast = useToast();
const { first_name, last_name, email } = storeToRefs(user);
const { addToast } = toast;

const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.item(0);
  if (file) {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const img = new Image();
      img.onload = async function () {
        const imageIsNotPerfect = computed(
          () => this.width > 1024 || this.height > 1024
        );
        if (imageIsNotPerfect.value) {
          addToast("Image dimensions must be less than 1024x1024px", "error");
        } else {
          if (user.image) {
            const oldImageRef = storageRef(storage, user.image);
            await deleteObject(oldImageRef).catch((error) => {
              console.error("Error deleting old image:", error);
            });
          }

          // Use user ID to create a unique file name
          const userId = user.user.uid; // Assuming user.id is the unique identifier
          const fileExtension = file.name.split(".").pop();
          const uniqueFileName = `${userId}.${fileExtension}`;

          // Upload the new image
          const storageReference = storageRef(
            storage,
            `images/${uniqueFileName}`
          );
          await uploadBytes(storageReference, file);
          const downloadURL = await getDownloadURL(storageReference);
          user.image = downloadURL;
        }
      };
      img.src = URL.createObjectURL(file);
    };
    reader.readAsDataURL(file);
  }
};

const handleSave = async () => {
  try {
    const userId = user.user.uid; // Assuming user.id is the unique identifier
    console.log(userId);
    
    const userDocRef = doc(db, "users", userId); // Reference to the user document in Firestore

    // Update the user document in Firestore
    await setDoc(userDocRef, {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      image: user.image,
    }, { merge: true }); 

    // Reflect the changes in the local user object
    user.first_name = first_name.value;
    user.last_name = last_name.value;
    user.email = email.value;
    addToast("Profile updated successfully", "success");
  } catch (error) {
    console.error("Error updating profile:", error);
    addToast("Error updating profile", "error");
  }
};

const inputfields = ref([
  {
    label: "First name",
    placeholder: "e.g John",
    type: "text",
    value: first_name,
  },
  {
    label: "Last name",
    placeholder: "e.g Doe",
    type: "text",
    value: last_name,
  },
  {
    label: "Email",
    placeholder: "e.g example@gmail.com",
    type: "email",
    value: email,
  },
]);

onMounted(async () => {
  const userId = user.user.uid; // Assuming user.id is the unique identifier
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    if (userData.image) {
      user.image = userData.image;
    }
    if (userData.first_name) {
      user.first_name = userData.first_name;
    }
    if (userData.last_name) {
      user.last_name = userData.last_name;
    }
    if (userData.email) {
      user.email = userData.email;
    }
  }
});
</script>

<style scoped></style>
