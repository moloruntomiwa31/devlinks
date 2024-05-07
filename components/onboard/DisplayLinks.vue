<template>
  <div>
    <AnimatedPlaceholder
      height="30px"
      width="150px"
      borderRadius="2px"
      v-for="i in 4"
      class="mb-4"
      v-if="links.length < 1"
    />
    <div v-else class="grid gap-2">
      <div
        class="w-[150px] h-[30px] rounded-[2px] flex items-center p-4"
        v-for="link in links"
        :style="{ backgroundColor: link.bgColor }"
      >
        <Icon :name="link.icon" :color="link.textColor"/>
        <a
          :href="link.link"
          target="_blank"
          class="capitalize font-xs ml-1"
          :style="{ color: link.textColor }"
          >{{ link.platform }}</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const devlinks = useDevLinks();
const { links } = storeToRefs(devlinks);
</script>

<style scoped></style>
