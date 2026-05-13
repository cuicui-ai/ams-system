<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import UnderConstruction from './components/UnderConstruction.vue';

// Async components for lazy loading
const Dashboard = defineAsyncComponent(() => import('./components/Dashboard.vue'));
const PortfolioReport = defineAsyncComponent(() => import('./components/PortfolioReport.vue'));
const AssetAllocation = defineAsyncComponent(() => import('./components/AssetAllocation.vue'));
const PositionReport = defineAsyncComponent(() => import('./components/PositionReport.vue'));
const OperationReport = defineAsyncComponent(() => import('./components/OperationReport.vue'));
const TransactionFlow = defineAsyncComponent(() => import('./components/TransactionFlow.vue'));
const RiskWarning = defineAsyncComponent(() => import('./components/RiskWarning.vue'));
const PortfolioProfitLoss = defineAsyncComponent(() => import('./components/PortfolioProfitLoss.vue'));
const PerformanceAttribution = defineAsyncComponent(() => import('./components/PerformanceAttribution.vue'));
const PositionTracking = defineAsyncComponent(() => import('./components/PositionTracking.vue'));
const CycleAnalysis = defineAsyncComponent(() => import('./components/CycleAnalysis.vue'));
const FactorAnalysis = defineAsyncComponent(() => import('./components/FactorAnalysis.vue'));
const ProductPanorama = defineAsyncComponent(() => import('./components/ProductPanorama.vue'));
const HoldingsPanorama = defineAsyncComponent(() => import('./components/HoldingsPanorama.vue'));
const ProductComparison = defineAsyncComponent(() => import('./components/ProductComparison.vue'));
const CorrelationAnalysis = defineAsyncComponent(() => import('./components/CorrelationAnalysis.vue'));
const OptionExercise = defineAsyncComponent(() => import('./components/OptionExercise.vue'));
const ValuationImport = defineAsyncComponent(() => import('./components/ValuationImport.vue'));

const currentModule = ref('资产概览');

const setCurrentModule = (module: string) => {
  currentModule.value = module;
};

const activeComponent = computed(() => {
  switch (currentModule.value) {
    case '资产概览': return Dashboard;
    case '组合报告': return PortfolioReport;
    case '资产配置': return AssetAllocation;
    case '头寸表': return PositionReport;
    case '运营报表': return OperationReport;
    case '交易流水': return TransactionFlow;
    case '风险预警': return RiskWarning;
    case '组合盈亏分析': return PortfolioProfitLoss;
    case '组合业绩归因': return PerformanceAttribution;
    case '仓位追踪': return PositionTracking;
    case '周期分析': return CycleAnalysis;
    case '因子风格':
    case '因子收益':
    case '因子归因':
      return FactorAnalysis;
    case '产品全景': return ProductPanorama;
    case '持仓全景': return HoldingsPanorama;
    case '产品对比': return ProductComparison;
    case '相关性分析': return CorrelationAnalysis;
    case '期权行权': return OptionExercise;
    case '估值表导入': return ValuationImport;
    default:
      return null;
  }
});
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-ams-background">
    <Sidebar :currentModule="currentModule" @moduleChange="setCurrentModule" />
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <Header />
      <main class="flex-1 overflow-y-auto bg-slate-50/50">
        <component 
          v-if="activeComponent" 
          :is="activeComponent" 
          :initialTab="currentModule"
        />
        <UnderConstruction v-else :name="currentModule" />
      </main>
    </div>
  </div>
</template>
