<template>
  <div class="header space-y-4">
    <h2 class="text-2xl font-bold capitalize">{{ title }}</h2>
    <p class="text-dark-gray-primary">
        {{ details }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  details: string;
}>();
</script>

<style scoped></style>
