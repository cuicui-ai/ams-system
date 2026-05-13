<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { 
  BarChart3, 
  Layers, 
  Download, 
  Settings,
  ChevronDown,
  Info
} from 'lucide-vue-next';
import { use } from 'echarts/core';
import { RadarChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent, TooltipComponent, LegendComponent, PolarComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { cn } from '../lib/utils';

use([
  RadarChart, BarChart, CanvasRenderer, 
  GridComponent, TooltipComponent, LegendComponent, PolarComponent
]);

const props = defineProps<{
  initialTab?: string;
}>();

const activeTab = ref(props.initialTab || '因子风格');

watch(() => props.initialTab, (newVal) => {
  if (newVal) activeTab.value = newVal;
});

const styleData = [
  { factor: '市值', portfolio: 0.85, benchmark: 0.65 },
  { factor: '价值', portfolio: 0.42, benchmark: 0.50 },
  { factor: '动量', portfolio: 0.78, benchmark: 0.45 },
  { factor: '波动率', portfolio: 0.35, benchmark: 0.40 },
  { factor: '成长', portfolio: 0.92, benchmark: 0.70 },
  { factor: '流动性', portfolio: 0.58, benchmark: 0.55 },
];

const factorReturnData = [
  { date: '2026-01', size: 1.2, value: 0.5, momentum: 2.1, growth: 1.8 },
  { date: '2026-02', size: -0.5, value: 0.8, momentum: 1.5, growth: 2.2 },
  { date: '2026-03', size: 0.8, value: -0.2, momentum: -0.5, growth: 1.2 },
  { date: '2026-04', size: 1.5, value: 0.4, momentum: 1.8, growth: 2.5 },
];

const factorAttributionData = [
  { name: '基准收益', value: 3.2, color: '#94A3B8' },
  { name: '市值因子', value: 0.8, color: '#08255E' },
  { name: '价值因子', value: -0.3, color: '#F43F5E' },
  { name: '动量因子', value: 1.2, color: '#08255E' },
  { name: '成长因子', value: 1.5, color: '#08255E' },
  { name: '其他因子', value: 0.4, color: '#3B82F6' },
  { name: '组合收益', value: 6.8, color: '#10B981' },
];

const radarOption = computed(() => ({
  tooltip: { trigger: 'item' },
  legend: { data: ['本组合', '基准'], right: 10, top: 0 },
  radar: {
    indicator: styleData.map(d => ({ name: d.factor, max: 1 })),
    axisName: { color: '#64748B', fontSize: 12 },
    splitArea: { show: false },
    splitLine: { lineStyle: { color: '#E2E8F0' } }
  },
  series: [{
    type: 'radar',
    data: [
      {
        value: styleData.map(d => d.portfolio),
        name: '本组合',
        itemStyle: { color: '#08255E' },
        areaStyle: { opacity: 0.3 }
      },
      {
        value: styleData.map(d => d.benchmark),
        name: '基准',
        itemStyle: { color: '#94A3B8' },
        areaStyle: { opacity: 0.1 }
      }
    ]
  }]
}));

const exposureBarOption = computed(() => ({
  grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#F1F5F9' } } },
  yAxis: {
    type: 'category',
    data: styleData.map(d => d.factor),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#94A3B8', fontSize: 10 }
  },
  series: [
    {
      name: '组合暴露',
      type: 'bar',
      data: styleData.map(d => d.portfolio),
      itemStyle: { color: '#08255E', borderRadius: [0, 4, 4, 0] }
    },
    {
      name: '基准暴露',
      type: 'bar',
      data: styleData.map(d => d.benchmark),
      itemStyle: { color: '#94A3B8', borderRadius: [0, 4, 4, 0] }
    }
  ]
}));

const returnBarOption = computed(() => ({
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  tooltip: { trigger: 'axis' },
  legend: { right: 10, top: 0 },
  xAxis: {
    type: 'category',
    data: factorReturnData.map(d => d.date),
    axisLine: { show: false },
    axisTick: { show: false }
  },
  yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#F1F5F9' } } },
  series: [
    { name: '市值因子', type: 'bar', stack: 'total', data: factorReturnData.map(d => d.size), itemStyle: { color: '#08255E' } },
    { name: '价值因子', type: 'bar', stack: 'total', data: factorReturnData.map(d => d.value), itemStyle: { color: '#3B82F6' } },
    { name: '动量因子', type: 'bar', stack: 'total', data: factorReturnData.map(d => d.momentum), itemStyle: { color: '#94A3B8' } },
    { name: '成长因子', type: 'bar', stack: 'total', data: factorReturnData.map(d => d.growth), itemStyle: { color: '#10B981' } }
  ]
}));

const attributionOption = computed(() => ({
  grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'value', axisLine: { show: false } },
  yAxis: {
    type: 'category',
    data: factorAttributionData.map(d => d.name),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#94A3B8', fontSize: 10 }
  },
  series: [{
    type: 'bar',
    data: factorAttributionData.map(d => ({
      value: d.value,
      itemStyle: { color: d.color, borderRadius: [0, 4, 4, 0] }
    }))
  }]
}));
</script>

