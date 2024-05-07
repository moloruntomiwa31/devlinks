<template>
  <div class="relative m-2">
    <label class="text-sm">{{ labelText }}</label>
    <div @click="open = !open" class="cursor-pointer">
      <BaseButton
        :buttonText="selectedOption ? selectedOption.text : 'Select an option'"
        buttonColor="bg-white"
        class="text-left p-2 ml-auto rounded-lg bg-white border w-full focus:shadow-md focus:shadow-purple-primary focus:border-purple-secondary"
      />
      <div v-if="open" class="absolute z-10 bg-white w-full rounded-lg">
        <div
          v-for="option in options"
          @click.stop="selectOption(option)"
          class="hover:cursor-pointer hover:bg-light-gray-primary p-2"
        >
          <Icon :name="option.icon" size="24px" />
          <span class="ml-2">{{ option.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type LinkOptions from '~/types/LinkOptions';

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
</style>
