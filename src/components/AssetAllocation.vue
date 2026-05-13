<script setup lang="ts">
import { Filter, Download, Info, TrendingUp, Globe, Layers, BarChart3 } from 'lucide-vue-next';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { computed } from 'vue';

use([CanvasRenderer, PieChart, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent]);

const industryData = [
  { name: '食品饮料', value: 18.5 },
  { name: '电子', value: 15.2 },
  { name: '医药生物', value: 12.8 },
  { name: '非银金融', value: 10.5 },
  { name: '电力设备', value: 8.2 },
  { name: '计算机', value: 7.5 },
  { name: '银行', value: 6.8 },
  { name: '汽车', value: 5.4 },
  { name: '国防军工', value: 4.2 },
  { name: '传媒', value: 3.5 },
  { name: '其他', value: 7.4 },
];

const deviationData = [
  { name: '股票', current: 45, target: 40, diff: 5 },
  { name: '债券', current: 30, target: 35, diff: -5 },
  { name: '基金', current: 15, target: 15, diff: 0 },
  { name: '现金', current: 5, target: 5, diff: 0 },
  { name: '衍生品', current: 5, target: 5, diff: 0 },
];

const trendData = [
  { month: '2025-05', stocks: 40, bonds: 35, cash: 15, funds: 10 },
  { month: '2025-07', stocks: 42, bonds: 33, cash: 12, funds: 13 },
  { month: '2025-09', stocks: 38, bonds: 38, cash: 14, funds: 10 },
  { month: '2025-11', stocks: 45, bonds: 30, cash: 10, funds: 15 },
  { month: '2026-01', stocks: 43, bonds: 32, cash: 10, funds: 15 },
  { month: '2026-03', stocks: 45, bonds: 30, cash: 5, funds: 20 },
];

const industryOption = computed(() => ({
  grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'value', show: false },
  yAxis: {
    type: 'category',
    data: industryData.map(d => d.name),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#475569', fontSize: 10 }
  },
  series: [{
    type: 'bar',
    data: industryData.map(d => d.value),
    itemStyle: { color: '#08255E', borderRadius: [0, 4, 4, 0] },
    barWidth: 15
  }]
}));

const regionOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [{
    type: 'pie',
    radius: ['50%', '70%'],
    data: [
      { name: '国内', value: 85, itemStyle: { color: '#08255E' } },
      { name: '海外', value: 15, itemStyle: { color: '#3B82F6' } }
    ],
    label: { show: false }
  }]
}));

const deviationOption = computed(() => ({
  grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'value', min: -10, max: 10 },
  yAxis: {
    type: 'category',
    data: deviationData.map(d => d.name),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { fontSize: 10 }
  },
  series: [{
    type: 'bar',
    data: deviationData.map(d => ({
      value: d.diff,
      itemStyle: { color: d.diff >= 0 ? '#3B82F6' : '#F59E0B' }
    })),
    barWidth: 20
  }]
}));

const trendOption = computed(() => ({
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  tooltip: { trigger: 'axis' },
  legend: { data: ['股票', '债券', '基金', '现金'], right: 10, top: 0 },
  xAxis: {
    type: 'category',
    data: trendData.map(d => d.month),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { fontSize: 10 }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: '#F1F5F9' } },
    axisLabel: { fontSize: 10 }
  },
  series: [
    { name: '股票', type: 'line', stack: 'total', areaStyle: {}, data: trendData.map(d => d.stocks), itemStyle: { color: '#08255E' }, symbol: 'none' },
    { name: '债券', type: 'line', stack: 'total', areaStyle: {}, data: trendData.map(d => d.bonds), itemStyle: { color: '#3B82F6' }, symbol: 'none' },
    { name: '基金', type: 'line', stack: 'total', areaStyle: {}, data: trendData.map(d => d.funds), itemStyle: { color: '#F59E0B' }, symbol: 'none' },
    { name: '现金', type: 'line', stack: 'total', areaStyle: {}, data: trendData.map(d => d.cash), itemStyle: { color: '#94A3B8' }, symbol: 'none' }
  ]
}));
</script>

