<template>
  <div class="placeholder" v-bind="$attrs">&nbsp;</div>
</template>

<script setup lang="ts">
defineProps<{
  height: string;
  width: string;
  borderRadius: string;
}>();
</script>

<style scoped>
@keyframes bgAnimate {
  0% {
    background-position: 50%, 0;
  }
  100% {
    background-position: -150%, 0;
  }
}
.placeholder {
  height: v-bind(height);
  width: v-bind(width);
  border-radius: v-bind(borderRadius);
  background-image: linear-gradient(
    to right,
    #bebfc1 0%,
    #e2e3e4 10%,
    #bebfc1 20%,
    #bebfc1 100%
  );
  background-size: 200% 100%;
  animation: bgAnimate 1.2s linear infinite;
}
</style>
