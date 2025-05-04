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
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  Copy, 
  Trash, 
  Key, 
  Plus, 
  MoreHorizontal, 
  Clipboard, 
  RefreshCw, 
  AlertCircle,
  Eye
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

// Mock data for API keys
const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "intd_prod_6f8a9d73e5b2c1f4a0d9e8b7c6f5a4d3",
    status: "Active",
    createdAt: "2023-04-15T10:30:00Z",
    lastUsed: "2023-05-01T14:20:00Z",
    scopes: ["students.read", "applications.read", "applications.write"]
  },
  {
    id: 2,
    name: "University Integration Key",
    key: "intd_univ_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
    status: "Active",
    createdAt: "2023-04-20T09:15:00Z",
    lastUsed: "2023-05-02T11:45:00Z",
    scopes: ["universities.read", "programs.read"]
  },
  {
    id: 3,
    name: "CRM Integration Key",
    key: "intd_crm_7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v",
    status: "Active",
    createdAt: "2023-04-25T16:20:00Z",
    lastUsed: "2023-05-01T09:10:00Z",
    scopes: ["students.read", "students.write", "applications.read"]
  },
  {
    id: 4,
    name: "Development Key",
    key: "intd_dev_3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9",
    status: "Inactive",
    createdAt: "2023-03-10T13:40:00Z",
    lastUsed: "2023-04-01T15:30:00Z",
    scopes: ["*"]
  },
  {
    id: 5,
    name: "Payment Gateway Key",
    key: "intd_pay_9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z",
    status: "Active",
    createdAt: "2023-04-18T11:25:00Z",
    lastUsed: "2023-05-02T08:50:00Z",
    scopes: ["payments.read", "payments.write"]
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

// Available API scopes
const availableScopes = [
  { value: "students.read", label: "Read Students" },
  { value: "students.write", label: "Write Students" },
  { value: "applications.read", label: "Read Applications" },
  { value: "applications.write", label: "Write Applications" },
  { value: "universities.read", label: "Read Universities" },
  { value: "universities.write", label: "Write Universities" },
  { value: "programs.read", label: "Read Programs" },
  { value: "programs.write", label: "Write Programs" },
  { value: "agents.read", label: "Read Agents" },
  { value: "agents.write", label: "Write Agents" },
  { value: "payments.read", label: "Read Payments" },
  { value: "payments.write", label: "Write Payments" },
  { value: "*", label: "All Permissions (Admin Only)" }
];

export default function ApiKeys() {
  const [isCreateKeyOpen, setIsCreateKeyOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [newKeyScopes, setNewKeyScopes] = useState<string[]>([]);
  const [keyDetails, setKeyDetails] = useState<(typeof apiKeys)[0] | null>(null);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

  // Copy API key to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // View API key details
  const viewKeyDetails = (key: typeof apiKeys[0]) => {
    setKeyDetails(key);
    setIsViewDetailsOpen(true);
  };

  // Toggle scope selection
  const toggleScope = (scope: string) => {
    if (newKeyScopes.includes(scope)) {
      setNewKeyScopes(newKeyScopes.filter(s => s !== scope));
    } else {
      setNewKeyScopes([...newKeyScopes, scope]);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage API keys for integrating with external systems and applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="mb-4 border-yellow-500 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-800">Important</AlertTitle>
              <AlertDescription className="text-yellow-700">
                API keys provide full access to your account. Never share your API keys and keep them secure.
              </AlertDescription>
            </Alert>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="font-mono text-sm">
                            {key.key.substring(0, 12)}...
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(key.key)}
                            className="ml-2 h-6 w-6"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={key.status === "Active" ? "success" : "secondary"}>
                          {key.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(key.createdAt)}</TableCell>
                      <TableCell>{formatDate(key.lastUsed)}</TableCell>
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
                            <DropdownMenuItem onClick={() => viewKeyDetails(key)}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyToClipboard(key.key)}>
                              <Clipboard className="mr-2 h-4 w-4" />
                              <span>Copy Key</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              <span>Regenerate</span>
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
            
            <div className="flex justify-end mt-4">
              <Button onClick={() => setIsCreateKeyOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create API Key
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create API Key Dialog */}
      <Dialog open={isCreateKeyOpen} onOpenChange={setIsCreateKeyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New API Key</DialogTitle>
            <DialogDescription>
              Generate a new API key for your application or integration
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="key-name">Key Name</Label>
              <Input id="key-name" placeholder="e.g., Production API Key" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="key-description">Description (Optional)</Label>
              <Textarea 
                id="key-description" 
                placeholder="Describe what this key will be used for" 
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Access Scopes</Label>
              <div className="border rounded-md p-4 space-y-3 max-h-[200px] overflow-y-auto">
                {availableScopes.map((scope) => (
                  <div key={scope.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`scope-${scope.value}`} 
                      checked={newKeyScopes.includes(scope.value)}
                      onCheckedChange={() => toggleScope(scope.value)}
                    />
                    <Label htmlFor={`scope-${scope.value}`} className="cursor-pointer">
                      {scope.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="key-expiry">Expiry (Optional)</Label>
              <Select>
                <SelectTrigger id="key-expiry">
                  <SelectValue placeholder="Never expires" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never expires</SelectItem>
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="90days">90 days</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateKeyOpen(false)}>Cancel</Button>
            <Button>Generate Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View API Key Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>API Key Details</DialogTitle>
            <DialogDescription>
              {keyDetails?.name}
            </DialogDescription>
          </DialogHeader>
          
          {keyDetails && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">API Key</h3>
                <div className="flex items-center">
                  <code className="bg-muted p-2 rounded-md text-xs font-mono w-full overflow-x-auto">
                    {keyDetails.key}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(keyDetails.key)}
                    className="ml-2 h-6 w-6 flex-shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                {isCopied && <span className="text-xs text-green-600">Copied to clipboard!</span>}
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                  <Badge variant={keyDetails.status === "Active" ? "success" : "secondary"}>
                    {keyDetails.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Created</h3>
                  <p className="text-sm">{formatDate(keyDetails.createdAt)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Last Used</h3>
                  <p className="text-sm">{formatDate(keyDetails.lastUsed)}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Allowed Scopes</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {keyDetails.scopes.map((scope) => (
                    <Badge key={scope} variant="outline" className="text-xs">
                      {scope}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between">
            <Button variant="destructive" size="sm">
              <Trash className="mr-2 h-4 w-4" />
              Delete Key
            </Button>
            <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}