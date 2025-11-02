import StepIndicator from '../StepIndicator';

export default function StepIndicatorExample() {
  return (
    <div className="space-y-12 p-8">
      <div>
        <p className="text-sm text-muted-foreground mb-4">Connect Step</p>
        <StepIndicator currentStep="connect" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-4">Deploy Step</p>
        <StepIndicator currentStep="deploy" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-4">Done Step</p>
        <StepIndicator currentStep="done" />
      </div>
    </div>
  );
}
