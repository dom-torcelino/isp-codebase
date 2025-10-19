import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Progress } from '../ui/progress';
import { Check } from 'lucide-react';

interface CreateTenantStepperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (tenant: any) => void;
}

type Step = 'company' | 'contacts' | 'plan' | 'admin' | 'review';

export function CreateTenantStepper({ open, onOpenChange, onSubmit }: CreateTenantStepperProps) {
  const [currentStep, setCurrentStep] = useState<Step>('company');
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    address: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    plan: 'starter',
    adminName: '',
    adminEmail: '',
    adminPassword: ''
  });

  const steps: Step[] = ['company', 'contacts', 'plan', 'admin', 'review'];
  const stepIndex = steps.indexOf(currentStep);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
    onOpenChange(false);
    setCurrentStep('company');
    setFormData({
      companyName: '',
      industry: '',
      address: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      plan: 'starter',
      adminName: '',
      adminEmail: '',
      adminPassword: ''
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'company':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Metro Manila Fiber"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) => setFormData({ ...formData, industry: value })}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="isp">ISP / Telecom</SelectItem>
                  <SelectItem value="cable">Cable TV</SelectItem>
                  <SelectItem value="fiber">Fiber Provider</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Business St, Manila"
              />
            </div>
          </div>
        );

      case 'contacts':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Primary Contact Name</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="Juan dela Cruz"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="contact@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="+63 917 123 4567"
              />
            </div>
          </div>
        );

      case 'plan':
        return (
          <div className="space-y-4">
            <Label>Select Plan</Label>
            <div className="grid grid-cols-1 gap-4">
              {[
                { value: 'starter', name: 'Starter', price: '₱2,500/mo', features: ['Up to 100 customers', 'Basic support', '1 admin user'] },
                { value: 'professional', name: 'Professional', price: '₱5,000/mo', features: ['Up to 500 customers', 'Priority support', '5 admin users'] },
                { value: 'enterprise', name: 'Enterprise', price: '₱10,000/mo', features: ['Unlimited customers', '24/7 support', 'Unlimited users'] }
              ].map((plan) => (
                <div
                  key={plan.value}
                  onClick={() => setFormData({ ...formData, plan: plan.value })}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.plan === plan.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4>{plan.name}</h4>
                    <span className="text-primary">{plan.price}</span>
                  </div>
                  <ul className="space-y-1 text-muted-foreground">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'admin':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminName">Default Admin Name</Label>
              <Input
                id="adminName"
                value={formData.adminName}
                onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                placeholder="Admin User"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={formData.adminEmail}
                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                placeholder="admin@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminPassword">Temporary Password</Label>
              <Input
                id="adminPassword"
                type="password"
                value={formData.adminPassword}
                onChange={(e) => setFormData({ ...formData, adminPassword: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="mb-3">Review & Confirm</h4>
              <div className="space-y-3 bg-accent p-4 rounded-lg">
                <div>
                  <p className="text-muted-foreground">Company</p>
                  <p>{formData.companyName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contact</p>
                  <p>{formData.contactName} ({formData.contactEmail})</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Plan</p>
                  <p className="capitalize">{formData.plan}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Admin</p>
                  <p>{formData.adminName} ({formData.adminEmail})</p>
                </div>
              </div>
            </div>
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
              <p className="text-muted-foreground">
                Payment details would be collected here in production.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles: Record<Step, string> = {
      company: 'Company Information',
      contacts: 'Contact Details',
      plan: 'Choose Plan',
      admin: 'Default Admin',
      review: 'Review & Confirm'
    };
    return titles[currentStep];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Tenant</DialogTitle>
          <DialogDescription>{getStepTitle()}</DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-muted-foreground mt-2">
            Step {stepIndex + 1} of {steps.length}
          </p>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {renderStepContent()}
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 'company'}
          >
            Back
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          {currentStep === 'review' ? (
            <Button onClick={handleSubmit}>Create Tenant</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
