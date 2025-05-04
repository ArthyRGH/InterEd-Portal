import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Trash, 
  Edit, 
  MoreHorizontal, 
  Copy, 
  Eye, 
  Play,
  Clock,
  AlertCircle,
  Webhook,
  RefreshCw
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for webhooks
const webhooks = [
  { 
    id: 1, 
    name: "Student Application Status Updates", 
    url: "https://crm.example.com/webhooks/intered/application-status", 
    events: ["application.submitted", "application.updated", "application.status_changed"],
    active: true,
    createdAt: "2023-04-15T10:30:00Z",
    lastTriggered: "2023-05-02T14:20:00Z",
    lastResponse: { status: 200, message: "Success" }
  },
  { 
    id: 2, 
    name: "Student Registration Notifications", 
    url: "https://notifications.example.com/intered/new-student", 
    events: ["student.created"],
    active: true,
    createdAt: "2023-04-20T09:15:00Z",
    lastTriggered: "2023-05-01T11:45:00Z", 
    lastResponse: { status: 200, message: "Success" }
  },
  { 
    id: 3, 
    name: "Payment Status Updates", 
    url: "https://finance.example.org/webhooks/payment-updates", 
    events: ["payment.received", "payment.failed", "payment.refunded"],
    active: true,
    createdAt: "2023-04-25T16:20:00Z",
    lastTriggered: "2023-05-02T09:10:00Z",
    lastResponse: { status: 200, message: "Success" }
  },
  { 
    id: 4, 
    name: "Document Processing Updates", 
    url: "https://docs.example.com/intered-webhook", 
    events: ["document.uploaded", "document.verified", "document.rejected"],
    active: false,
    createdAt: "2023-03-10T13:40:00Z",
    lastTriggered: "2023-04-01T15:30:00Z", 
    lastResponse: { status: 500, message: "Internal Server Error" }
  },
  { 
    id: 5, 
    name: "University Admission Decisions", 
    url: "https://integrations.example.edu/intered", 
    events: ["admission.decision", "offer.sent"],
    active: true,
    createdAt: "2023-04-18T11:25:00Z",
    lastTriggered: "2023-05-02T08:50:00Z",
    lastResponse: { status: 200, message: "Success" }
  }
];

// Format date to readable format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Available webhook events
const availableEvents = [
  // Student events
  { value: "student.created", label: "Student Created", category: "Students" },
  { value: "student.updated", label: "Student Updated", category: "Students" },
  { value: "student.deleted", label: "Student Deleted", category: "Students" },
  { value: "student.status_changed", label: "Student Status Changed", category: "Students" },
  
  // Application events
  { value: "application.submitted", label: "Application Submitted", category: "Applications" },
  { value: "application.updated", label: "Application Updated", category: "Applications" },
  { value: "application.status_changed", label: "Application Status Changed", category: "Applications" },
  { value: "application.document_uploaded", label: "Application Document Uploaded", category: "Applications" },
  
  // Admission events
  { value: "admission.decision", label: "Admission Decision Made", category: "Admissions" },
  { value: "offer.sent", label: "Offer Letter Sent", category: "Admissions" },
  { value: "offer.accepted", label: "Offer Accepted", category: "Admissions" },
  { value: "offer.declined", label: "Offer Declined", category: "Admissions" },
  
  // Payment events
  { value: "payment.received", label: "Payment Received", category: "Payments" },
  { value: "payment.failed", label: "Payment Failed", category: "Payments" },
  { value: "payment.refunded", label: "Payment Refunded", category: "Payments" },
  
  // Document events
  { value: "document.uploaded", label: "Document Uploaded", category: "Documents" },
  { value: "document.verified", label: "Document Verified", category: "Documents" },
  { value: "document.rejected", label: "Document Rejected", category: "Documents" }
];

// Group events by category
const groupedEvents = availableEvents.reduce((acc, event) => {
  if (!acc[event.category]) {
    acc[event.category] = [];
  }
  acc[event.category].push(event);
  return acc;
}, {} as Record<string, typeof availableEvents>);

