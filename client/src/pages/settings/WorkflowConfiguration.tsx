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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Edit, 
  Trash, 
  Play, 
  Pause, 
  Plus, 
  Search,
  ArrowUpDown,
  AlertTriangle,
  MoreHorizontal,
  ArrowRightLeft,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock data for workflows
const workflows = [
  { 
    id: 1, 
    name: "New Student Application", 
    description: "Handles the process flow for new student applications", 
    triggerType: "Event", 
    status: "Active",
    lastModified: "2023-04-15T10:30:00Z" 
  },
  { 
    id: 2, 
    name: "Document Verification", 
    description: "Process for verifying student documents", 
    triggerType: "Manual", 
    status: "Active",
    lastModified: "2023-04-16T14:20:00Z" 
  },
  { 
    id: 3, 
    name: "Application Approval", 
    description: "Multi-step approval process for student applications", 
    triggerType: "Event", 
    status: "Active",
    lastModified: "2023-04-17T09:15:00Z" 
  },
  { 
    id: 4, 
    name: "Agent Onboarding", 
    description: "Onboarding workflow for new recruitment agents", 
    triggerType: "Manual", 
    status: "Inactive",
    lastModified: "2023-04-18T11:45:00Z" 
  },
  { 
    id: 5, 
    name: "Offer Letter Generation", 
    description: "Automated offer letter creation and delivery", 
    triggerType: "Event", 
    status: "Active",
    lastModified: "2023-04-19T16:20:00Z" 
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

export default function WorkflowConfiguration() {
  const [isAddWorkflowOpen, setIsAddWorkflowOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter workflows based on search query and active tab
  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = 
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && workflow.status === "Active";
    if (activeTab === "inactive") return matchesSearch && workflow.status === "Inactive";
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Workflow Management</CardTitle>
            <CardDescription>
              Configure automated workflows for business processes
            </CardDescription>
          </div>
          <Button onClick={() => setIsAddWorkflowOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Workflow
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All Workflows</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search workflows..."
                    className="w-[250px] pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <TabsContent value="all" className="space-y-4">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        <div className="flex items-center gap-1">
                          Workflow Name
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Trigger Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredWorkflows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No workflows found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredWorkflows.map((workflow) => (
                        <TableRow key={workflow.id}>
                          <TableCell className="font-medium">{workflow.name}</TableCell>
                          <TableCell>{workflow.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {workflow.triggerType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={workflow.status === "Active" ? "success" : "secondary"}>
                              {workflow.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(workflow.lastModified)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Workflow Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                                  <span>Edit Flow</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Settings className="mr-2 h-4 w-4" />
                                  <span>Configure</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>View Logs</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {workflow.status === "Active" ? (
                                  <DropdownMenuItem>
                                    <Pause className="mr-2 h-4 w-4" />
                                    <span>Deactivate</span>
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem>
                                    <Play className="mr-2 h-4 w-4" />
                                    <span>Activate</span>
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-destructive">
                                  <Trash className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              {/* This content is dynamically generated based on the activeTab state */}
            </TabsContent>
            
            <TabsContent value="inactive" className="space-y-4">
              {/* This content is dynamically generated based on the activeTab state */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Workflow Dialog */}
      <Dialog open={isAddWorkflowOpen} onOpenChange={setIsAddWorkflowOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Workflow</DialogTitle>
            <DialogDescription>
              Define a new automated workflow for your business process
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="workflow-name">Workflow Name</Label>
              <Input id="workflow-name" placeholder="Enter workflow name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workflow-description">Description</Label>
              <Textarea 
                id="workflow-description" 
                placeholder="Describe the purpose of this workflow" 
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trigger-type">Trigger Type</Label>
              <Select>
                <SelectTrigger id="trigger-type">
                  <SelectValue placeholder="Select trigger type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="event">Event Based</SelectItem>
                  <SelectItem value="manual">Manual Trigger</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-md bg-amber-50 p-3 border border-amber-200">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <div className="ml-2">
                  <p className="text-sm text-amber-800">
                    After creating the workflow, you'll be redirected to the workflow editor to define the process steps.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddWorkflowOpen(false)}>Cancel</Button>
            <Button>Create & Configure</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}