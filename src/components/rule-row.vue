<script setup lang="ts">
import { type Rule } from "../types";
import { useField } from "vee-validate";
import Field from "./field.vue";

const emit = defineEmits<{
  delete: [];
  add: [];
}>();

const props = defineProps<{
  rule: Rule;
  index: number;
}>();

// !!! next line cuase the issue on hot reload !!!
// Maximum recursive updates exceeded in component <App>. This means you have a reactive effect
// that is mutating its own dependencies and thus recursively triggering itself. Possible sources
// include component template, render function, updated hook or watcher source function.
const { value: port, name } = useField<Rule["port"]>(
  () => `rules[${props.index}].port`
);

// console.log("change here to cause hot reload and see the issue in devtools");
</script>

<template>
  <div class="flex items-center gap-10 border rounded-xl p-4">
    <div>
      <Field id="port" v-model.number="port" :name="name" />
    </div>
    <button @click="emit('add')">
      {{ rule.certificate?.name ?? "No certificate" }}
    </button>
    <button
      type="button"
      @click="emit('delete')"
      class="h-10 px-4 rounded-md bg-red-500"
    >
      Delete
    </button>
  </div>
</template>
