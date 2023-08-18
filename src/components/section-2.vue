<script setup lang="ts">
const emit = defineEmits<{
  change: [string];
}>();

defineProps<{
  value: string;
}>();

const regions = [
  { slug: "us", name: "United States" },
  { slug: "ca", name: "Canada" },
  { slug: "eu", name: "Europe" },
] as const;
</script>

<template>
  <div class="grid grid-cols-8 gap-3">
    <button
      class="p-4 border-2 border-neutral-700 rounded-md data-[state=active]:border-blue-500"
      v-for="region in regions"
      :key="region.slug"
      :data-state="region.slug === value ? 'active' : 'inactive'"
      @click="emit('change', region.slug)"
    >
      {{ region.name }}
    </button>
  </div>
</template>
