import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { StatusBadge, PriorityBadge } from '../shared/status-badge';
import { SLAChip, SLABadge } from '../shared/sla-chip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { User, Clock, FileText, Paperclip, MessageSquare } from 'lucide-react';
import type { Ticket } from '../../lib/types';

interface TicketDetailSheetProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timelineEvents = [
  {
    id: '1',
    type: 'created',
    timestamp: '2025-10-16T08:30:00Z',
    user: 'System',
    description: 'Ticket created'
  },
  {
    id: '2',
    type: 'assignment',
    timestamp: '2025-10-16T08:35:00Z',
    user: 'Admin User',
    description: 'Assigned to John Tech'
  },
  {
    id: '3',
    type: 'note',
    timestamp: '2025-10-16T09:00:00Z',
    user: 'John Tech',
    description: 'Contacted customer, scheduled visit for 2 PM'
  }
];

export function TicketDetailSheet({ ticket, open, onOpenChange }: TicketDetailSheetProps) {
  if (!ticket) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {ticket.id}
            {ticket.slaBreach && <SLABadge breached={true} />}
          </SheetTitle>
          <SheetDescription>{ticket.subject}</SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Status and Priority */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="text-muted-foreground mb-2 block">Status</label>
              <Select defaultValue={ticket.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="onsite">Onsite</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="text-muted-foreground mb-2 block">Priority</label>
              <Select defaultValue={ticket.priority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Customer Info */}
          <div className="p-4 bg-accent rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-primary" />
              <span>Customer</span>
            </div>
            <div className="space-y-1">
              <p>{ticket.customerName}</p>
              <p className="text-muted-foreground">ID: {ticket.customerId}</p>
            </div>
          </div>

          {/* SLA Metrics */}
          {(ticket.slaRespondDue || ticket.slaOnsiteDue || ticket.slaResolveDue) && (
            <div>
              <h4 className="mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                SLA Metrics
              </h4>
              <div className="flex flex-wrap gap-2">
                {ticket.slaRespondDue && (
                  <SLAChip type="respond" dueDate={ticket.slaRespondDue} breached={ticket.slaBreach} />
                )}
                {ticket.slaOnsiteDue && (
                  <SLAChip type="onsite" dueDate={ticket.slaOnsiteDue} breached={ticket.slaBreach} />
                )}
                {ticket.slaResolveDue && (
                  <SLAChip type="resolve" dueDate={ticket.slaResolveDue} breached={ticket.slaBreach} />
                )}
              </div>
            </div>
          )}

          <Separator />

          {/* Description */}
          <div>
            <h4 className="mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Description
            </h4>
            <p className="text-muted-foreground">{ticket.description}</p>
          </div>

          {/* Assignee */}
          <div>
            <label className="text-muted-foreground mb-2 block">Assignee</label>
            <Select defaultValue={ticket.assigneeId || 'unassigned'}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="tech-1">John Tech</SelectItem>
                <SelectItem value="tech-2">Mike Installer</SelectItem>
                <SelectItem value="support-1">Jane Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <h4 className="mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Timeline
            </h4>
            <div className="space-y-4">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {index < timelineEvents.length - 1 && (
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

          <Separator />

          {/* Internal Notes */}
          <div>
            <h4 className="mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Internal Notes
            </h4>
            <Textarea
              placeholder="Add internal note (not visible to customer)..."
              rows={3}
            />
            <Button className="mt-2">Add Note</Button>
          </div>

          {/* Attachments */}
          <div>
            <h4 className="mb-2 flex items-center gap-2">
              <Paperclip className="w-4 h-4" />
              Attachments
            </h4>
            <Button variant="outline" className="w-full">
              Upload File
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 sticky bottom-0 bg-surface pb-4">
            <Button className="flex-1">Save Changes</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
