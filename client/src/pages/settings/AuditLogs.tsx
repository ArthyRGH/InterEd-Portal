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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarIcon, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText,
  User,
  Settings,
  Database,
  Trash,
  UserPlus,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for audit logs
const auditLogs = [
  { 
    id: 1, 
    action: "User Login", 
    user: "admin", 
    timestamp: "2023-05-01T10:30:00Z", 
    ipAddress: "192.168.1.1",
    status: "Success",
    details: "User 'admin' logged in successfully",
    module: "Authentication"
  },
  { 
    id: 2, 
    action: "Update Student", 
    user: "staff_user", 
    timestamp: "2023-05-01T11:15:00Z", 
    ipAddress: "192.168.1.5",
    status: "Success",
    details: "Updated student ID #1245 (John Smith) contact information",
    module: "Student Management"
  },
  { 
    id: 3, 
    action: "Delete Application", 
    user: "manager", 
    timestamp: "2023-05-01T12:30:00Z", 
    ipAddress: "192.168.1.10",
    status: "Success",
    details: "Deleted application ID #5432 for student Sarah Johnson",
    module: "Applications"
  },
  { 
    id: 4, 
    action: "Password Reset Attempt", 
    user: "unknown", 
    timestamp: "2023-05-01T14:45:00Z", 
    ipAddress: "192.168.1.25",
    status: "Failed",
    details: "Failed password reset attempt for user 'finance_admin'",
    module: "Authentication"
  },
  { 
    id: 5, 
    action: "System Backup", 
    user: "system", 
    timestamp: "2023-05-01T16:00:00Z", 
    ipAddress: "localhost",
    status: "Success",
    details: "Automated weekly system backup completed",
    module: "System"
  },
  { 
    id: 6, 
    action: "Create User", 
    user: "admin", 
    timestamp: "2023-05-01T17:30:00Z", 
    ipAddress: "192.168.1.1",
    status: "Success",
    details: "Created new user 'marketing_staff' with Staff role",
    module: "User Management"
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
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
};

// Get icon for module
const getModuleIcon = (module: string) => {
  switch (module) {
    case "Authentication":
      return <User className="h-4 w-4" />;
    case "Student Management":
      return <FileText className="h-4 w-4" />;
    case "Applications":
      return <FileText className="h-4 w-4" />;
    case "User Management":
      return <UserPlus className="h-4 w-4" />;
    case "System":
      return <Settings className="h-4 w-4" />;
    default:
      return <Database className="h-4 w-4" />;
  }
};

// Get icon for status
const getStatusIcon = (status: string) => {
  switch (status) {
    case "Success":
      return <CheckCircle className="h-4 w-4" />;
    case "Failed":
      return <XCircle className="h-4 w-4" />;
    case "Warning":
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isLogDetailsOpen, setIsLogDetailsOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<(typeof auditLogs)[0] | null>(null);

  // Filter logs based on search query, module, status and date
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesModule = selectedModule ? log.module === selectedModule : true;
    const matchesStatus = selectedStatus ? log.status === selectedStatus : true;
    
    let matchesDate = true;
    if (selectedDate) {
      const logDate = new Date(log.timestamp);
      matchesDate = 
        logDate.getDate() === selectedDate.getDate() &&
        logDate.getMonth() === selectedDate.getMonth() &&
        logDate.getFullYear() === selectedDate.getFullYear();
    }
    
    return matchesSearch && matchesModule && matchesStatus && matchesDate;
  });
  
  // Open log details
  const viewLogDetails = (log: (typeof auditLogs)[0]) => {
    setSelectedLog(log);
    setIsLogDetailsOpen(true);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedModule(null);
    setSelectedStatus(null);
    setSelectedDate(undefined);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Audit Logs</CardTitle>
            <CardDescription>
              Track and monitor user activities and system operations
            </CardDescription>
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search logs..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Module filter */}
              <Select value={selectedModule || ""} onValueChange={(value) => setSelectedModule(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Modules</SelectItem>
                  <SelectItem value="Authentication">Authentication</SelectItem>
                  <SelectItem value="Student Management">Student Management</SelectItem>
                  <SelectItem value="Applications">Applications</SelectItem>
                  <SelectItem value="User Management">User Management</SelectItem>
                  <SelectItem value="System">System</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Status filter */}
              <Select value={selectedStatus || ""} onValueChange={(value) => setSelectedStatus(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="Success">Success</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Warning">Warning</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Date filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[180px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              {/* Clear filters */}
              {(searchQuery || selectedModule || selectedStatus || selectedDate) && (
                <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-1">
                  <Trash className="h-4 w-4" />
                  <span>Clear filters</span>
                </Button>
              )}
            </div>
            
            {/* Results count */}
            <div className="text-sm text-muted-foreground">
              Showing {filteredLogs.length} of {auditLogs.length} logs
            </div>
            
            {/* Logs table */}
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No logs found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="flex w-fit items-center gap-1">
                            {getModuleIcon(log.module)}
                            {log.module}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={log.status === "Success" ? "success" : log.status === "Failed" ? "destructive" : "warning"}
                            className="flex w-fit items-center gap-1"
                          >
                            {getStatusIcon(log.status)}
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(log.timestamp)}</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => viewLogDetails(log)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Log Details Dialog */}
      <Dialog open={isLogDetailsOpen} onOpenChange={setIsLogDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected log entry
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Log ID</p>
                  <p className="font-medium">#{selectedLog.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">User</p>
                  <p className="font-medium">{selectedLog.user}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">IP Address</p>
                  <p className="font-medium">{selectedLog.ipAddress}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Action</p>
                <p className="font-medium">{selectedLog.action}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Module</p>
                  <Badge variant="outline" className="flex w-fit items-center gap-1">
                    {getModuleIcon(selectedLog.module)}
                    {selectedLog.module}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge 
                    variant={selectedLog.status === "Success" ? "success" : selectedLog.status === "Failed" ? "destructive" : "warning"}
                    className="flex w-fit items-center gap-1"
                  >
                    {getStatusIcon(selectedLog.status)}
                    {selectedLog.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                <p className="font-medium">{formatDate(selectedLog.timestamp)}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Details</p>
                <div className="bg-muted p-3 rounded-md text-sm">
                  {selectedLog.details}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}