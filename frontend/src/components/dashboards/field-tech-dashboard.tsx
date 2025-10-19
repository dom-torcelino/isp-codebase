import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Phone, MapPin, Clock, ChevronRight } from 'lucide-react';
import { PriorityBadge } from '../shared/status-badge';
import { SLAChip } from '../shared/sla-chip';
import { mockTickets, mockCustomers } from '../../lib/mock-data';

export function FieldTechDashboard() {
  // Filter installation and repair tickets
  const jobs = mockTickets.filter(t => 
    t.category === 'installation' || t.category === 'repair'
  ).map(ticket => {
    const customer = mockCustomers.find(c => c.id === ticket.customerId);
    return { ...ticket, customerPhone: customer?.phone, customerAddress: customer?.address };
  });

  return (
    <div className="space-y-6 p-4 max-w-2xl mx-auto">
      <h2>My Jobs</h2>

      {/* Job Cards - Mobile First Design */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="shadow-soft-lg cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-2">{job.id}</CardTitle>
                  <p className="text-muted-foreground">{job.customerName}</p>
                </div>
                <PriorityBadge priority={job.priority} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Info */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-muted-foreground">Address</p>
                  <p>{job.customerAddress}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <Button variant="link" className="p-0 h-auto">
                  {job.customerPhone}
                </Button>
              </div>

              {/* Job Type */}
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">
                  {job.category}
                </Badge>
                <Badge variant="outline">
                  {job.status.replace('_', ' ')}
                </Badge>
              </div>

              {/* SLA */}
              {job.slaOnsiteDue && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <SLAChip type="onsite" dueDate={job.slaOnsiteDue} breached={job.slaBreach} />
                </div>
              )}

              {/* Job Details */}
              <div>
                <p className="text-muted-foreground mb-1">Issue</p>
                <p>{job.subject}</p>
              </div>

              {/* Action Button */}
              <Button className="w-full gap-2" size="lg">
                View Details
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {jobs.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No jobs assigned</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
