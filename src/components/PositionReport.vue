<script setup lang="ts">
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldAlert, 
  Activity, 
  Download, 
  RefreshCw, 
  CheckCircle2,
  PieChart as PieChartIcon,
  ChevronRight
} from 'lucide-vue-next';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { cn } from '../lib/utils';
import { computed } from 'vue';

use([CanvasRenderer, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent]);

const trendData = [
  { month: '2025-05', assets: 1000, liabilities: 200, net: 800 },
  { month: '2025-07', assets: 1100, liabilities: 250, net: 850 },
  { month: '2025-09', assets: 1050, liabilities: 220, net: 830 },
  { month: '2025-11', assets: 1200, liabilities: 300, net: 900 },
  { month: '2026-01', assets: 1250, liabilities: 320, net: 930 },
  { month: '2026-03', assets: 1350, liabilities: 350, net: 1000 },
];

const structureData = [
  { name: '净资产', value: 74, color: '#08255E' },
  { name: '负债', value: 26, color: '#94A3B8' },
];

const assetDetails = [
  { name: '腾讯控股', code: '00700.HK', amount: '50,000', marketValue: '1,845.20', cost: '1,602.50', profit: '+242.70', profitRate: '+15.14%', ratio: '8.45%', liquidity: '高' },
  { name: '贵州茅台', code: '600519.SH', amount: '8,000', marketValue: '1,320.40', cost: '1,264.00', profit: '+56.40', profitRate: '+4.46%', ratio: '6.05%', liquidity: '高' },
  { name: '国债2401', code: '019701.SH', amount: '150,000', marketValue: '1,500.00', cost: '1,498.50', profit: '+1.50', profitRate: '+0.10%', ratio: '6.87%', liquidity: '高' },
  { name: '企业债-腾讯', code: '123456.SZ', amount: '65,000', marketValue: '650.00', cost: '651.30', profit: '-1.30', profitRate: '-0.20%', ratio: '2.98%', liquidity: '中' },
  { name: '某私募股权基金', code: 'PE001', amount: '1', marketValue: '500.00', cost: '450.00', profit: '+50.00', profitRate: '+11.11%', ratio: '2.29%', liquidity: '低' },
];

const liabilityDetails = [
  { type: '融资融券', amount: '200.00', rate: '6.5%', dueDate: '2026-10-15', counterparty: '中信证券', collateral: '股票头寸' },
  { type: '卖出回购', amount: '150.00', rate: '2.1%', dueDate: '2026-04-20', counterparty: '招商银行', collateral: '国债2401' },
];

const pieOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [{
    type: 'pie',
    radius: ['50%', '70%'],
    data: structureData.map(d => ({ name: d.name, value: d.value, itemStyle: { color: d.color } })),
    label: { show: false }
  }]
}));

const trendOption = computed(() => ({
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
  tooltip: { trigger: 'axis' },
  legend: { data: ['总资产', '净资产', '总负债'], right: 10, top: 0 },
  xAxis: {
    type: 'category',
    data: trendData.map(d => d.month),
    axisLine: { show: false },
    axisTick: { show: false }
  },
  yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: '#F1F5F9' } } },
  series: [
    { name: '总资产', type: 'line', data: trendData.map(d => d.assets), lineStyle: { width: 3, color: '#08255E' }, symbol: 'none' },
    { name: '净资产', type: 'line', data: trendData.map(d => d.net), lineStyle: { width: 3, color: '#10B981' }, symbol: 'none' },
    { name: '总负债', type: 'line', data: trendData.map(d => d.liabilities), lineStyle: { width: 2, color: '#94A3B8', type: 'dashed' }, symbol: 'none' }
  ]
}));
</script>

