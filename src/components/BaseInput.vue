<template>
  <label :for="uuid">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    @input="$emit('update:modelValue', $event.target.value)"
    class="field"
    :id="uuid"
    :aria-describedby="error ? `${uuid}-error` : null"
    :aria-invalid="error ? true : null"
  />
  <p
    aria-live="assertive"
    v-if="error"
    class="error-message"
    :id="`${uuid}-error`"
  >
    {{ error }}
  </p>
</template>

<script>
import UniqueID from "../features/UniqueID";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  setup() {
    const uuid = UniqueID().getID();
    return { uuid };
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