<template>
  <div class="p-8 space-y-6 max-w-[1600px] mx-auto">
    <div class="flex items-end justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">资产配置分析</h2>
        <p class="text-sm text-slate-500 mt-1">深度剖析组合资产分布、行业偏离及地域布局。</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2 bg-white border border-ams-border rounded-md text-sm font-bold text-slate-700">
          <Globe class="w-4 h-4" />
          地域对比
        </button>
        <button class="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md">
          <Download class="w-4 h-4" />
          导出配置报表
        </button>
      </div>
    </div>

    <!-- Top Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="ams-card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-6">
          <h4 class="font-bold text-slate-900 flex items-center gap-2">
            <Layers class="w-4 h-4 text-ams-accent" />
            资产大类分布 (Treemap 视图)
          </h4>
          <span class="text-[10px] text-slate-400 font-medium italic">点击方块可下钻至二级分类</span>
        </div>
        <div class="grid grid-cols-12 grid-rows-2 gap-2 h-[350px]">
          <div class="col-span-7 row-span-2 bg-ams-primary rounded-lg p-4 text-white flex flex-col justify-between hover:opacity-90 cursor-pointer transition-all">
            <div>
              <p class="text-xs font-bold opacity-70 uppercase tracking-widest">股票 Assets</p>
              <h3 class="text-3xl font-black">45.0%</h3>
            </div>
            <p class="text-[10px] opacity-60">大盘/中小盘/价值/成长</p>
          </div>
          <div class="col-span-5 row-span-1 bg-ams-accent rounded-lg p-4 text-white flex flex-col justify-between hover:opacity-90 cursor-pointer transition-all">
            <div>
              <p class="text-xs font-bold opacity-70 uppercase tracking-widest">债券 Bonds</p>
              <h3 class="text-xl font-black">30.0%</h3>
            </div>
            <p class="text-[10px] opacity-60">国债/信用债/可转债</p>
          </div>
          <div class="col-span-3 row-span-1 bg-amber-500 rounded-lg p-4 text-white flex flex-col justify-between hover:opacity-90 cursor-pointer transition-all">
            <div>
              <p class="text-xs font-bold opacity-70 uppercase tracking-widest">基金 Funds</p>
              <h3 class="text-lg font-black">15.0%</h3>
            </div>
          </div>
          <div class="col-span-2 row-span-1 bg-slate-400 rounded-lg p-4 text-white flex flex-col justify-between hover:opacity-90 cursor-pointer transition-all">
            <div>
              <p class="text-xs font-bold opacity-70 uppercase tracking-widest">现金</p>
              <h3 class="text-lg font-black">5.0%</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="ams-card p-6">
        <h4 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BarChart3 class="w-4 h-4 text-ams-accent" />
          行业分布 TOP 10
        </h4>
        <div class="h-[350px]">
          <v-chart class="chart" :option="industryOption" autoresize />
        </div>
      </div>
    </div>

    <!-- Middle Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="ams-card p-6">
        <div class="flex items-center justify-between mb-6">
          <h4 class="font-bold text-slate-900 flex items-center gap-2">
            <Globe class="w-4 h-4 text-ams-accent" />
            地域分布分析
          </h4>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div class="h-[200px]">
            <v-chart class="chart" :option="regionOption" autoresize />
          </div>
          <div class="space-y-3 flex flex-col justify-center">
            <div class="p-3 bg-slate-50 rounded-lg">
              <p class="text-[10px] font-bold text-slate-500 uppercase">国内市场占比</p>
              <p class="text-xl font-black text-slate-900">85.0%</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-lg">
              <p class="text-[10px] font-bold text-slate-500 uppercase">海外市场占比</p>
              <p class="text-xl font-black text-slate-900">15.0%</p>
              <p class="text-[10px] text-slate-400 mt-1">美股 8% | 港股 5% | 欧洲 2%</p>
            </div>
          </div>
        </div>
      </div>

      <div class="ams-card p-6">
        <h4 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp class="w-4 h-4 text-ams-accent" />
          资产配置偏离分析 (vs 目标)
        </h4>
        <div class="h-[200px]">
          <v-chart class="chart" :option="deviationOption" autoresize />
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="ams-card p-6">
      <h4 class="font-bold text-slate-900 mb-6">资产配置变动趋势 (近12个月)</h4>
      <div class="h-[300px]">
        <v-chart class="chart" :option="trendOption" autoresize />
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart {
  height: 100%;
}
</style>
