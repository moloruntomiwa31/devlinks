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
      class="rounded-full border-2 border-purple-secondary"
      :style="{ 'height': height, 'width': width }"
    />
  </div>
</template>

<script setup lang="ts">
const user = useUser();
defineProps({
  height: {
    type: String,
    default: "80px",
  },
  width: {
    type: String,
    default: "80px",
  },
});
</script>

<style scoped></style>
