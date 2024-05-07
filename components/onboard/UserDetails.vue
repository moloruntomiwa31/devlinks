<template>
  <div>
    <AnimatedPlaceholder
      height="10px"
      width="100px"
      borderRadius="2px"
      class="mb-2"
      v-if="!first_name && !last_name"
    />
    <p class="text-base text-black font-bold capitalize max-w-[100px] text-center" v-else>{{ first_name }} {{ last_name }}</p>
  </div>
  <div>
    <AnimatedPlaceholder
      height="10px"
      width="100px"
      borderRadius="2px"
      class="mb-2"
      v-if="!email"
    />
    <p class="text-[0.7rem] text-dark-gray-primary" v-else>{{ email }}</p>
  </div>
</template>

<script setup lang="ts">
const user = useUser();
const {first_name, last_name, email} = storeToRefs(user);
</script>

<style scoped></style>
