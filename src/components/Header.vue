<script setup lang="ts">
import { Bell, Search, HelpCircle, Calendar } from 'lucide-vue-next';
</script>

<template>
  <header class="h-16 bg-white border-b border-ams-border flex items-center justify-between px-8 shrink-0">
    <div class="flex items-center gap-4 flex-1">
      <div class="relative w-96">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="搜索产品、组合或报告..." 
          class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-ams-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ams-accent/20 focus:border-ams-accent transition-all"
        />
      </div>
    </div>

    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2 text-slate-500">
        <Calendar class="w-4 h-4" />
        <span class="text-sm font-medium">2026年4月14日</span>
      </div>
      
      <div class="flex items-center gap-4">
        <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell class="w-5 h-5" />
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <HelpCircle class="w-5 h-5" />
        </button>
      </div>

      <div class="h-8 w-px bg-ams-border mx-2"></div>

      <div class="flex items-center gap-3">
        <div class="text-right">
          <p class="text-xs font-bold text-slate-900">AMS-PRO-001</p>
          <p class="text-[10px] text-ams-accent font-medium">高级专业版</p>
        </div>
      </div>
    </div>
  </header>
</template>
