<script setup lang="ts">
import { ref, watch } from 'vue';
import { 
  ChevronRight
} from 'lucide-vue-next';
import { cn } from '../lib/utils';

interface NavItemProps {
  icon: any;
  label: string;
  active?: boolean;
  subItems?: string[];
  currentSubItem?: string;
}

const props = defineProps<NavItemProps>();
const emit = defineEmits(['click', 'subItemClick']);

const isOpen = ref(props.active);

watch(() => props.active, (newVal) => {
  if (newVal) isOpen.value = true;
});

const handleMainClick = () => {
  isOpen.value = !isOpen.value;
  emit('click');
};
</script>

<template>
  <div class="mb-1">
    <button
      @click="handleMainClick"
      :class="cn(
        'w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors rounded-md group text-left',
        active && !subItems
          ? 'bg-ams-accent/10 text-white' 
          : 'text-slate-400 hover:bg-white/5 hover:text-white'
      )"
    >
      <div class="flex items-center gap-3">
        <component 
          :is="icon" 
          :class="cn('w-4 h-4', active ? 'text-ams-accent' : 'text-slate-400 group-hover:text-white')" 
        />
        <span>{{ label }}</span>
      </div>
      <ChevronRight 
        v-if="subItems" 
        :class="cn('w-3.5 h-3.5 transition-transform', isOpen ? 'rotate-90' : '')" 
      />
    </button>
    <div v-if="subItems && isOpen" class="mt-1 ml-9 space-y-1">
      <button
        v-for="item in subItems"
        :key="item"
        @click="emit('subItemClick', item)"
        :class="cn(
          'w-full text-left px-2 py-1.5 text-xs transition-colors',
          currentSubItem === item ? 'text-ams-accent font-bold' : 'text-slate-400 hover:text-white'
        )"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>
