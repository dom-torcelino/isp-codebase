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
import { CreditCard, Calendar, Ticket, Plus, DollarSign } from 'lucide-react';
import { StatusBadge } from '../shared/status-badge';
import { mockInvoices, mockTickets } from '../../lib/mock-data';

export function CustomerPortalDashboard() {
  // Mock customer data
  const customerId = 'cust-1';
  const customerInvoices = mockInvoices.filter(i => i.customerId === customerId);
  const customerTickets = mockTickets.filter(t => t.customerId === customerId);
  
  const outstandingBalance = customerInvoices
    .filter(i => i.status !== 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const nextBillDate = '2025-11-01';
  const openTicketsCount = customerTickets.filter(t => t.status === 'open').length;

  return (
    <div className="space-y-8 p-8 max-w-6xl mx-auto">
      {/* Hero Card */}
      <Card className="shadow-soft-lg bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2>Welcome back, Roberto</h2>
              <p className="text-muted-foreground mt-1">Fiber 100 Mbps Plan</p>
            </div>
            <div className="flex gap-2">
              <Button className="gap-2">
                <DollarSign className="w-4 h-4" />
                Make Payment
              </Button>
              <Button variant="outline" className="gap-2">
                <Ticket className="w-4 h-4" />
                New Ticket
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Outstanding Balance"
          value={outstandingBalance}
          icon={<CreditCard className="w-5 h-5" />}
          format="currency"
        />
        <KPICard
          title="Next Bill Date"
          value={new Date(nextBillDate).toLocaleDateString()}
          icon={<Calendar className="w-5 h-5" />}
        />
        <KPICard
          title="Open Tickets"
          value={openTicketsCount}
          icon={<Ticket className="w-5 h-5" />}
        />
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Invoices</span>
              <Button variant="ghost" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerInvoices.slice(0, 3).map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>₱{invoice.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} type="invoice" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* My Tickets */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>My Tickets</span>
              <Button variant="ghost" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerTickets.slice(0, 3).map((ticket) => (
                  <TableRow key={ticket.id} className="cursor-pointer hover:bg-accent">
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{ticket.subject}</TableCell>
                    <TableCell>
                      <StatusBadge status={ticket.status} type="ticket" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <h4 className="mb-2">Contact Support</h4>
              <p className="text-muted-foreground">Get help from our team</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <h4 className="mb-2">FAQs</h4>
              <p className="text-muted-foreground">Find quick answers</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
              <h4 className="mb-2">Service Status</h4>
              <p className="text-muted-foreground">Check network status</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
