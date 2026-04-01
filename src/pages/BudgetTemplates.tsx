import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AccentButton } from '@/components/ui/AccentButton';
import { ArrowLeft, Plus, PieChart, Target, Calculator, Briefcase, Ruler } from 'lucide-react';
import { budgetTemplates } from '@/data/mockData';

interface BudgetCategory {
  name: string;
  budgeted: number;
  spent: number;
}

interface BudgetData {
  templateId: string;
  monthlyIncome: number;
  categories: BudgetCategory[];
}

const BudgetTemplates: React.FC = () => {
  const { colors } = useTheme();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [monthlyIncome, setMonthlyIncome] = useState('');

  const getTemplateIcon = (templateId: string) => {
    const icons = {
      '1': <Target size={24} />,
      '2': <PieChart size={24} />,
      '3': <Calculator size={24} />,
      '4': <Briefcase size={24} />,
      '5': <Ruler size={24} />,
    };
    return icons[templateId as keyof typeof icons] || <Ruler size={24} />;
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = budgetTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      if (templateId === '5') {
        // Custom template - start with empty categories
        setBudgetData({
          templateId,
          monthlyIncome: 0,
          categories: [],
        });
      } else {
        // Predefined template - initialize with default categories
        setBudgetData({
          templateId,
          monthlyIncome: 0,
          categories: template.categories.map(cat => ({
            name: cat,
            budgeted: 0,
            spent: Math.random() * 200, // Mock spent amount
          })),
        });
      }
    }
  };

  const updateCategoryBudget = (categoryIndex: number, budgeted: number) => {
    if (!budgetData) return;
    
    const newCategories = [...budgetData.categories];
    newCategories[categoryIndex].budgeted = budgeted;
    
    setBudgetData({
      ...budgetData,
      categories: newCategories,
    });
  };

  const addCustomCategory = () => {
    if (!budgetData || selectedTemplate !== '5') return;
    
    setBudgetData({
      ...budgetData,
      categories: [...budgetData.categories, { name: '', budgeted: 0, spent: 0 }],
    });
  };

  const updateCategoryName = (categoryIndex: number, name: string) => {
    if (!budgetData) return;
    
    const newCategories = [...budgetData.categories];
    newCategories[categoryIndex].name = name;
    
    setBudgetData({
      ...budgetData,
      categories: newCategories,
    });
  };

  const totalBudgeted = budgetData?.categories.reduce((sum, cat) => sum + cat.budgeted, 0) || 0;
  const totalSpent = budgetData?.categories.reduce((sum, cat) => sum + cat.spent, 0) || 0;
  const remaining = (parseFloat(monthlyIncome) || 0) - totalBudgeted;

  if (selectedTemplate && budgetData) {
    // Budget Detail View
    return (
      <div
        className="min-h-screen pb-20"
        style={{
          backgroundColor: colors.background,
          color: colors.foreground,
        }}
      >
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4 mb-6">
            <button 
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setSelectedTemplate(null)}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold flex-1" style={{ fontFamily: 'Syne, sans-serif' }}>
              {budgetTemplates.find(t => t.id === selectedTemplate)?.name} Budget
            </h1>
          </div>

          {/* Monthly Income Input */}
          <GlassCard className="p-4 mb-6">
            <label className="text-sm opacity-70 mb-2 block">Monthly Income (GH₵)</label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-2xl py-3 px-4 text-sm outline-none transition-all"
              style={{
                backgroundColor: colors.background,
                border: `1px solid ${colors.border}`,
                color: colors.foreground,
              }}
            />
          </GlassCard>

          {/* Categories */}
          <div className="space-y-4 mb-6">
            {budgetData.categories.map((category, index) => (
              <GlassCard key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    {selectedTemplate === '5' ? (
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) => updateCategoryName(index, e.target.value)}
                        placeholder="Category name"
                        className="w-full rounded-lg py-2 px-3 text-sm outline-none"
                        style={{
                          backgroundColor: colors.background,
                          border: `1px solid ${colors.border}`,
                          color: colors.foreground,
                        }}
                      />
                    ) : (
                      <div className="font-medium">{category.name}</div>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xs opacity-70">Spent</div>
                    <div className="text-sm font-semibold text-red-400">
                      GH₵{category.spent.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={category.budgeted || ''}
                    onChange={(e) => updateCategoryBudget(index, parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="flex-1 rounded-lg py-2 px-3 text-sm outline-none"
                    style={{
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      color: colors.foreground,
                    }}
                  />
                  <div className="text-sm opacity-70">GH₵</div>
                </div>
              </GlassCard>
            ))}
            
            {selectedTemplate === '5' && (
              <AccentButton variant="ghost" onClick={addCustomCategory} className="w-full">
                <Plus size={16} className="mr-2" />
                Add Category
              </AccentButton>
            )}
          </div>

          {/* Budget Summary */}
          <GlassCard className="p-4 mb-6">
            <h3 className="font-semibold mb-3">Budget Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Monthly Income</span>
                <span style={{ fontFamily: 'Syne, sans-serif' }}>
                  GH₵{parseFloat(monthlyIncome || '0').toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Total Budgeted</span>
                <span style={{ fontFamily: 'Syne, sans-serif' }}>
                  GH₵{totalBudgeted.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Total Spent</span>
                <span className="text-red-400" style={{ fontFamily: 'Syne, sans-serif' }}>
                  GH₵{totalSpent.toFixed(2)}
                </span>
              </div>
              <div className="h-px my-2" style={{ backgroundColor: colors.border }} />
              <div className="flex justify-between text-sm font-semibold">
                <span>Remaining</span>
                <span className={remaining >= 0 ? 'text-green-400' : 'text-red-400'} 
                      style={{ fontFamily: 'Syne, sans-serif' }}>
                  GH₵{remaining.toFixed(2)}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Donut Chart Placeholder */}
          <GlassCard className="p-6 text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: colors.card }}>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
                  GH₵{totalBudgeted.toFixed(0)}
                </div>
                <div className="text-xs opacity-70">Total Budget</div>
              </div>
            </div>
            <div className="text-sm opacity-70">Donut chart visualization</div>
          </GlassCard>

          <AccentButton className="w-full mt-6">
            Save Budget
          </AccentButton>
        </div>
      </div>
    );
  }

  // Template Selection View
  return (
    <div
      className="min-h-screen pb-20"
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
      }}
    >
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button 
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold flex-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            Budget Templates
          </h1>
        </div>

        <div className="text-sm opacity-70 mb-6">
          Choose a template to get started with your budget planning
        </div>

        {/* Template Cards */}
        <div className="space-y-4">
          {budgetTemplates.map((template) => (
            <GlassCard 
              key={template.id}
              className="p-4 cursor-pointer hover:bg-white/5 transition-all"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.accent, color: 'white' }}
                >
                  {getTemplateIcon(template.id)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-lg">{template.emoji}</div>
                    <h3 className="font-semibold">{template.name}</h3>
                  </div>
                  <p className="text-sm opacity-70 mb-3">{template.description}</p>
                  
                  {template.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {template.categories.slice(0, 3).map((cat, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: colors.card,
                            border: `1px solid ${colors.border}`,
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                      {template.categories.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full opacity-60">
                          +{template.categories.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetTemplates;
