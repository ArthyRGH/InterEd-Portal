import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, MessageSquare, AlertTriangle } from "lucide-react";

// Notification categories
const notificationCategories = [
  {
    id: "system",
    label: "System Notifications",
    items: [
      { id: "maintenance", label: "System Maintenance", description: "Notifications about planned maintenance periods" },
      { id: "updates", label: "System Updates", description: "Notifications about system updates and new features" },
      { id: "security", label: "Security Alerts", description: "Important security alerts and information" }
    ]
  },
  {
    id: "students",
    label: "Student Notifications",
    items: [
      { id: "student_registration", label: "New Student Registration", description: "Alert when a new student registers" },
      { id: "student_update", label: "Student Profile Updates", description: "Notifications about student information updates" },
      { id: "student_document", label: "Student Document Upload", description: "Alert when students upload new documents" }
    ]
  },
  {
    id: "applications",
    label: "Application Notifications",
    items: [
      { id: "application_new", label: "New Application Submitted", description: "Alert when a new application is submitted" },
      { id: "application_update", label: "Application Status Change", description: "Notifications about application status updates" },
      { id: "application_document", label: "Application Document Added", description: "Alert when documents are added to applications" }
    ]
  },
  {
    id: "agents",
    label: "Agent Notifications",
    items: [
      { id: "agent_registration", label: "New Agent Registration", description: "Alert when a new agent registers" },
      { id: "agent_approval", label: "Agent Approval Required", description: "Notifications requiring agent approval actions" },
      { id: "agent_performance", label: "Agent Performance Updates", description: "Updates about agent performance metrics" }
    ]
  }
];

export default function NotificationSettings() {
  const [activeTab, setActiveTab] = React.useState("email");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Configure what notifications you receive and how they're delivered
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="app" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>In-App</span>
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>SMS</span>
              </TabsTrigger>
            </TabsList>
            
            {["email", "app", "sms"].map((channel) => (
              <TabsContent key={channel} value={channel} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Global Settings for {channel === "app" ? "In-App" : channel.charAt(0).toUpperCase() + channel.slice(1)} Notifications</h3>
                      <p className="text-sm text-muted-foreground">These settings apply to all {channel === "app" ? "in-app" : channel} notifications</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`enable-all-${channel}`}>Enable All</Label>
                      <Switch id={`enable-all-${channel}`} defaultChecked={channel !== "sms"} />
                    </div>
                  </div>
                  
                  {channel === "email" && (
                    <div className="flex items-center gap-4 pt-2">
                      <Label htmlFor="digest-frequency">Digest Frequency</Label>
                      <Select defaultValue="realtime">
                        <SelectTrigger id="digest-frequency" className="w-[180px]">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Digest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                {notificationCategories.map((category) => (
                  <div key={category.id} className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      {category.id === "system" && <AlertTriangle className="h-4 w-4" />}
                      {category.id === "students" && <Badge variant="outline">Student</Badge>}
                      {category.id === "applications" && <Badge variant="outline">Application</Badge>}
                      {category.id === "agents" && <Badge variant="outline">Agent</Badge>}
                      {category.label}
                    </h3>
                    
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor={`${channel}-${item.id}`}>{item.label}</Label>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <Switch 
                            id={`${channel}-${item.id}`} 
                            defaultChecked={
                              (channel === "email" && category.id !== "agents") || 
                              (channel === "app") || 
                              (channel === "sms" && item.id === "security")
                            } 
                          />
                        </div>
                      ))}
                    </div>
                    
                    {category.id !== notificationCategories[notificationCategories.length - 1].id && (
                      <Separator />
                    )}
                  </div>
                ))}
                
                <div className="flex justify-end pt-2">
                  <Button>Save Preferences</Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}