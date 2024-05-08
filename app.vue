<template>
  <div>
    <NuxtLayout>
      <Toast v-show="toast.showToast" @close="toast.showToast = false" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const toast = useToast();
</script>
