<script setup lang="ts">
const emit = defineEmits<{
  "update:modelValue": [value: string | number | undefined];
}>();

defineProps<{
  modelValue: string | number | undefined;
  id: string;
}>();
</script>

<template>
  <input
    :id="id"
    type="text"
    :value="modelValue"
    @input="(e) => emit('update:modelValue', e.target.value)"
    class="border px-4 h-10 rounded-md border-neutral-700 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
  />
</template>
