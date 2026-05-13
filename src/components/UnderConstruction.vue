<script setup lang="ts">
defineProps<{
  name: string
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full p-20 text-center">
    <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
      <span class="text-4xl">🏗️</span>
    </div>
    <h2 class="text-2xl font-bold text-slate-900">{{ name }}</h2>
    <p class="text-slate-500 mt-2 max-w-md">
      当前模块正在开发中，敬请期待。我们正在努力完善 {{ name }} 的详细功能。
      该模块将包含深度的金融数据分析与专业报表功能。
    </p>
  </div>
</template>
