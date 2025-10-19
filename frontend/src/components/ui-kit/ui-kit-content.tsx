'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  XCircle,
  Search,
  Home,
  Settings,
  Users
} from 'lucide-react';
import { KPICard } from '@/components/shared/kpi-card';
import { StatusBadge } from '@/components/shared/status-badge';
import { SLAChip } from '@/components/shared/sla-chip';

export function UIKitContent() {
  return (
    <div className="p-8 space-y-12">
      {/* Header */}
      <div>
        <h1 className="mb-2">UI Kit</h1>
        <p className="text-muted-foreground">
          Complete design system documentation with all components, tokens, and guidelines.
        </p>
      </div>

      {/* Design Tokens */}
      <section className="space-y-6">
        <div>
          <h2 className="mb-4">Design Tokens</h2>
        </div>

        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Colors</CardTitle>
            <CardDescription>Color palette with light and dark mode support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Primary Colors */}
            <div>
              <h3 className="mb-3">Primary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-primary rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Primary</div>
                    <div className="text-muted-foreground">#0052CC</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-primary-foreground border border-border rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Primary Foreground</div>
                    <div className="text-muted-foreground">#FFFFFF</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-accent rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Accent</div>
                    <div className="text-muted-foreground">#2E90FA</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-secondary rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Secondary</div>
                    <div className="text-muted-foreground">#EAECF0</div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Colors */}
            <div>
              <h3 className="mb-3">System</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-success rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Success</div>
                    <div className="text-muted-foreground">#00875A</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-warning rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Warning</div>
                    <div className="text-muted-foreground">#FFAB00</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-destructive rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Destructive</div>
                    <div className="text-muted-foreground">#DE350B</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-info rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Info</div>
                    <div className="text-muted-foreground">#2E90FA</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Neutral Colors */}
            <div>
              <h3 className="mb-3">Neutral</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-background border border-border rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Background</div>
                    <div className="text-muted-foreground">#FFFFFF</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-foreground rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Foreground</div>
                    <div className="text-muted-foreground">#101828</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-muted rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Muted</div>
                    <div className="text-muted-foreground">#F4F5F7</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-border rounded-lg shadow-sm" />
                  <div className="caption">
                    <div>Border</div>
                    <div className="text-muted-foreground">#EAECF0</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Font: Inter | Base size: 16px</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="display">Display / 32px</div>
            <h1>Heading 1 / 24px</h1>
            <h2>Heading 2 / 20px</h2>
            <h3>Heading 3 / 18px</h3>
            <p>Body / 16px - The quick brown fox jumps over the lazy dog</p>
            <div className="caption">Caption / 12px - Small descriptive text</div>
          </CardContent>
        </Card>

        {/* Spacing */}
        <Card>
          <CardHeader>
            <CardTitle>Spacing Scale</CardTitle>
            <CardDescription>4px base unit (4, 8, 12, 16, 20, 24, 32)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[4, 8, 12, 16, 20, 24, 32].map((size) => (
                <div key={size} className="flex items-center gap-4">
                  <div className="w-12 caption text-muted-foreground">{size}px</div>
                  <div className="h-8 bg-primary rounded" style={{ width: `${size}px` }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Border Radius */}
        <Card>
          <CardHeader>
            <CardTitle>Border Radius</CardTitle>
            <CardDescription>Rounded corners (6, 8, 12, 16)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { size: 6, name: 'Small' },
                { size: 8, name: 'Medium' },
                { size: 12, name: 'Large' },
                { size: 16, name: 'XL' }
              ].map(({ size, name }) => (
                <div key={size} className="space-y-2">
                  <div 
                    className="h-20 bg-primary" 
                    style={{ borderRadius: `${size}px` }} 
                  />
                  <div className="caption">
                    <div>{name}</div>
                    <div className="text-muted-foreground">{size}px</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shadows */}
        <Card>
          <CardHeader>
            <CardTitle>Shadows</CardTitle>
            <CardDescription>Elevation levels (xs, sm, md)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="h-20 bg-card shadow-xs rounded-lg" />
                <div className="caption text-center">Extra Small</div>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-card shadow-soft rounded-lg" />
                <div className="caption text-center">Small</div>
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-card shadow-soft-lg rounded-lg" />
                <div className="caption text-center">Medium</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Components */}
      <section className="space-y-6">
        <div>
          <h2 className="mb-4">Components</h2>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>All button variants and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <div>
              <h3 className="mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><Settings className="w-4 h-4" /></Button>
              </div>
            </div>
            <div>
              <h3 className="mb-3">States</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Input fields and form controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="input-1">Input</Label>
                <Input id="input-1" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="input-2">Input with Icon</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="input-2" className="pl-9" placeholder="Search..." />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="textarea-1">Textarea</Label>
              <Textarea id="textarea-1" placeholder="Enter description..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="select-1">Select</Label>
              <Select>
                <SelectTrigger id="select-1">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Checkboxes, Radio, Switch */}
        <Card>
          <CardHeader>
            <CardTitle>Selection Controls</CardTitle>
            <CardDescription>Checkboxes, radio buttons, and switches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-3">Checkboxes</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="check-1" />
                  <Label htmlFor="check-1">Default checkbox</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="check-2" defaultChecked />
                  <Label htmlFor="check-2">Checked checkbox</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="check-3" disabled />
                  <Label htmlFor="check-3">Disabled checkbox</Label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="mb-3">Radio Group</h3>
              <RadioGroup defaultValue="radio-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="radio-1" id="radio-1" />
                  <Label htmlFor="radio-1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="radio-2" id="radio-2" />
                  <Label htmlFor="radio-2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="radio-3" id="radio-3" disabled />
                  <Label htmlFor="radio-3">Disabled option</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <h3 className="mb-3">Switch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch id="switch-1" />
                  <Label htmlFor="switch-1">Default switch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="switch-2" defaultChecked />
                  <Label htmlFor="switch-2">Checked switch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="switch-3" disabled />
                  <Label htmlFor="switch-3">Disabled switch</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status and priority indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-3">Default Badges</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
            <div>
              <h3 className="mb-3">Status Badges</h3>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="open" />
                <StatusBadge status="in_progress" />
                <StatusBadge status="resolved" />
                <StatusBadge status="closed" />
                <StatusBadge status="pending" />
              </div>
            </div>
            <div>
              <h3 className="mb-3">SLA Indicators</h3>
              <div className="flex flex-wrap gap-2">
                <SLAChip breachTime={new Date(Date.now() + 2 * 60 * 60 * 1000)} compact />
                <SLAChip breachTime={new Date(Date.now() + 30 * 60 * 1000)} compact />
                <SLAChip breachTime={new Date(Date.now() - 30 * 60 * 1000)} compact />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            <CardDescription>Container components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Card</CardTitle>
                  <CardDescription>Card with header and content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Card content goes here</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                  <CardDescription>Card with action footer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Card content goes here</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <KPICard
                title="Total Revenue"
                value={125000}
                format="currency"
                trend="up"
                change="+12.5%"
                icon={<CheckCircle2 className="w-5 h-5" />}
              />
              <KPICard
                title="Active Tickets"
                value={42}
                trend="down"
                change="-8.3%"
                icon={<AlertCircle className="w-5 h-5" />}
              />
              <KPICard
                title="Customer Satisfaction"
                value={94}
                format="percentage"
                trend="up"
                change="+2.1%"
                icon={<CheckCircle2 className="w-5 h-5" />}
              />
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Notification messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>This is an informational message.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>This is an error message.</AlertDescription>
            </Alert>
            <Alert className="border-success text-success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>This is a success message.</AlertDescription>
            </Alert>
            <Alert className="border-warning text-warning">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>This is a warning message.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>Tabbed navigation</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4">
                <p className="text-muted-foreground">Content for tab 1</p>
              </TabsContent>
              <TabsContent value="tab2" className="mt-4">
                <p className="text-muted-foreground">Content for tab 2</p>
              </TabsContent>
              <TabsContent value="tab3" className="mt-4">
                <p className="text-muted-foreground">Content for tab 3</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Progress & Slider */}
        <Card>
          <CardHeader>
            <CardTitle>Progress & Slider</CardTitle>
            <CardDescription>Progress indicators and sliders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-3">Progress</h3>
              <div className="space-y-3">
                <Progress value={33} />
                <Progress value={66} />
                <Progress value={100} />
              </div>
            </div>
            <div>
              <h3 className="mb-3">Slider</h3>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </CardContent>
        </Card>

        {/* Avatar */}
        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>User profile images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback><Users className="w-4 h-4" /></AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        {/* Other Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Other Elements</CardTitle>
            <CardDescription>Separators and additional components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-3">Separator</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">Content above</p>
                <Separator />
                <p className="text-muted-foreground">Content below</p>
              </div>
            </div>
            <div>
              <h3 className="mb-3">Calendar</h3>
              <Calendar mode="single" className="rounded-md border" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Accessibility Guidelines */}
      <section className="space-y-6">
        <div>
          <h2 className="mb-4">Accessibility (WCAG 2.2 AA)</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
            <CardDescription>Built-in accessibility compliance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-2">Focus Rings</h3>
              <p className="text-muted-foreground mb-3">
                All interactive elements have visible focus indicators with 2px ring offset
              </p>
              <div className="flex gap-3">
                <Button className="focus-ring">Focusable Button</Button>
                <Input className="focus-ring max-w-xs" placeholder="Focusable input" />
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="mb-2">Touch Targets</h3>
              <p className="text-muted-foreground mb-3">
                Minimum 44×44px touch target size for all interactive elements
              </p>
              <div className="flex gap-2">
                <Button size="icon" className="touch-target">
                  <Home className="w-4 h-4" />
                </Button>
                <Button size="icon" className="touch-target">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button size="icon" className="touch-target">
                  <Users className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="mb-2">Color Contrast</h3>
              <p className="text-muted-foreground">
                All text and interactive elements meet WCAG 2.2 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="mb-2">Status Indicators</h3>
              <p className="text-muted-foreground mb-3">
                Status information does not rely solely on color - icons and text labels are included
              </p>
              <div className="flex gap-2">
                <Badge className="bg-success text-white">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Success
                </Badge>
                <Badge className="bg-warning text-white">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Warning
                </Badge>
                <Badge className="bg-destructive text-white">
                  <XCircle className="w-3 h-3 mr-1" />
                  Error
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
