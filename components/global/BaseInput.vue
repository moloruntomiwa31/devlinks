<template>
  <div class="relative border-none outline-none bg-transparent">
    <label
      v-if="labelText"
      class="text-sm"
      :for="labelText.toString()"
      :class="{ star: asterix }"
      >{{ labelText }}</label
    >
    <div>
      <input
        :value="modelValue"
        :type="currentInputType"
        :placeholder="placeholder"
        v-bind="$attrs"
        ref="input"
        v-model="modelValue"
        :class="inputClasses"
        :id="labelText.toString()"
        :style="{
          borderColor: errorMessage ? 'red' : '',
          boxShadow: errorMessage ? '0 0 4px rgba(255, 0, 0, 0.5)' : '',
        }"
      />
      <Icon
        :name="eyeIcon"
        v-if="eye"
        size="24px"
        class="absolute right-6 top-[2.2rem] cursor-pointer z-50"
        @click="toggleInputType"
      />
    </div>
    <p v-if="errorMessage" class="text-red-500 text-sm text-red-secondary">
      {{ errorMessage }}
    </p>
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
    type: [Array, String],
    default: false,
  },
});

const input = ref<HTMLInputElement | null>(null);
const modelValue = defineModel<string>();

const closedEye = "mdi:eye-off-outline";
const openEye = "mingcute:eye-2-fill";

const currentInputType = ref(props.inputType);

const eyeIcon = computed(() => {
  return currentInputType.value === "password" ? closedEye : openEye;
});

const toggleInputType = () => {
  currentInputType.value =
    currentInputType.value === "password" ? "text" : "password";
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
