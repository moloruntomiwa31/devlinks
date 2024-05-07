<template>
  <div class="bg-light-gray-primary w-full rounded-lg my-8">
    <div class="devlink-head flex items-center justify-between">
      <BaseButton
        :buttonText="`Link #${index + 1}`"
        iconName="heroicons:bars-2-solid"
        buttonColor="bg-white"
        class="p-2 rounded-lg text-dark-gray-secondary hover:text-purple-secondary"
      />
      <BaseButton
        buttonText="Remove"
        buttonColor="bg-white"
        @click="removeLink(index)"
        class="p-2 rounded-lg text-dark-gray-secondary hover:text-purple-secondary"
      />
    </div>
    <div class="devlink-body">
      <CustomSelectOption
        labelText="Platform"
        :options="linkOptions"
        v-model.trim="selectedOption"
        @update:modelValue="updateOption"
      />
      <BaseInput
        labelText="Link"
        inputType="text"
        placeholder="e.g, https://www.example.com"
        class="w-full p-2 rounded-lg border border-dark-gray-primary"
        v-model.trim="inputedLink"
        @update:modelValue="updateLink"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type LinkOptions from "~/types/LinkOptions";
import type DevLink from "~/types/DevLink.ts";
//props and emitions
const props = defineProps<{
  index: number;
  link: DevLink;
}>();

const emit = defineEmits<{
  (e: "removeLink", value: number): void;
  (e: "updateLink", value: string): void;
  (e: "updateOption", value: LinkOptions): void;
}>();
const removeLink = (index: number) => {
  emit("removeLink", index);
};
//datas and functions
const selectedOption = ref(props.link.platform);
const inputedLink = ref(props.link.link);

const updateOption = (option: LinkOptions) => {
  selectedOption.value = option.value;
  emit("updateOption", option);
};
const updateLink = (value: string) => {
  inputedLink.value = value;
  emit("updateLink", value);
};
const linkOptions = ref<LinkOptions[]>([
  {
    value: "twitter",
    text: "Twitter",
    icon: "mdi:twitter",
    bgColor: "#4793AF",
    textColor: "#fff",
  },
  {
    value: "facebook",
    text: "Facebook",
    icon: "ic:baseline-facebook",
    bgColor: "#00224D",
    textColor: "#fff",
  },
  {
    value: "linkedin",
    text: "LinkedIn",
    icon: "mdi:linkedin",
    bgColor: "#0C359E",
    textColor: "#fff",
  },
  {
    value: "github",
    text: "GitHub",
    icon: "mdi:github",
    bgColor: "#000",
    textColor: "#fff",
  },
  {
    value: "frontend mentor",
    text: "Frontend Mentor",
    icon: "simple-icons:frontendmentor",
    bgColor: "#fff",
    textColor: "#000",
  },
  {
    value: "youtube",
    text: "Youtube",
    icon: "mdi:youtube",
    bgColor: "#C70039",
    textColor: "#fff",
  },
  {
    value: "twitch",
    text: "Twitch",
    icon: "mdi:twitch",
    bgColor: "#9F0D7F",
    textColor: "#fff",
  },
  {
    value: "devto",
    text: "Dev.to",
    icon: "fa6-brands:dev",
    bgColor: "#222831",
    textColor: "#fff",
  },
  {
    value: "code wars",
    text: "Codewars",
    icon: "simple-icons:codewars",
    bgColor: "#32012F",
    textColor: "#fff",
  },
  {
    value: "freecodecamp",
    text: "freeCodeCamp",
    icon: "simple-icons:freecodecamp",
    bgColor: "#22092C",
    textColor: "#fff",
  },
  {
    value: "gitlab",
    text: "GitLab",
    icon: "mdi:gitlab",
    bgColor: "#9A031E",
    textColor: "#fff",
  },
  {
    value: "hashnode",
    text: "Hashnode",
    icon: "simple-icons:hashnode",
    bgColor: "#1B3C73",
    textColor: "#fff",
  },
  {
    value: "stackoverflow",
    text: "Stack Overflow",
    icon: "mdi:stackoverflow",
    bgColor: "#FFAF45",
    textColor: "#fff",
  },
]);
</script>

<style scoped></style>
