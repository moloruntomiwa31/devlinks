<template>
  <div class="header">
    <h2 class="text-xl font-bold">{{ title }}</h2>
    <p class="details text-base text-dark-gray-primary">
      {{ description }}
    </p>
  </div>
  <slot name="body" />
  <div class="border border-dark-gray-primary w-full"></div>
  <BaseButton
    buttonText="Save"
    buttonColor="bg-white"
    :disabled="isDisabled"
    class="p-2 mt-2 ml-auto rounded-lg text-purple-secondary hover:bg-light-gray-secondary w-[100px]"
    @click="handleSave"
  />
</template>

<script setup lang="ts">
const devLinks = useDevLinks();
const user = useUser();
const isDisabled = computed(() => {
  return devLinks.numberOfLinks === 0 || !user.isProfileComplete;
});
defineProps<{
  title: string;
  description: string;
}>();
const emit = defineEmits<{
  (e: "handleSave"): void;
}>();
const handleSave = () => {
  emit("handleSave");
};
</script>

<style scoped></style>
