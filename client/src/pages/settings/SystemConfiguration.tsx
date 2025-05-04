import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Settings, Users, ShieldCheck, Bell, Mail, GitBranch, Database, FileText } from "lucide-react";
import { useLocation } from "wouter";
import GeneralSettings from "./GeneralSettings";
import UserManagement from "./UserManagement";
import RolesPermissions from "./RolesPermissions";
import NotificationSettings from "./NotificationSettings";
import EmailConfiguration from "./EmailConfiguration";
import WorkflowConfiguration from "./WorkflowConfiguration";
import BackupRestore from "./BackupRestore";
import AuditLogs from "./AuditLogs";

// Define the tabs
const SETTINGS_TABS = [
  {
    id: 'general',
    label: 'General Settings',
    icon: Settings
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users
  },
  {
    id: 'roles',
    label: 'Roles & Permissions',
    icon: ShieldCheck
  },
  {
    id: 'notifications',
    label: 'Notification Settings',
    icon: Bell
  },
  {
    id: 'email',
    label: 'Email Configuration',
    icon: Mail
  },
  {
    id: 'workflows',
    label: 'Workflow Configuration',
    icon: GitBranch
  },
  {
    id: 'backup',
    label: 'Backup & Restore',
    icon: Database
  },
  {
    id: 'audit',
    label: 'Audit Logs',
    icon: FileText
  },
];

// Loading component
const TabLoading = () => (
  <div className="flex items-center justify-center h-32">
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  </div>
);

export default function SystemConfiguration() {
  const [activeTab, setActiveTab] = useState("general");
  const [, navigate] = useLocation();

  // Function to handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/settings/${value === 'general' ? '' : value}`);
  };

  // Render the active tab content based on the currently selected tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RolesPermissions />;
      case 'notifications':
        return <NotificationSettings />;
      case 'email':
        return <EmailConfiguration />;
      case 'workflows':
        return <WorkflowConfiguration />;
      case 'backup':
        return <BackupRestore />;
      case 'audit':
        return <AuditLogs />;
      default:
        return <div className="p-4">Select a tab to view settings</div>;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">System Configuration</h1>
          <p className="text-muted-foreground">
            Manage system settings, users, roles, and configurations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            <span>Search Settings</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="bg-background border-b w-full justify-start rounded-none gap-0 px-0 h-auto flex-wrap">
          {SETTINGS_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          {renderTabContent()}
        </div>
      </Tabs>
    </div>
  );
}