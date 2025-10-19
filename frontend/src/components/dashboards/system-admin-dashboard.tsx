import { KPICard } from '../shared/kpi-card';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Ticket, CreditCard, DollarSign, AlertTriangle, Plus, FileText, UserPlus, Calendar } from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../shared/status-badge';
import { SLAChip } from '../shared/sla-chip';
import { mockTickets, mockInvoices, mockPayments } from '../../lib/mock-data';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ticketsByStatus = [
  { name: 'Open', value: 12, color: '#1F7A8C' },
  { name: 'In Progress', value: 8, color: '#3FBAC2' },
  { name: 'Resolved', value: 24, color: '#2F855A' },
  { name: 'Escalated', value: 3, color: '#B91C1C' },
];

const revenueData = [
  { month: 'Jun', revenue: 125000 },
  { month: 'Jul', revenue: 138000 },
  { month: 'Aug', revenue: 142000 },
  { month: 'Sep', revenue: 151000 },
  { month: 'Oct', revenue: 148000 },
];

const revenueByPlan = [
  { plan: 'Fiber 50', revenue: 45000 },
  { plan: 'Fiber 100', revenue: 68000 },
  { plan: 'Fiber 200', revenue: 35000 },
];

export function SystemAdminDashboard() {
  const highPriorityTickets = mockTickets.filter(t => 
    t.priority === 'high' || t.priority === 'critical'
  ).slice(0, 5);

  const recentPayments = mockPayments.slice(0, 5);

  return (
    <div className="space-y-8 p-8">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Ticket
        </Button>
        <Button variant="secondary" className="gap-2">
          <FileText className="w-4 h-4" />
          Log Payment
        </Button>
        <Button variant="secondary" className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add Customer
        </Button>
        <Button variant="secondary" className="gap-2">
          <Calendar className="w-4 h-4" />
          Assign Job
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Open Tickets"
          value={47}
          icon={<Ticket className="w-5 h-5" />}
          trend="down"
          change="12% from last week"
        />
        <KPICard
          title="Overdue Invoices"
          value={23}
          icon={<CreditCard className="w-5 h-5" />}
          trend="up"
          change="5% from last week"
          format="number"
        />
        <KPICard
          title="Monthly Revenue"
          value={148000}
          icon={<DollarSign className="w-5 h-5" />}
          trend="down"
          change="2% from last month"
          format="currency"
        />
        <KPICard
          title="SLA Breaches"
          value={3}
          icon={<AlertTriangle className="w-5 h-5" />}
          trend="neutral"
          change="Same as last week"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets by Status */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Tickets by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={ticketsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ticketsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card className="shadow-soft lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
                <Line type="monotone" dataKey="revenue" stroke="#1F7A8C" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Plan */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Revenue by Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueByPlan}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plan" />
              <YAxis />
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#1F7A8C" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Priority Tickets */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>High Priority Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>SLA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {highPriorityTickets.map((ticket) => (
                  <TableRow key={ticket.id} className="cursor-pointer hover:bg-accent">
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>{ticket.customerName}</TableCell>
                    <TableCell>
                      <PriorityBadge priority={ticket.priority} />
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.customerName}</TableCell>
                    <TableCell>₱{payment.amount.toLocaleString()}</TableCell>
                    <TableCell className="capitalize">{payment.method.replace('_', ' ')}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
