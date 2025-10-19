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
import { Building2, Users, DollarSign, TrendingUp, Plus } from 'lucide-react';
import { Badge } from '../ui/badge';
import { mockTenants } from '../../lib/mock-data';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const platformGrowth = [
  { month: 'Jun', tenants: 45, customers: 8500 },
  { month: 'Jul', tenants: 48, customers: 9200 },
  { month: 'Aug', tenants: 52, customers: 10100 },
  { month: 'Sep', tenants: 55, customers: 11000 },
  { month: 'Oct', tenants: 58, customers: 11800 },
];

const revenueByTenant = [
  { tenant: 'Metro Manila', revenue: 148000 },
  { tenant: 'Cebu Broadband', revenue: 95000 },
  { tenant: 'Davao Connect', revenue: 52000 },
];

export function SuperAdminDashboard() {
  return (
    <div className="space-y-8 p-8">
      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Tenant
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Tenants"
          value={58}
          icon={<Building2 className="w-5 h-5" />}
          trend="up"
          change="5.5% from last month"
        />
        <KPICard
          title="Active Customers"
          value={11800}
          icon={<Users className="w-5 h-5" />}
          trend="up"
          change="7.3% from last month"
        />
        <KPICard
          title="Platform Revenue"
          value={295000}
          icon={<DollarSign className="w-5 h-5" />}
          trend="up"
          change="3.2% from last month"
          format="currency"
        />
        <KPICard
          title="Growth Rate"
          value={12.5}
          icon={<TrendingUp className="w-5 h-5" />}
          trend="up"
          change="1.5% from last month"
          format="percentage"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Growth */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={platformGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="tenants" stroke="#1F7A8C" strokeWidth={2} name="Tenants" />
                <Line yAxisId="right" type="monotone" dataKey="customers" stroke="#F4A261" strokeWidth={2} name="Customers" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue by Tenant */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Revenue by Tenant (Top 3)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueByTenant}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tenant" />
                <YAxis />
                <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#1F7A8C" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tenants Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Customers</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTenants.map((tenant) => (
                <TableRow key={tenant.id} className="hover:bg-accent">
                  <TableCell>{tenant.name}</TableCell>
                  <TableCell>
                    <Badge variant={tenant.status === 'active' ? 'default' : 'outline'}>
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{tenant.admin}</TableCell>
                  <TableCell>{tenant.customers.toLocaleString()}</TableCell>
                  <TableCell>{tenant.plan}</TableCell>
                  <TableCell>{new Date(tenant.createdAt).toLocaleDateString()}</TableCell>
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
