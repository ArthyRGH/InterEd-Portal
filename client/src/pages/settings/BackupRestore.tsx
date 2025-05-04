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
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Download, 
  Upload, 
  Calendar, 
  Database, 
  HardDrive, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  FileArchive,
  Trash
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock data for backups
const backups = [
  { 
    id: 1, 
    name: "Full System Backup", 
    createdAt: "2023-05-01T10:30:00Z", 
    size: "245 MB",
    type: "Full",
    status: "Completed"
  },
  { 
    id: 2, 
    name: "Database Backup", 
    createdAt: "2023-05-02T14:20:00Z", 
    size: "128 MB",
    type: "Database",
    status: "Completed"
  },
  { 
    id: 3, 
    name: "User Data Backup", 
    createdAt: "2023-05-03T09:15:00Z", 
    size: "87 MB",
    type: "Partial",
    status: "Completed"
  },
  { 
    id: 4, 
    name: "Weekly Auto Backup", 
    createdAt: "2023-04-25T11:45:00Z", 
    size: "240 MB",
    type: "Full",
    status: "Completed"
  },
  { 
    id: 5, 
    name: "Pre-Update Snapshot", 
    createdAt: "2023-04-20T16:20:00Z", 
    size: "236 MB",
    type: "Full",
    status: "Completed"
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

export default function BackupRestore() {
  const [activeTab, setActiveTab] = useState("backups");
  const [isCreateBackupOpen, setIsCreateBackupOpen] = useState(false);
  const [isRestoreOpen, setIsRestoreOpen] = useState(false);
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [restoreInProgress, setRestoreInProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  // Simulated backup process
  const startBackup = () => {
    setBackupInProgress(true);
    setProgressValue(0);
    
    const interval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setBackupInProgress(false);
            setIsCreateBackupOpen(false);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  // Simulated restore process
  const startRestore = () => {
    setRestoreInProgress(true);
    setProgressValue(0);
    
    const interval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setRestoreInProgress(false);
            setIsRestoreOpen(false);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="backups" className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <span>Backups</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Backup Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="restore" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>Restore</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="backups" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>System Backups</CardTitle>
                <CardDescription>
                  Create and manage system backup archives
                </CardDescription>
              </div>
              <Button onClick={() => setIsCreateBackupOpen(true)}>
                <Database className="mr-2 h-4 w-4" />
                Create Backup
              </Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Backup Name</TableHead>
                      <TableHead>Date Created</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell className="font-medium">{backup.name}</TableCell>
                        <TableCell>{formatDate(backup.createdAt)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {backup.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>
                          <Badge variant="success" className="flex w-fit items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {backup.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setIsRestoreOpen(true)}>
                            <RefreshCw className="h-4 w-4" />
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
        
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup Schedule</CardTitle>
              <CardDescription>
                Configure automated backup schedules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Automated Backups</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable scheduled system backups
                  </p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-time">Backup Time</Label>
                  <Select defaultValue="00:00">
                    <SelectTrigger id="backup-time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="00:00">12:00 AM</SelectItem>
                      <SelectItem value="03:00">3:00 AM</SelectItem>
                      <SelectItem value="06:00">6:00 AM</SelectItem>
                      <SelectItem value="21:00">9:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-retention">Retention Period</Label>
                  <Select defaultValue="30">
                    <SelectTrigger id="backup-retention">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-type">Backup Type</Label>
                  <Select defaultValue="full">
                    <SelectTrigger id="backup-type">
                      <SelectValue placeholder="Select backup type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Backup</SelectItem>
                      <SelectItem value="differential">Differential</SelectItem>
                      <SelectItem value="incremental">Incremental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Automated backups require sufficient storage space. Please ensure you have enough disk space allocated.
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-end">
                <Button>Save Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="restore" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Restore</CardTitle>
              <CardDescription>
                Restore system from a backup or upload a backup file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Restoring from a backup will overwrite current data. Make sure to create a backup of your current system first.
                </AlertDescription>
              </Alert>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="restore-source">Restore Source</Label>
                  <Select defaultValue="existing">
                    <SelectTrigger id="restore-source">
                      <SelectValue placeholder="Select restore source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="existing">Existing Backup</SelectItem>
                      <SelectItem value="upload">Upload Backup File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-select">Select Backup</Label>
                  <Select>
                    <SelectTrigger id="backup-select">
                      <SelectValue placeholder="Choose a backup to restore" />
                    </SelectTrigger>
                    <SelectContent>
                      {backups.map(backup => (
                        <SelectItem key={backup.id} value={String(backup.id)}>
                          {backup.name} ({formatDate(backup.createdAt)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  <Label htmlFor="restore-options" className="text-lg font-medium">Upload Backup File</Label>
                </div>
                
                <div className="border-2 border-dashed rounded-md p-8 text-center">
                  <FileArchive className="h-10 w-10 mx-auto text-muted-foreground" />
                  <div className="mt-4 space-y-2">
                    <h3 className="text-lg font-semibold">Drag & Drop Backup File</h3>
                    <p className="text-sm text-muted-foreground">
                      or click to browse for a backup file
                    </p>
                    <Button variant="secondary" className="mt-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive" onClick={() => setIsRestoreOpen(true)}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Begin Restore
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Backup Dialog */}
      <Dialog open={isCreateBackupOpen} onOpenChange={setIsCreateBackupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Backup</DialogTitle>
            <DialogDescription>
              Create a new system backup
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="backup-name">Backup Name</Label>
              <Input id="backup-name" placeholder="e.g., Manual Backup May 2023" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backup-type">Backup Type</Label>
              <Select defaultValue="full">
                <SelectTrigger id="backup-type">
                  <SelectValue placeholder="Select backup type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full System Backup</SelectItem>
                  <SelectItem value="database">Database Only</SelectItem>
                  <SelectItem value="files">File Storage Only</SelectItem>
                  <SelectItem value="config">Configuration Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {backupInProgress && (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <Label>Backup Progress</Label>
                  <span className="text-sm">{progressValue}%</span>
                </div>
                <Progress value={progressValue} className="h-2" />
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>This may take several minutes...</span>
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateBackupOpen(false)} disabled={backupInProgress}>Cancel</Button>
            <Button onClick={startBackup} disabled={backupInProgress}>
              {backupInProgress ? "Creating..." : "Create Backup"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restore Confirmation Dialog */}
      <Dialog open={isRestoreOpen} onOpenChange={setIsRestoreOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm System Restore</DialogTitle>
            <DialogDescription>
              This action will restore your system to a previous state. All current data will be replaced.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This action cannot be undone. Active user sessions will be terminated.
              </AlertDescription>
            </Alert>
            
            {restoreInProgress && (
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <Label>Restore Progress</Label>
                  <span className="text-sm">{progressValue}%</span>
                </div>
                <Progress value={progressValue} className="h-2" />
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Please do not close this browser or shut down the system...</span>
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRestoreOpen(false)} disabled={restoreInProgress}>Cancel</Button>
            <Button variant="destructive" onClick={startRestore} disabled={restoreInProgress}>
              {restoreInProgress ? "Restoring..." : "Confirm Restore"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}