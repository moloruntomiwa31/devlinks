<template>
  <form @submit.prevent="submit" v-bind="$attrs">
    <slot />
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "submit"): void;
}>();
const submit = () => {
  emit("submit");
};
</script>

<style scoped></style>
