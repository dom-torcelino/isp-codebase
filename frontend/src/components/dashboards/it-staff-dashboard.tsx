import { KPICard } from '../shared/kpi-card';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Wrench, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../shared/status-badge';
import { SLAChip } from '../shared/sla-chip';
import { mockTickets } from '../../lib/mock-data';
import { Button } from '../ui/button';

export function ITStaffDashboard() {
  // Filter IT and repair tickets
  const itTickets = mockTickets.filter(t => 
    t.category === 'it_support' || t.category === 'repair'
  );

  const myTickets = itTickets.filter(t => t.assigneeId === 'tech-1');
  const unassigned = itTickets.filter(t => !t.assigneeId);

  return (
    <div className="space-y-8 p-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="My Open Tickets"
          value={myTickets.length}
          icon={<Wrench className="w-5 h-5" />}
          trend="neutral"
          change="Same as yesterday"
        />
        <KPICard
          title="Unassigned"
          value={unassigned.length}
          icon={<AlertTriangle className="w-5 h-5" />}
          trend="down"
          change="2 less than yesterday"
        />
        <KPICard
          title="Resolved Today"
          value={5}
          icon={<CheckCircle className="w-5 h-5" />}
          trend="up"
          change="25% more than yesterday"
        />
        <KPICard
          title="Avg Resolution Time"
          value="4.2h"
          icon={<Clock className="w-5 h-5" />}
          trend="down"
          change="Improved by 15%"
        />
      </div>

      {/* My Assigned Tickets */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>My Assigned Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SLA Due</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myTickets.map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-accent">
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.customerName}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{ticket.subject}</TableCell>
                  <TableCell>
                    <PriorityBadge priority={ticket.priority} />
                  </TableCell>
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
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Unassigned Tickets */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Unassigned Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unassigned.map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-accent">
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.customerName}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{ticket.subject}</TableCell>
                  <TableCell>
                    <PriorityBadge priority={ticket.priority} />
                  </TableCell>
                  <TableCell>
                    <Button size="sm">Accept</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
