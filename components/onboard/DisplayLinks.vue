<template>
  <div>
    <AnimatedPlaceholder
      height="30px"
      :width="placeholderWidth"
      borderRadius="2px"
      v-for="i in 2"
      class="mb-4"
      v-if="links.length < 1"
    />
    <div
      v-else
      class="grid overflow-y-auto mt-2"
      :style="{ 'max-height': containerHeight }"
    >
      <div
        class="w-[150px] h-[30px] rounded-[2px] flex items-center p-4 mt-1"
        v-for="link in links"
        :style="{ backgroundColor: link.bgColor }"
      >
        <Icon :name="link.icon" :color="link.textColor" />
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
defineProps({
  containerHeight: {
    type: String,
    default: "150px",
  },
  placeholderWidth: {
    type: String,
    default: "150px",
  },
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-thumb {
  @apply bg-purple-secondary rounded-xl;
}

::-webkit-scrollbar-track {
  @apply bg-light-gray-secondary rounded-xl;
}
</style>
