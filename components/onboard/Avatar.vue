<template>
  <div>
    <AnimatedPlaceholder
      height="80px"
      width="80px"
      borderRadius="50%"
      class="mb-2"
      v-if="user.image === ''"
    />
    <img
      v-else
      :src="user.image"
      alt="User-Image"
      class="w-[80px] h-[80px] rounded-full border-2 border-purple-secondary p-1"
    />
  </div>
</template>

<script setup lang="ts">
const user = useUser();
</script>

<style scoped></style>
