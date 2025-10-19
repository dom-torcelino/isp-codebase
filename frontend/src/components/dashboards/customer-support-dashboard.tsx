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
import { Ticket, Users, Clock, AlertTriangle } from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../shared/status-badge';
import { SLAChip } from '../shared/sla-chip';
import { mockTickets } from '../../lib/mock-data';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function CustomerSupportDashboard() {
  const myTickets = mockTickets.filter(t => t.assigneeId === 'support-1');
  const unassignedTickets = mockTickets.filter(t => !t.assigneeId);
  const overdueTickets = mockTickets.filter(t => t.slaBreach);

  return (
    <div className="space-y-8 p-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="My Assigned"
          value={myTickets.length}
          icon={<Ticket className="w-5 h-5" />}
          trend="neutral"
          change="Same as yesterday"
        />
        <KPICard
          title="Unassigned"
          value={unassignedTickets.length}
          icon={<Users className="w-5 h-5" />}
          trend="up"
          change="2 new tickets"
        />
        <KPICard
          title="Overdue"
          value={overdueTickets.length}
          icon={<AlertTriangle className="w-5 h-5" />}
          trend="down"
          change="1 less than yesterday"
        />
        <KPICard
          title="Avg Response Time"
          value="12m"
          icon={<Clock className="w-5 h-5" />}
          trend="down"
          change="Improved by 20%"
        />
      </div>

      {/* Ticket Queue Tabs */}
      <Tabs defaultValue="my-assigned" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-assigned">My Assigned</TabsTrigger>
          <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="my-assigned">
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
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>SLA Due</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="cursor-pointer hover:bg-accent">
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.customerName}</TableCell>
                      <TableCell className="capitalize">{ticket.category.replace('_', ' ')}</TableCell>
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
        </TabsContent>

        <TabsContent value="unassigned">
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
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unassignedTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-accent">
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.customerName}</TableCell>
                      <TableCell className="capitalize">{ticket.category.replace('_', ' ')}</TableCell>
                      <TableCell>
                        <PriorityBadge priority={ticket.priority} />
                      </TableCell>
                      <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button size="sm">Assign to Me</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Overdue Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overdueTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-accent">
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.customerName}</TableCell>
                      <TableCell>{ticket.assigneeName || 'Unassigned'}</TableCell>
                      <TableCell>
                        <PriorityBadge priority={ticket.priority} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={ticket.status} type="ticket" />
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
