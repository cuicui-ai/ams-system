<script setup lang="ts">
import { 
  TrendingUp, 
  Users, 
  Activity, 
  ArrowUpRight, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Clock, 
  ShieldCheck, 
  Download,
  Settings
} from 'lucide-vue-next';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, VisualMapComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { cn } from '../lib/utils';
import { computed } from 'vue';

use([CanvasRenderer, LineChart, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, VisualMapComponent]);

const scaleData = [
  { month: '2025-05', scale: 15000, sub: 500, red: 200 },
  { month: '2025-07', scale: 16500, sub: 800, red: 300 },
  { month: '2025-09', scale: 16000, sub: 400, red: 900 },
  { month: '2025-11', scale: 18000, sub: 2500, red: 500 },
  { month: '2026-01', scale: 19500, sub: 2000, red: 500 },
  { month: '2026-03', scale: 21845, sub: 3000, red: 655 },
];

const feeData = [
  { name: '管理费', amount: 124.5, ratio: '0.57%' },
  { name: '托管费', amount: 21.8, ratio: '0.10%' },
  { name: '交易佣金', amount: 45.2, ratio: '0.21%' },
  { name: '其他费用', amount: 8.4, ratio: '0.04%' },
];

const efficiencyData = [
  { label: '估值核算及时率', value: '99.8%', status: 'Normal' },
  { label: '对账完成率', value: '100%', status: 'Normal' },
  { label: '报告生成耗时', value: '2.4 min', status: 'Fast' },
  { label: '指令处理时长', value: '15.2 sec', status: 'Fast' },
];

const scaleOption = computed(() => ({
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: scaleData.map(d => d.month),
    axisLine: { show: false },
    axisTick: { show: false }
  },
  yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#F1F5F9' } } },
  series: [{
    name: '管理规模',
    type: 'line',
    data: scaleData.map(d => d.scale),
    smooth: true,
    lineStyle: { width: 3, color: '#08255E' },
    areaStyle: {
      color: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{ offset: 0, color: '#08255E33' }, { offset: 1, color: '#08255E00' }]
      }
    },
    symbol: 'none'
  }]
}));

const dynamicOption = computed(() => ({
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  tooltip: { trigger: 'axis' },
  legend: { data: ['申购', '赎回'], right: 10, top: 0 },
  xAxis: {
    type: 'category',
    data: scaleData.map(d => d.month),
    axisLine: { show: false },
    axisTick: { show: false }
  },
  yAxis: { type: 'value', axisLine: { show: false } },
  series: [
    { name: '申购', type: 'bar', data: scaleData.map(d => d.sub), itemStyle: { color: '#3B82F6', borderRadius: [4, 4, 0, 0] } },
    { name: '赎回', type: 'bar', data: scaleData.map(d => d.red), itemStyle: { color: '#F59E0B', borderRadius: [4, 4, 0, 0] } }
  ]
}));
</script>

<template>
  <div class="p-8 space-y-6 max-w-[1600px] mx-auto text-left">
    <div class="flex items-end justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">运营报表</h2>
        <p class="text-sm text-slate-500 mt-1">全方位展示组合规模变动、申赎动态、费用结构及运营效率。</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2 bg-white border border-ams-border rounded-md text-sm font-bold text-slate-700">
          <Settings class="w-4 h-4" />
          自定义报表
        </button>
        <button class="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md">
          <Download class="w-4 h-4" />
          导出运营数据
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div v-for="item in [
        { label: '当前管理规模', value: '¥21,845万', sub: '+12.4%', isPos: true, icon: TrendingUp },
        { label: '月均规模', value: '¥19,520万', sub: '近12个月', isPos: null, icon: Activity },
        { label: '年初至今增长', value: '24.52%', sub: '跑赢同类 5.2%', isPos: true, icon: ArrowUpRight },
        { label: '本期净申赎', value: '+¥2,345万', sub: '净流入', isPos: true, icon: Users },
        { label: '活跃客户数', value: '1,245', sub: '新增 42', isPos: true, icon: Users }
      ]" :key="item.label" class="ams-card p-4">
        <div class="flex items-center justify-between mb-2">
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{{ item.label }}</p>
          <component :is="item.icon" class="w-3.5 h-3.5 text-slate-300" />
        </div>
        <h4 class="text-lg font-black text-slate-900">{{ item.value }}</h4>
        <div :class="cn(
          'text-[10px] font-bold mt-1',
          item.isPos === true ? 'text-emerald-600' : item.isPos === false ? 'text-rose-600' : 'text-slate-400'
        )">{{ item.sub }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="ams-card p-6 lg:col-span-2">
        <h4 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp class="w-4 h-4 text-ams-accent" />
          规模变化趋势 (近12个月)
        </h4>
        <div class="h-[300px]">
          <v-chart class="chart" :option="scaleOption" autoresize />
        </div>
      </div>
      <div class="ams-card p-6">
        <h4 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Users class="w-4 h-4 text-ams-accent" />
          申赎动态分析
        </h4>
        <div class="h-[300px]">
          <v-chart class="chart" :option="dynamicOption" autoresize />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="ams-card p-6">
        <h4 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <PieChartIcon class="w-4 h-4 text-ams-accent" />
          费用结构明细
        </h4>
        <div class="space-y-4">
          <div v-for="item in feeData" :key="item.name" class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <p class="text-xs font-bold text-slate-900">{{ item.name }}</p>
              <p class="text-[10px] text-slate-400">占比: {{ item.ratio }}</p>
            </div>
            <p class="text-sm font-black text-ams-primary">¥{{ item.amount }}万</p>
          </div>
        </div>
      </div>
      <div class="ams-card p-6">
        <h4 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Clock class="w-4 h-4 text-ams-accent" />
          运营效率指标
        </h4>
        <div class="space-y-4">
          <div v-for="item in efficiencyData" :key="item.label" class="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <span class="text-xs text-slate-500 font-medium">{{ item.label }}</span>
            <div class="text-right">
              <p class="text-sm font-bold text-slate-900">{{ item.value }}</p>
              <span class="text-[8px] font-black uppercase text-emerald-600">{{ item.status }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ams-card p-6">
        <h4 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ShieldCheck class="w-4 h-4 text-ams-accent" />
          合规检查统计
        </h4>
        <div class="flex flex-col items-center justify-center h-[200px]">
          <div class="relative w-32 h-32 flex items-center justify-center">
            <svg class="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" class="text-slate-100" />
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364.4" strokeDashoffset="18.2" class="text-emerald-500" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <p class="text-2xl font-black text-slate-900">95%</p>
              <p class="text-[10px] font-bold text-slate-400 uppercase">通过率</p>
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
