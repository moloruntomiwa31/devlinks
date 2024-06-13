<template>
  <button
    @click="click"
    v-bind="$attrs"
    :class="{ disabled: disabled, buttonColor }"
    class="duration-200 font-bold outline-none"
    :disabled="disabled"
  >
    <Icon
      :name="rotate ? 'gg:spinner-two' : iconName"
      :class="{ 'rotate': rotate }"
      v-if="rotate || iconName"
    />
    <span class="ml-1">{{ buttonText }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  buttonText: String,
  buttonColor: String,
  iconName: {
    type: String || Boolean,
    default: false || "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rotate: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<{
  (e: "click"): void;
}>();
const click = () => {
  emit("click");
};
</script>

<style scoped>
.disabled {
  @apply cursor-not-allowed bg-light-gray-secondary text-white;
}
.rotate {
  @apply animate-spin;
}
</style>
