<script setup lang="ts">
import UnderConstruction from './UnderConstruction.vue';
defineProps<{ name?: string }>();
</script>
<template>
  <UnderConstruction :name="name || '组合盈亏分析'" />
</template>