export default function Webhooks() {
  const [isCreateWebhookOpen, setIsCreateWebhookOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [webhookDetails, setWebhookDetails] = useState<(typeof webhooks)[0] | null>(null);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

  // Toggle event selection
  const toggleEvent = (event: string) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter(e => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  // View webhook details
  const viewWebhookDetails = (webhook: typeof webhooks[0]) => {
    setWebhookDetails(webhook);
    setIsViewDetailsOpen(true);
  };

  // Example webhook payload based on event
  const getExamplePayload = (eventName: string) => {
    switch (eventName) {
      case 'student.created':
        return `{
  "event": "student.created",
  "timestamp": "${new Date().toISOString()}",
  "data": {
    "id": 123,
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@example.com",
    "status": "active",
    "createdAt": "${new Date().toISOString()}"
  }
}`;
      case 'application.submitted':
        return `{
  "event": "application.submitted",
  "timestamp": "${new Date().toISOString()}",
  "data": {
    "id": 456,
    "studentId": 123,
    "universityId": 45,
    "programId": 67,
    "status": "submitted",
    "submittedAt": "${new Date().toISOString()}"
  }
}`;
      case 'payment.received':
        return `{
  "event": "payment.received",
  "timestamp": "${new Date().toISOString()}",
  "data": {
    "id": 789,
    "studentId": 123,
    "amount": 1500.00,
    "currency": "USD",
    "paymentMethod": "credit_card",
    "status": "completed",
    "receivedAt": "${new Date().toISOString()}"
  }
}`;
      default:
        return `{
  "event": "${eventName}",
  "timestamp": "${new Date().toISOString()}",
  "data": {
    "id": 123,
    "details": "Example payload for ${eventName} event"
  }
}`;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Webhooks</CardTitle>
            <CardDescription>
              Manage webhook endpoints for real-time event notifications
            </CardDescription>
          </div>
          <Button onClick={() => setIsCreateWebhookOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Webhook
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="mb-4 border-blue-500 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">About Webhooks</AlertTitle>
              <AlertDescription className="text-blue-700">
                Webhooks allow external applications to receive real-time notifications when specific events occur in the InterEd platform.
              </AlertDescription>
            </Alert>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Triggered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell className="font-medium">{webhook.name}</TableCell>
                      <TableCell className="font-mono text-xs truncate max-w-[200px]">{webhook.url}</TableCell>
                      <TableCell>{webhook.events.length} events</TableCell>
                      <TableCell>
                        <Badge variant={webhook.active ? "success" : "secondary"}>
                          {webhook.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span>{formatDate(webhook.lastTriggered)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => viewWebhookDetails(webhook)}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              <span>Test</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Webhook Dialog */}
      <Dialog open={isCreateWebhookOpen} onOpenChange={setIsCreateWebhookOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Webhook</DialogTitle>
            <DialogDescription>
              Set up a new webhook endpoint to receive event notifications
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-name">Webhook Name</Label>
              <Input id="webhook-name" placeholder="e.g., CRM Integration Webhook" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Endpoint URL</Label>
              <Input id="webhook-url" placeholder="https://example.com/webhooks/intered" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook-secret">Secret (Optional)</Label>
              <Input id="webhook-secret" type="password" placeholder="••••••••" />
              <p className="text-xs text-muted-foreground">
                This will be used to sign the webhook payload for verification.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Select Events</Label>
              <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                <Accordion type="multiple" className="w-full">
                  {Object.entries(groupedEvents).map(([category, events]) => (
                    <AccordionItem key={category} value={category}>
                      <AccordionTrigger className="py-2">
                        {category}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-2">
                          {events.map((event) => (
                            <div key={event.value} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`event-${event.value}`} 
                                checked={selectedEvents.includes(event.value)}
                                onCheckedChange={() => toggleEvent(event.value)}
                              />
                              <Label htmlFor={`event-${event.value}`} className="cursor-pointer text-sm">
                                {event.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateWebhookOpen(false)}>Cancel</Button>
            <Button>Create Webhook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Webhook Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="max-w-3xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Webhook Details</DialogTitle>
            <DialogDescription>
              {webhookDetails?.name}
            </DialogDescription>
          </DialogHeader>
          
          {webhookDetails && (
            <div className="space-y-6 py-4 overflow-y-auto max-h-[calc(80vh-10rem)]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant={webhookDetails.active ? "success" : "secondary"}>
                      {webhookDetails.active ? "Active" : "Inactive"}
                    </Badge>
                    <Switch id="webhook-status" checked={webhookDetails.active} />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Created At</h3>
                  <p className="text-sm">{formatDate(webhookDetails.createdAt)}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Endpoint URL</h3>
                  <div className="flex items-center">
                    <code className="bg-muted p-2 rounded-md text-xs font-mono w-full overflow-x-auto">
                      {webhookDetails.url}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigator.clipboard.writeText(webhookDetails.url)}
                      className="ml-2 h-6 w-6 flex-shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Subscribed Events</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {webhookDetails.events.map((event) => (
                    <Badge key={event} variant="outline" className="text-xs">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Last Delivery</h3>
                  <Badge 
                    variant={webhookDetails.lastResponse.status >= 200 && webhookDetails.lastResponse.status < 300 ? "success" : "destructive"}
                    className="text-xs"
                  >
                    Status: {webhookDetails.lastResponse.status}
                  </Badge>
                </div>
                <div className="bg-muted rounded-md p-3 text-xs">
                  <div className="font-medium mb-1">Time:</div>
                  <div className="mb-2">{formatDate(webhookDetails.lastTriggered)}</div>
                  
                  <div className="font-medium mb-1">Response:</div>
                  <div>{webhookDetails.lastResponse.message}</div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Example Payload</h3>
                <Select defaultValue={webhookDetails.events[0]}>
                  <SelectTrigger className="mb-2">
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    {webhookDetails.events.map((event) => (
                      <SelectItem key={event} value={event}>
                        {event}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="bg-[#1e1e1e] text-white p-4 rounded-md overflow-x-auto">
                  <pre className="text-xs font-mono whitespace-pre">{getExamplePayload(webhookDetails.events[0])}</pre>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="gap-1">
                <RefreshCw className="h-4 w-4" />
                Test
              </Button>
              <Button variant="destructive" size="sm" className="gap-1">
                <Trash className="h-4 w-4" />
                Delete
              </Button>
            </div>
            <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}