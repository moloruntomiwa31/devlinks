<template>
  <div class="relative border-none outline-none bg-transparent">
    <label
      v-if="labelText"
      class="text-sm"
      :for="labelText"
      :class="{ star: asterix }"
      >{{ labelText }}</label
    >
    <div>
      <input
        :value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        v-bind="$attrs"
        ref="input"
        v-model="modelValue"
        :class="inputClasses"
        :id="labelText"
        :style="{
          borderColor: errorMessage ? 'red' : '',
          boxShadow: errorMessage ? '0 0 4px rgba(255, 0, 0, 0.5)' : '',
        }"
      />
      <Icon
        name="mingcute:eye-2-fill"
        v-if="eye"
        size="24px"
        class="absolute right-6 top-[2.2rem] cursor-pointer z-50"
        @click="changeInputType"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  labelText: {
    type: [String, Boolean],
    default: false,
  },
  inputType: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  eye: {
    type: Boolean,
    default: false,
  },
  asterix: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: [Array, Boolean],
    default: false,
  },
});

const input = ref<HTMLInputElement | null>(null);
const modelValue = defineModel<string>();

const changeInputType = () => {
  input.value!.type = input.value!.type === "password" ? "text" : "password";
};
const inputClasses = computed(() => {
  if (props.inputType === "checkbox") {
    return "h-4 w-4 bg-red-primary p-2 border-none outline-none focus:outline-none";
  }
  return "border border-dark-gray-secondary outline-none focus:outline-none p-3 rounded-lg w-full mb-2 focus:border-purple-secondary focus:border-[0.12rem] focus:shadow-md focus:shadow-purple-primary placeholder:text-dark-gray-primary";
});
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="file"] {
  display: none;
}
.star:after {
  content: " *";
  color: inherit;
}
</style>
