import { Check, Edit, FileText, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgressIndicatorProps {
  currentStep: 'form' | 'confirmation' | 'success';
  onBack?: () => void;
}

export const ProgressIndicator = ({ currentStep, onBack }: ProgressIndicatorProps) => {
  const steps = [
    { id: 'form', label: 'Preencher', icon: Edit },
    { id: 'confirmation', label: 'Revisar', icon: FileText },
    { id: 'success', label: 'Concluído', icon: Check },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="w-full max-w-md mx-auto mb-4 md:mb-6">
      {/* Mobile Back Button */}
      {currentStepIndex > 0 && onBack && (
        <div className="mb-3 md:hidden">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-slate-600 hover:text-slate-800 hover:bg-white/50 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs mt-2 font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-blue-600'
                      : isCompleted
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                    index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 