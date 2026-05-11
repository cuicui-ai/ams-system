/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AssetAllocation } from './components/AssetAllocation';
import { CorrelationAnalysis } from './components/CorrelationAnalysis';
import { CycleAnalysis } from './components/CycleAnalysis';
import { FactorAnalysis } from './components/FactorAnalysis';
import { PortfolioReport } from './components/PortfolioReport';
import { PositionReport } from './components/PositionReport';
import { OperationReport } from './components/OperationReport';
import { TransactionFlow } from './components/TransactionFlow';
import { RiskWarning } from './components/RiskWarning';
import { PortfolioProfitLoss } from './components/PortfolioProfitLoss';
import { PerformanceAttribution } from './components/PerformanceAttribution';
import { PositionTracking } from './components/PositionTracking';
import { ProductPanorama } from './components/ProductPanorama';
import { HoldingsPanorama } from './components/HoldingsPanorama';
import { ProductComparison } from './components/ProductComparison';
import { OptionExercise } from './components/OptionExercise';
import { ValuationImport } from './components/ValuationImport';

const UnderConstruction = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center h-full p-20 text-center">
    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
      <span className="text-4xl">🏗️</span>
    </div>
    <h2 className="text-2xl font-bold text-slate-900">{name}</h2>
    <p className="text-slate-500 mt-2 max-w-md">
      当前模块正在开发中，敬请期待。我们正在努力完善 {name} 的详细功能。
      该模块将包含深度的金融数据分析与专业报表功能。
    </p>
  </div>
);

export default function App() {
  const [currentModule, setCurrentModule] = useState('总览');

  const renderContent = () => {
    switch (currentModule) {
      case '总览': return <Dashboard />;
      case '组合报告': return <PortfolioReport />;
      case '资产配置': return <AssetAllocation />;
      case '头寸表': return <PositionReport />;
      case '运营报表': return <OperationReport />;
      case '交易流水': return <TransactionFlow />;
      case '风险预警': return <RiskWarning />;
      case '组合盈亏分析': return <PortfolioProfitLoss />;
      case '组合业绩归因': return <PerformanceAttribution />;
      case '仓位追踪': return <PositionTracking />;
      case '周期分析': return <CycleAnalysis />;
      case '因子风格':
      case '因子收益':
      case '因子归因':
        return <FactorAnalysis initialTab={currentModule} />;
      case '产品全景': return <ProductPanorama />;
      case '持仓全景': return <HoldingsPanorama />;
      case '产品对比': return <ProductComparison />;
      case '相关性分析': return <CorrelationAnalysis />;
      case '期权行权': return <OptionExercise />;
      case '估值表导入': return <ValuationImport />;
      default:
        return <UnderConstruction name={currentModule} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-ams-background">
      <Sidebar currentModule={currentModule} onModuleChange={setCurrentModule} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
