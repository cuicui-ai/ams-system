<script setup lang="ts">
import UnderConstruction from './UnderConstruction.vue';
defineProps<{ name?: string }>();
</script>
<template>
  <UnderConstruction :name="name || '组合业绩归因'" />
</template>
