import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { FileText, DollarSign, AlertCircle, Clock } from 'lucide-react';
import { StatusBadge } from '../shared/status-badge';
import type { Invoice } from '../../lib/types';
import { useState } from 'react';

interface InvoiceDetailSheetProps {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const lineItems = [
  { description: 'Fiber 100 Mbps - Monthly Subscription', quantity: 1, unitPrice: 1200, amount: 1200 },
  { description: 'Router Rental', quantity: 1, unitPrice: 150, amount: 150 },
  { description: 'Installation Fee', quantity: 1, unitPrice: 500, amount: 500 },
];

const activityTimeline = [
  {
    id: '1',
    type: 'created',
    timestamp: '2025-10-01T09:00:00Z',
    user: 'System',
    description: 'Invoice created'
  },
  {
    id: '2',
    type: 'sent',
    timestamp: '2025-10-01T10:00:00Z',
    user: 'Billing System',
    description: 'Invoice sent to customer'
  },
  {
    id: '3',
    type: 'viewed',
    timestamp: '2025-10-05T14:30:00Z',
    user: 'Customer',
    description: 'Invoice viewed by customer'
  }
];

export function InvoiceDetailSheet({ invoice, open, onOpenChange }: InvoiceDetailSheetProps) {
  const [logPaymentDialog, setLogPaymentDialog] = useState(false);
  const [refundDialog, setRefundDialog] = useState(false);
  const [disputeDialog, setDisputeDialog] = useState(false);

  if (!invoice) return null;

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.12; // 12% VAT
  const total = subtotal + tax;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {invoice.id}
            </SheetTitle>
            <SheetDescription>Invoice Details</SheetDescription>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Status and Amount */}
            <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
              <div>
                <p className="text-muted-foreground mb-1">Status</p>
                <StatusBadge status={invoice.status} type="invoice" />
              </div>
              <div className="text-right">
                <p className="text-muted-foreground mb-1">Total Amount</p>
                <p className="display">₱{invoice.amount.toLocaleString()}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h4 className="mb-3">Customer Information</h4>
              <div className="p-4 bg-accent rounded-lg space-y-2">
                <p>{invoice.customerName}</p>
                <p className="text-muted-foreground">Customer ID: {invoice.customerId}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground mb-1">Issued Date</p>
                <p>{new Date(invoice.issuedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Due Date</p>
                <p>{new Date(invoice.dueDate).toLocaleDateString()}</p>
              </div>
            </div>

            <Separator />

            {/* Line Items */}
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Line Items
              </h4>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-accent">
                    <tr>
                      <th className="text-left p-3">Description</th>
                      <th className="text-right p-3">Qty</th>
                      <th className="text-right p-3">Price</th>
                      <th className="text-right p-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="p-3">{item.description}</td>
                        <td className="text-right p-3">{item.quantity}</td>
                        <td className="text-right p-3">₱{item.unitPrice.toLocaleString()}</td>
                        <td className="text-right p-3">₱{item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t-2 border-border">
                    <tr>
                      <td colSpan={3} className="text-right p-3 text-muted-foreground">Subtotal</td>
                      <td className="text-right p-3">₱{subtotal.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-right p-3 text-muted-foreground">VAT (12%)</td>
                      <td className="text-right p-3">₱{tax.toLocaleString()}</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td colSpan={3} className="text-right p-3">Total</td>
                      <td className="text-right p-3">₱{total.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <Separator />

            {/* Activity Timeline */}
            <div>
              <h4 className="mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Activity Timeline
              </h4>
              <div className="space-y-4">
                {activityTimeline.map((event, index) => (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {index < activityTimeline.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{event.description}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">{event.user}</span>
                      </div>
                      <p className="text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 sticky bottom-0 bg-surface pb-4 pt-4 border-t border-border">
              <Button 
                className="w-full gap-2"
                onClick={() => setLogPaymentDialog(true)}
              >
                <DollarSign className="w-4 h-4" />
                Log Payment
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setRefundDialog(true)}
                >
                  Issue Refund
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setDisputeDialog(true)}
                >
                  <AlertCircle className="w-4 h-4" />
                  Mark Dispute
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Log Payment Dialog */}
      <AlertDialog open={logPaymentDialog} onOpenChange={setLogPaymentDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Confirm payment received for invoice {invoice.id}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm Payment</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Issue Refund Dialog */}
      <AlertDialog open={refundDialog} onOpenChange={setRefundDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Issue Refund</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to issue a refund for invoice {invoice.id}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-white">
              Issue Refund
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Mark Dispute Dialog */}
      <AlertDialog open={disputeDialog} onOpenChange={setDisputeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark as Disputed</AlertDialogTitle>
            <AlertDialogDescription>
              Mark invoice {invoice.id} as disputed? This will flag the invoice for review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-warning text-white">
              Mark Dispute
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
