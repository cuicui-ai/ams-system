<script setup lang="ts">
import UnderConstruction from './UnderConstruction.vue';
defineProps<{ name?: string }>();
</script>
<template>
  <UnderConstruction :name="name || '相关性分析'" />
</template>
