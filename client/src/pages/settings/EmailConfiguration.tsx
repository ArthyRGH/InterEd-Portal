import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Mail, Edit, Eye, Trash, Copy, Send, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for email templates
const emailTemplates = [
  { 
    id: 1, 
    name: "Welcome Email", 
    subject: "Welcome to InterEd Recruitment Portal", 
    category: "User", 
    lastUpdated: "2023-04-15T10:30:00Z" 
  },
  { 
    id: 2, 
    name: "Password Reset", 
    subject: "Reset Your Password", 
    category: "User", 
    lastUpdated: "2023-04-16T14:20:00Z" 
  },
  { 
    id: 3, 
    name: "Student Application Received", 
    subject: "Your Application Has Been Received", 
    category: "Student", 
    lastUpdated: "2023-04-17T09:15:00Z" 
  },
  { 
    id: 4, 
    name: "Application Status Update", 
    subject: "Update on Your Application Status", 
    category: "Student", 
    lastUpdated: "2023-04-18T11:45:00Z" 
  },
  { 
    id: 5, 
    name: "Agent Registration Confirmation", 
    subject: "Your Agent Account has been Created", 
    category: "Agent", 
    lastUpdated: "2023-04-19T16:20:00Z" 
  }
];

// Format date to readable format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export default function EmailConfiguration() {
  const [activeTab, setActiveTab] = React.useState("smtp");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="smtp">SMTP Configuration</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="test">Test Email</TabsTrigger>
        </TabsList>
        
        <TabsContent value="smtp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SMTP Server Configuration</CardTitle>
              <CardDescription>
                Configure your email server settings for sending emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtp-provider">Email Provider</Label>
                  <Select defaultValue="custom">
                    <SelectTrigger id="smtp-provider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom SMTP</SelectItem>
                      <SelectItem value="gmail">Gmail</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailchimp">Mailchimp</SelectItem>
                      <SelectItem value="aws">Amazon SES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="from-email">From Email Address</Label>
                  <Input id="from-email" placeholder="noreply@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="from-name">From Name</Label>
                  <Input id="from-name" placeholder="InterEd Recruitment" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reply-to">Reply-To Email</Label>
                  <Input id="reply-to" placeholder="support@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" placeholder="smtp.example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" placeholder="587" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Username</Label>
                  <Input id="smtp-username" placeholder="smtp_username" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Password</Label>
                  <Input id="smtp-password" type="password" placeholder="••••••••" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="use-ssl" />
                  <Label htmlFor="use-ssl">Use SSL/TLS</Label>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <Button variant="outline" className="flex items-center gap-1">
                  <Send className="h-4 w-4" />
                  <span>Test Connection</span>
                </Button>
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>
                  Manage email templates for different notifications and communications
                </CardDescription>
              </div>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emailTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.subject}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              template.category === "User" 
                                ? "border-blue-500 text-blue-500" 
                                : template.category === "Student" 
                                ? "border-green-500 text-green-500" 
                                : "border-orange-500 text-orange-500"
                            }
                          >
                            {template.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(template.lastUpdated)}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Test Email</CardTitle>
              <CardDescription>
                Test your email configuration by sending a test email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="rounded-md bg-yellow-50 p-4 border border-yellow-200">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                    <h3 className="ml-2 text-sm font-medium text-yellow-800">
                      Test Email Information
                    </h3>
                  </div>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Make sure to configure your SMTP settings before sending a test email. This test will help verify your email configuration is working properly.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="test-recipient">Recipient Email</Label>
                  <Input id="test-recipient" placeholder="recipient@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="test-subject">Subject</Label>
                  <Input id="test-subject" placeholder="Test Email from InterEd Recruitment Platform" defaultValue="Test Email from InterEd Recruitment Platform" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="test-content">Email Content</Label>
                  <Textarea
                    id="test-content"
                    placeholder="Enter test email content here..."
                    className="min-h-[150px]"
                    defaultValue="This is a test email from the InterEd Recruitment Platform to verify that the email sending functionality is working correctly."
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="flex items-center gap-1">
                  <Send className="h-4 w-4" />
                  <span>Send Test Email</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}