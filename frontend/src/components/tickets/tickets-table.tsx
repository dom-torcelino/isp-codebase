import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search, Filter, Plus } from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../shared/status-badge';
import { SLAChip, SLABadge } from '../shared/sla-chip';
import { mockTickets } from '../../lib/mock-data';
import type { Ticket } from '../../lib/types';

interface TicketsTableProps {
  onRowClick: (ticket: Ticket) => void;
  onCreateTicket?: () => void;
}

export function TicketsTable({ onRowClick, onCreateTicket }: TicketsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets] = useState(mockTickets);

  const filteredTickets = tickets.filter(ticket =>
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          {onCreateTicket && (
            <Button onClick={onCreateTicket} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Ticket
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg shadow-soft overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SLA Due</TableHead>
              <TableHead>Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No tickets found
                </TableCell>
              </TableRow>
            ) : (
              filteredTickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  onClick={() => onRowClick(ticket)}
                  className="cursor-pointer hover:bg-accent transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {ticket.id}
                      {ticket.slaBreach && <SLABadge breached={true} />}
                    </div>
                  </TableCell>
                  <TableCell>{ticket.customerName}</TableCell>
                  <TableCell className="capitalize">
                    {ticket.category.replace('_', ' ')}
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={ticket.priority} />
                  </TableCell>
                  <TableCell>{ticket.assigneeName || 'Unassigned'}</TableCell>
                  <TableCell>
                    <StatusBadge status={ticket.status} type="ticket" />
                  </TableCell>
                  <TableCell>
                    {ticket.slaResolveDue && (
                      <SLAChip
                        type="resolve"
                        dueDate={ticket.slaResolveDue}
                        breached={ticket.slaBreach}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
