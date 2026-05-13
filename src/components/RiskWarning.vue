<script setup lang="ts">
import { 
  ShieldAlert, 
  AlertTriangle, 
  Bell, 
  Settings, 
  CheckCircle2, 
  Filter, 
  Download,
  MoreHorizontal,
  ChevronRight,
  Zap,
  Activity
} from 'lucide-vue-next';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { RadarChart, BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, PolarComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import { cn } from '../lib/utils';
import { computed } from 'vue';

use([CanvasRenderer, RadarChart, BarChart, GridComponent, TooltipComponent, LegendComponent, PolarComponent]);

const riskRadarData = [
  { subject: '市场风险', A: 120, fullMark: 150 },
  { subject: '信用风险', A: 98, fullMark: 150 },
  { subject: '流动性风险', A: 86, fullMark: 150 },
  { subject: '操作风险', A: 99, fullMark: 150 },
  { subject: '集中度风险', A: 85, fullMark: 150 },
];

const alertHistory = [
  { time: '10:30:15', level: 'High', type: '集中度预警', message: '单一持仓 [腾讯控股] 占比超过 8%，触及一级阈值。', status: '待处理' },
  { time: '09:45:20', level: 'Medium', type: '回撤预警', message: '组合近 5 日最大回撤达到 2.4%，接近止损线。', status: '处理中' },
  { time: '昨日 15:00', level: 'Low', type: '流动性预警', message: '组合 T+1 可变现资产比例降至 15%，请关注。', status: '已忽略' },
  { time: '昨日 11:15', level: 'High', type: '合规预警', message: '买入指令 [宁德时代] 违反禁买池名单限制。', status: '已拦截' },
];

const limitData = [
  { name: '单一持仓', current: 8.45, limit: 10, warning: 8 },
  { name: '行业集中度', current: 18.5, limit: 25, warning: 20 },
  { name: '杠杆率', current: 134.8, limit: 150, warning: 140 },
  { name: 'VaR (95%)', current: 2.15, limit: 3.0, warning: 2.5 },
];

const radarOption = computed(() => ({
  tooltip: { trigger: 'item' },
  radar: {
    indicator: riskRadarData.map(d => ({ name: d.subject, max: d.fullMark })),
    axisName: { color: '#64748B', fontSize: 10 },
    splitLine: { lineStyle: { color: '#E2E8F0' } },
    splitArea: { show: false }
  },
  series: [{
    type: 'radar',
    data: [{
      value: riskRadarData.map(d => d.A),
      name: '当前风险',
      itemStyle: { color: '#08255E' },
      areaStyle: { opacity: 0.6 }
    }]
  }]
}));
</script>

<template>
  <div class="p-8 space-y-6 max-w-[1600px] mx-auto text-left">
    <div class="flex items-end justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">风险预警中心</h2>
        <p class="text-sm text-slate-500 mt-1">实时监控多维风险指标，通过智能算法识别潜在风险并即时预警。</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2 bg-white border border-ams-border rounded-md text-sm font-bold text-slate-700">
          <Settings class="w-4 h-4" />
          预警规则设置
        </button>
        <button class="flex items-center gap-2 px-4 py-2 bg-ams-primary text-white rounded-md text-sm font-bold shadow-md">
          <Zap class="w-4 h-4" />
          一键风险排查
        </button>
      </div>
    </div>

    <!-- Risk Score Card -->
    <div class="ams-card p-8 bg-ams-primary text-white overflow-hidden relative">
      <div class="absolute top-0 right-0 p-12 opacity-10">
        <ShieldAlert class="w-64 h-64" />
      </div>
      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
        <div class="lg:col-span-1 text-center lg:text-left">
          <p class="text-xs font-bold opacity-60 uppercase tracking-widest mb-2">综合风险评分</p>
          <h3 class="text-6xl font-black mb-2">78<span class="text-2xl opacity-50">/100</span></h3>
          <span class="px-3 py-1 bg-amber-500 text-white rounded-full text-[10px] font-black uppercase">中等风险</span>
        </div>
        <div class="lg:col-span-2 grid grid-cols-3 gap-4">
          <div v-for="item in [
            { label: '待处理预警', value: '3', color: 'text-amber-400' },
            { label: '今日触发', value: '12', color: 'text-white' },
            { label: '风险敞口', value: '¥1,845万', color: 'text-white' },
          ]" :key="item.label" class="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <p class="text-[10px] font-bold opacity-60 mb-1">{{ item.label }}</p>
            <p :class="cn('text-xl font-black', item.color)">{{ item.value }}</p>
          </div>
        </div>
        <div class="lg:col-span-1">
          <button class="w-full py-3 bg-ams-accent text-white rounded-lg font-bold shadow-lg hover:bg-ams-accent/90 transition-all flex items-center justify-center gap-2">
            查看风险报告
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="ams-card p-6">
        <h4 class="font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Activity class="w-4 h-4 text-ams-accent" />
          多维风险雷达图
        </h4>
        <div class="h-[300px]">
          <v-chart class="chart" :option="radarOption" autoresize />
        </div>
      </div>

      <div class="ams-card p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-6">
          <h4 class="font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle class="w-4 h-4 text-ams-accent" />
            核心限额监控
          </h4>
          <button class="text-[10px] font-bold text-ams-primary hover:underline">配置限额</button>
        </div>
        <div class="space-y-6">
          <div v-for="item in limitData" :key="item.name" class="space-y-2">
            <div class="flex justify-between items-end">
              <span class="text-xs font-bold text-slate-700">{{ item.name }}</span>
              <span class="text-xs font-mono">
                <span :class="cn('font-black', item.current >= item.warning ? 'text-rose-600' : 'text-ams-primary')">{{ item.current }}</span>
                <span class="text-slate-400 mx-1">/</span>
                <span class="text-slate-500">{{ item.limit }}</span>
              </span>
            </div>
            <div class="h-2 bg-slate-100 rounded-full overflow-hidden relative">
              <div 
                :class="cn(
                  'h-full transition-all duration-500',
                  item.current >= item.limit ? 'bg-rose-600' : 
                  item.current >= item.warning ? 'bg-amber-500' : 'bg-ams-primary'
                )"
                :style="{ width: `${(item.current / item.limit) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        <div class="mt-8 p-4 bg-slate-50 rounded-lg border border-ams-border flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">✓</div>
          <div>
            <p class="text-xs font-bold text-slate-900">合规状态良好</p>
            <p class="text-[10px] text-slate-500">当前共有 42 项监控指标，其中 1 项处于预警状态，0 项触及限额。</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Alert History -->
    <div class="ams-card">
      <div class="p-4 border-b border-ams-border flex items-center justify-between bg-slate-50">
        <h4 class="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Bell class="w-4 h-4 text-ams-accent" />
          实时预警流水
        </h4>
        <div class="flex gap-2">
          <button class="flex items-center gap-1 px-3 py-1 bg-white border border-ams-border rounded text-[10px] font-bold text-slate-600">
            <Filter class="w-3 h-3" />
            筛选
          </button>
          <button class="flex items-center gap-1 px-3 py-1 bg-white border border-ams-border rounded text-[10px] font-bold text-slate-600">
            <Download class="w-3 h-3" />
            导出
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="text-slate-500 font-bold border-b border-ams-border">
              <th class="px-6 py-4">时间</th>
              <th class="px-6 py-4">级别</th>
              <th class="px-6 py-4">预警类型</th>
              <th class="px-6 py-4">预警详情</th>
              <th class="px-6 py-4">状态</th>
              <th class="px-6 py-4">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="(item, i) in alertHistory" :key="i" class="hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 text-slate-500 font-mono">{{ item.time }}</td>
              <td class="px-6 py-4">
                <span :class="cn(
                  'px-2 py-0.5 rounded text-[10px] font-black uppercase text-center',
                  item.level === 'High' ? 'bg-rose-100 text-rose-700' :
                  item.level === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                )">{{ item.level }}</span>
              </td>
              <td class="px-6 py-4 font-bold text-slate-900">{{ item.type }}</td>
              <td class="px-6 py-4 text-slate-600 max-w-md truncate">{{ item.message }}</td>
              <td class="px-6 py-4">
                <span :class="cn(
                  'flex items-center gap-1.5 font-bold',
                  item.status === '待处理' ? 'text-amber-600' :
                  item.status === '已拦截' ? 'text-rose-600' : 'text-slate-400'
                )">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <MoreHorizontal class="w-4 h-4 text-slate-400" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart {
  height: 100%;
}
</style>
