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
import { CreditCard, DollarSign, AlertCircle, Calendar, Plus } from 'lucide-react';
import { StatusBadge } from '../shared/status-badge';
import { mockInvoices } from '../../lib/mock-data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const collectionsData = [
  { month: 'Jun', collected: 125000, target: 130000 },
  { month: 'Jul', collected: 138000, target: 135000 },
  { month: 'Aug', collected: 142000, target: 140000 },
  { month: 'Sep', collected: 151000, target: 150000 },
  { month: 'Oct', collected: 148000, target: 155000 },
];

export function BillingOfficerDashboard() {
  const overdueInvoices = mockInvoices.filter(i => i.status === 'overdue');
  const totalOverdue = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-8 p-8">
      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Invoice
        </Button>
        <Button variant="secondary" className="gap-2">
          <DollarSign className="w-4 h-4" />
          Log Payment
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Billed"
          value={185000}
          icon={<CreditCard className="w-5 h-5" />}
          trend="up"
          change="8% from last month"
          format="currency"
        />
        <KPICard
          title="Collected"
          value={148000}
          icon={<DollarSign className="w-5 h-5" />}
          trend="up"
          change="5% from last month"
          format="currency"
        />
        <KPICard
          title="Overdue"
          value={totalOverdue}
          icon={<AlertCircle className="w-5 h-5" />}
          trend="down"
          change="3% from last month"
          format="currency"
        />
        <KPICard
          title="Payments Today"
          value={12}
          icon={<Calendar className="w-5 h-5" />}
          trend="neutral"
          change="Same as yesterday"
        />
      </div>

      {/* Collections vs Target Chart */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Collections vs Target</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={collectionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
              <Bar dataKey="collected" fill="#1F7A8C" name="Collected" />
              <Bar dataKey="target" fill="#F4A261" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="cursor-pointer hover:bg-accent">
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.customerName}</TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>₱{invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} type="invoice" />
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
    </div>
  );
}