<template>
  <div class="p-8 space-y-6 max-w-[1600px] mx-auto">
    <div class="flex items-end justify-between text-left">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">头寸报表</h2>
        <p class="text-sm text-slate-500 mt-1">实时监控组合资产、负债及净资产结构，确保流动性安全。</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2 bg-white border border-ams-border rounded-md text-sm font-bold text-slate-700">
          <RefreshCw class="w-4 h-4" />
          刷新头寸
        </button>
        <button class="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md">
          <Download class="w-4 h-4" />
          导出头寸报表
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div v-for="item in [
        { label: '总资产', value: '¥21,845.20万', icon: Wallet },
        { label: '总负债', value: '¥5,642.15万', icon: ShieldAlert },
        { label: '净资产', value: '¥16,203.05万', icon: CheckCircle2, color: 'text-emerald-600' },
        { label: '杠杆率', value: '134.8%', icon: Activity },
        { label: '可用资金', value: '¥1,245.80万', icon: Wallet },
        { label: '在途资金', value: '¥42.15万', icon: Activity }
      ]" :key="item.label" class="ams-card p-4 text-left">
        <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{{ item.label }}</p>
        <div class="flex items-center justify-between">
          <h4 :class="cn('text-lg font-black', item.color || 'text-slate-900')">{{ item.value }}</h4>
          <component :is="item.icon" class="w-4 h-4 text-slate-300" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Asset Details Table -->
      <div class="ams-card lg:col-span-2">
        <div class="p-4 border-b border-ams-border flex items-center justify-between bg-slate-50">
          <h4 class="font-bold text-sm text-slate-900">资产明细表</h4>
          <div class="flex gap-2">
            <button class="px-2 py-1 text-[10px] bg-white border border-ams-border rounded font-bold">按市值排序</button>
            <button class="px-2 py-1 text-[10px] bg-white border border-ams-border rounded font-bold">流动性筛选</button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="text-slate-500 font-bold border-b border-ams-border">
                <th class="px-4 py-3">资产名称</th>
                <th class="px-4 py-3 text-right">市值(万元)</th>
                <th class="px-4 py-3 text-right">盈亏率</th>
                <th class="px-4 py-3 text-right">占净资产比</th>
                <th class="px-4 py-3 text-center">流动性</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="(item, i) in assetDetails" :key="i" class="hover:bg-slate-50 transition-colors group">
                <td class="px-4 py-3">
                  <p class="font-bold text-slate-900">{{ item.name }}</p>
                  <p class="text-[10px] text-slate-400 font-mono">{{ item.code }}</p>
                </td>
                <td class="px-4 py-3 text-right font-mono font-bold text-ams-primary">{{ item.marketValue }}</td>
                <td :class="cn(
                  'px-4 py-3 text-right font-bold',
                  item.profitRate.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                )">{{ item.profitRate }}</td>
                <td class="px-4 py-3 text-right font-medium text-slate-600">{{ item.ratio }}</td>
                <td class="px-4 py-3 text-center">
                  <span :class="cn(
                    'px-2 py-0.5 rounded text-[10px] font-bold',
                    item.liquidity === '高' ? 'bg-emerald-100 text-emerald-700' :
                    item.liquidity === '中' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                  )">{{ item.liquidity }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <div class="ams-card">
          <div class="p-4 border-b border-ams-border bg-slate-50">
            <h4 class="font-bold text-sm text-slate-900">负债明细表</h4>
          </div>
          <div class="p-4 space-y-4">
            <div v-for="(item, i) in liabilityDetails" :key="i" class="p-3 bg-slate-50 rounded-lg border border-ams-border/50 text-left">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-slate-900">{{ item.type }}</span>
                <span class="text-xs font-black text-rose-600">¥{{ item.amount }}万</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                <p>利率: <span class="text-slate-900 font-medium">{{ item.rate }}</span></p>
                <p>到期日: <span class="text-slate-900 font-medium">{{ item.dueDate }}</span></p>
                <p class="col-span-2">对手方: <span class="text-slate-900 font-medium">{{ item.counterparty }}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div class="ams-card p-6">
          <h4 class="font-bold text-sm text-slate-900 mb-6 flex items-center gap-2">
            <PieChartIcon class="w-4 h-4 text-ams-accent" />
            头寸结构分析
          </h4>
          <div class="h-[180px]">
            <v-chart class="chart" :option="pieOption" autoresize />
          </div>
          <div class="mt-4 flex justify-around">
            <div class="text-center">
              <p class="text-[10px] font-bold text-slate-400 uppercase">权益比率</p>
              <p class="text-lg font-black text-ams-primary">74.2%</p>
            </div>
            <div class="text-center">
              <p class="text-[10px] font-bold text-slate-400 uppercase">杠杆比率</p>
              <p class="text-lg font-black text-slate-900">1.35x</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Chart -->
    <div class="ams-card p-6">
      <h4 class="font-bold text-slate-900 mb-6">头寸变动趋势 (近12个月)</h4>
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