<template>
  <div class="p-8 space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">因子分析</h2>
        <p class="text-sm text-slate-500 mt-1">透视组合因子暴露，量化风格偏好与收益贡献</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-700">
          <Settings class="w-3.5 h-3.5" />
          选择因子模型
          <ChevronDown class="w-3.5 h-3.5" />
        </div>
        <button class="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md hover:bg-ams-secondary transition-all">
          <Download class="w-4 h-4" />
          导出因子分析结果
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-slate-200">
      <button
        v-for="tab in ['因子风格', '因子收益', '因子归因']"
        :key="tab"
        @click="activeTab = tab"
        :class="cn(
          'px-8 py-4 text-sm font-bold transition-all relative',
          activeTab === tab ? 'text-ams-primary' : 'text-slate-400 hover:text-slate-600'
        )"
      >
        {{ tab }}
        <div v-show="activeTab === tab" class="absolute bottom-0 left-0 right-0 h-1 bg-ams-primary rounded-t-full" />
      </button>
    </div>

    <!-- Content Area -->
    <div class="space-y-8">
      <div v-if="activeTab === '因子风格'" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="ams-card p-6">
          <h3 class="text-lg font-bold text-slate-900 mb-6">因子暴露雷达图 (组合 vs 基准)</h3>
          <div class="h-[400px]">
            <v-chart class="chart" :option="radarOption" autoresize />
          </div>
        </div>
        <div class="ams-card p-6">
          <h3 class="text-lg font-bold text-slate-900 mb-6">因子暴露偏离度</h3>
          <div class="h-[400px]">
            <v-chart class="chart" :option="exposureBarOption" autoresize />
          </div>
        </div>
      </div>

      <div v-if="activeTab === '因子收益'" class="space-y-8">
        <div class="ams-card p-6">
          <h3 class="text-lg font-bold text-slate-900 mb-6">因子收益贡献 (时间序列)</h3>
          <div class="h-[400px]">
            <v-chart class="chart" :option="returnBarOption" autoresize />
          </div>
        </div>
        <div class="ams-card">
          <div class="p-6 border-b border-slate-100">
            <h3 class="text-lg font-bold text-slate-900">因子收益明细表</h3>
          </div>
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <th class="px-6 py-4">因子名称</th>
                <th class="px-6 py-4 text-right">因子收益率 (%)</th>
                <th class="px-6 py-4 text-right">组合暴露度</th>
                <th class="px-6 py-4 text-right">贡献值 (%)</th>
                <th class="px-6 py-4">贡献评级</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="(row, i) in [
                { name: '市值因子', return: '1.25', exposure: '0.85', contribution: '1.06', status: '正向贡献' },
                { name: '价值因子', return: '0.42', exposure: '0.42', contribution: '0.18', status: '正向贡献' },
                { name: '动量因子', return: '1.85', exposure: '0.78', contribution: '1.44', status: '核心驱动' },
                { name: '波动率因子', return: '-0.52', exposure: '0.35', contribution: '-0.18', status: '负向拖累' },
                { name: '成长因子', return: '2.10', exposure: '0.92', contribution: '1.93', status: '核心驱动' }
              ]" :key="i" class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 font-bold text-slate-900">{{ row.name }}</td>
                <td class="px-6 py-4 text-right font-mono">{{ row.return }}</td>
                <td class="px-6 py-4 text-right font-mono">{{ row.exposure }}</td>
                <td :class="cn('px-6 py-4 text-right font-mono font-bold', row.contribution.startsWith('-') ? 'text-rose-600' : 'text-emerald-600')">
                  {{ row.contribution.startsWith('-') ? row.contribution : `+${row.contribution}` }}
                </td>
                <td class="px-6 py-4">
                  <span :class="cn(
                    'px-2 py-0.5 rounded text-[10px] font-bold',
                    row.status === '核心驱动' ? 'bg-emerald-100 text-emerald-700' : 
                    row.status === '负向拖累' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                  )">{{ row.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === '因子归因'" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="ams-card p-6">
          <h3 class="text-lg font-bold text-slate-900 mb-6">因子归因分解</h3>
          <div class="h-[400px]">
            <v-chart class="chart" :option="attributionOption" autoresize />
          </div>
        </div>
        <div class="ams-card p-6 flex flex-col justify-center">
          <div class="space-y-6 text-left">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-ams-primary/10 rounded-full flex items-center justify-center shrink-0">
                <Layers class="w-5 h-5 text-ams-primary" />
              </div>
              <div>
                <h4 class="font-bold text-slate-900">归因分解逻辑</h4>
                <p class="text-sm text-slate-500 mt-1">
                  因子归因系统性地将超额收益拆解为因子配置收益和因子选择收益。
                </p>
              </div>
            </div>
            <div class="p-6 bg-slate-50 rounded-xl">
              <h4 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info class="w-4 h-4 text-ams-accent" />
                分析结论
              </h4>
              <p class="text-xs text-slate-600 leading-relaxed">
                本报告期内，组合超额收益主要来源于对<b>成长因子</b>和<b>动量因子</b>的高暴露。市值因子的正向贡献抵消了价值因子的负向拖累。整体风格偏向高成长、高动量的大盘股。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart {
  height: 100%;
}
</style>
