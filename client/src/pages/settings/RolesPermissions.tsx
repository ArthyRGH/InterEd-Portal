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
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusCircle, Edit, Trash, Search, Copy, Shield } from "lucide-react";

// Mock data for roles
const roles = [
  { 
    id: 1, 
    name: "Administrator", 
    description: "Full system access", 
    users: 2,
    isSystem: true
  },
  { 
    id: 2, 
    name: "Manager", 
    description: "Management access with limited system configuration", 
    users: 5,
    isSystem: true
  },
  { 
    id: 3, 
    name: "Staff", 
    description: "Standard staff access for daily operations", 
    users: 12,
    isSystem: true
  },
  { 
    id: 4, 
    name: "Agent", 
    description: "External agent access with limited student management", 
    users: 8,
    isSystem: true
  },
  { 
    id: 5, 
    name: "Custom Role", 
    description: "Custom permissions for specific team", 
    users: 3,
    isSystem: false
  }
];

// Mock data for permissions by module
const permissionModules = [
  {
    id: 1,
    name: "Dashboard",
    permissions: [
      { id: 1, name: "View Dashboard", description: "Access to view dashboard" },
      { id: 2, name: "View Analytics", description: "Access to view analytics" }
    ]
  },
  {
    id: 2,
    name: "Student Management",
    permissions: [
      { id: 3, name: "View Students", description: "Access to view student records" },
      { id: 4, name: "Create Students", description: "Ability to create new student records" },
      { id: 5, name: "Edit Students", description: "Ability to edit student records" },
      { id: 6, name: "Delete Students", description: "Ability to delete student records" }
    ]
  },
  {
    id: 3,
    name: "Application Management",
    permissions: [
      { id: 7, name: "View Applications", description: "Access to view applications" },
      { id: 8, name: "Create Applications", description: "Ability to create new applications" },
      { id: 9, name: "Edit Applications", description: "Ability to edit applications" },
      { id: 10, name: "Delete Applications", description: "Ability to delete applications" },
      { id: 11, name: "Change Application Status", description: "Ability to change application status" }
    ]
  }
];

export default function RolesPermissions() {
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter roles based on search query
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleSelect = (roleId: number) => {
    setSelectedRole(roleId);
    setActiveTab("permissions");
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions" disabled={selectedRole === null}>Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Role Management</CardTitle>
                <CardDescription>
                  Manage roles and their assigned permissions
                </CardDescription>
              </div>
              <Button onClick={() => setIsAddRoleOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Role
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search roles..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          No roles found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRoles.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell className="font-medium">{role.name}</TableCell>
                          <TableCell>{role.description}</TableCell>
                          <TableCell>{role.users}</TableCell>
                          <TableCell>
                            {role.isSystem ? "System" : "Custom"}
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleRoleSelect(role.id)}>
                              <Shield className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" disabled={role.isSystem}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4">
          {selectedRole !== null && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Permissions for {roles.find(r => r.id === selectedRole)?.name}</CardTitle>
                  <CardDescription>
                    Configure permissions for this role
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setActiveTab("roles")}>
                  Back to Roles
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {permissionModules.map((module) => (
                    <div key={module.id} className="space-y-4">
                      <h3 className="text-lg font-medium">{module.name}</h3>
                      <div className="border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12"></TableHead>
                              <TableHead>Permission</TableHead>
                              <TableHead>Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {module.permissions.map((permission) => (
                              <TableRow key={permission.id}>
                                <TableCell>
                                  <Checkbox id={`permission-${permission.id}`} />
                                </TableCell>
                                <TableCell>
                                  <Label htmlFor={`permission-${permission.id}`} className="font-medium">
                                    {permission.name}
                                  </Label>
                                </TableCell>
                                <TableCell>{permission.description}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Reset</Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Add Role Dialog */}
      <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
            <DialogDescription>
              Create a new role with specific permissions
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role-name" className="text-right">
                Role Name
              </Label>
              <Input id="role-name" placeholder="Role Name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role-description" className="text-right">
                Description
              </Label>
              <Input id="role-description" placeholder="Role description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Base On
              </Label>
              <div className="col-span-3">
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Create from scratch</option>
                  <option value="administrator">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>Cancel</Button>
            <Button>Create Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}