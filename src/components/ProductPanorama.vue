<script setup lang="ts">
import UnderConstruction from './UnderConstruction.vue';
defineProps<{ name?: string }>();
</script>
<template>
  <UnderConstruction :name="name || '产品全景'" />
</template>
