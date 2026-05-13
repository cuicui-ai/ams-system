<script setup lang="ts">
import { 
  LayoutDashboard, 
  PieChart, 
  BarChart3, 
  LineChart, 
  ShieldCheck, 
  Database, 
  Settings, 
  Users, 
  Search,
  TrendingUp
} from 'lucide-vue-next';
import NavItem from './NavItem.vue';

defineProps<{
  currentModule: string;
}>();

const emit = defineEmits(['moduleChange']);

const handleModuleChange = (module: string) => {
  emit('moduleChange', module);
};
</script>

<template>
  <aside class="w-64 bg-ams-primary h-screen flex flex-col border-r border-white/10 shrink-0 overflow-y-auto">
    <div class="p-6 flex items-center gap-3 cursor-pointer" @click="handleModuleChange('资产概览')">
      <div class="w-8 h-8 bg-ams-accent rounded flex items-center justify-center">
        <TrendingUp class="text-white w-5 h-5" />
      </div>
      <div>
        <h1 class="text-white font-bold text-lg leading-none">AMS系统</h1>
        <p class="text-slate-400 text-[10px] mt-1 uppercase tracking-widest">Asset Management System</p>
      </div>
    </div>

    <nav class="flex-1 px-3 py-4">
      <div class="mb-6">
        <p class="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">核心功能</p>
        <NavItem 
          :icon="LayoutDashboard" 
          label="资产概览" 
          :active="currentModule === '资产概览'" 
          @click="handleModuleChange('资产概览')" 
        />
        <NavItem 
          :icon="PieChart" 
          label="组合分析" 
          :subItems="['组合报告', '资产配置', '头寸表', '运营报表', '交易流水', '风险预警']" 
          @subItemClick="handleModuleChange"
          :currentSubItem="currentModule"
          :active="['组合报告', '资产配置', '头寸表', '运营报表', '交易流水', '风险预警'].includes(currentModule)"
        />
        <NavItem 
          :icon="BarChart3" 
          label="绩效评估" 
          :subItems="['组合盈亏分析', '组合业绩归因', '仓位追踪', '周期分析', '因子风格', '因子收益', '因子归因']" 
          @subItemClick="handleModuleChange"
          :currentSubItem="currentModule"
          :active="['组合盈亏分析', '组合业绩归因', '仓位追踪', '周期分析', '因子风格', '因子收益', '因子归因'].includes(currentModule)"
        />
        <NavItem 
          :icon="LineChart" 
          label="组合统计" 
          :subItems="['产品全景', '持仓全景', '产品对比', '相关性分析', '期权行权']" 
          @subItemClick="handleModuleChange"
          :currentSubItem="currentModule"
          :active="['产品全景', '持仓全景', '产品对比', '相关性分析', '期权行权'].includes(currentModule)"
        />
      </div>

      <div class="mb-6">
        <p class="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">管理与合规</p>
        <NavItem 
          :icon="Search" 
          label="研究管理" 
          :subItems="['基金池', '研究报告上传', '研究报告审批']" 
          @subItemClick="handleModuleChange"
          :currentSubItem="currentModule"
        />
        <NavItem 
          :icon="ShieldCheck" 
          label="合规风控" 
          :subItems="['额度监控', '额度设置']" 
          @subItemClick="handleModuleChange"
          :currentSubItem="currentModule"
        />
        <NavItem 
          :icon="Database" 
          label="数据中心" 
          :subItems="['估值表导入', '交易流水导入', '交易持仓核对', '资产价格设置', '份额分红管理', '资金成本管理', '历史数据封账']" 
          @subItemClick="handleModuleChange"
          :currentSubItem="currentModule"
        />
      </div>

      <div>
        <p class="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">系统配置</p>
        <NavItem 
          :icon="Users" 
          label="产品管理" 
          :subItems="['产品设置', '产品分组', '自定义组合', '自定义基准', '模型参数设置']" 
          @subItemClick="handleModuleChange"
          :currentSubItem="currentModule"
        />
        <NavItem 
          :icon="Settings" 
          label="系统管理" 
          :subItems="['团队设置', '权限管理 (产品/功能)', '操作日志']" 
          @subItemClick="handleModuleChange"
          :currentSubItem="currentModule"
        />
      </div>
    </nav>

    <div class="p-4 border-t border-white/10">
      <div class="flex items-center gap-3 px-2">
        <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
          PM
        </div>
        <div class="flex-1 overflow-hidden">
          <p class="text-sm font-medium text-white truncate">张经理</p>
          <p class="text-[10px] text-slate-400 truncate">投资研究团队</p>
        </div>
      </div>
    </div>
  </aside>
</template>
