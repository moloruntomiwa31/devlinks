<template>
  <div class="relative m-2">
    <label class="text-sm">{{ labelText }}</label>
    <div @click="open = !open" class="cursor-pointer">
      <BaseButton
        :buttonText="selectedOption ? selectedOption.text : 'Select an option'"
        buttonColor="bg-white"
        class="text-left p-2 ml-auto rounded-lg bg-white border w-full focus:shadow-md focus:shadow-purple-primary focus:border-purple-secondary"
      />
      <Transition name="dropdown">
        <div v-show="open" class="absolute z-10 bg-white w-full rounded-lg">
          <div
            v-for="option in options"
            @click.stop="selectOption(option)"
            class="hover:cursor-pointer hover:bg-light-gray-primary p-2"
          >
            <Icon :name="option.icon" size="24px" />
            <span class="ml-2">{{ option.text }}</span>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type LinkOptions from "~/types/LinkOptions";

const props = defineProps({
  modelValue: String,
  labelText: String,
  options: Array,
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const selectedOption = ref(
  props.options!.find((o: any) => o.value === props.modelValue)
);

const selectOption = (option: LinkOptions) => {
  selectedOption.value = option;
  open.value = false;
  emit("update:modelValue", option);
};
</script>

<style scoped>
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
