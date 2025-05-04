import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Code, Key, Webhook, BookOpen, Activity, Plus } from "lucide-react";
import { useLocation } from "wouter";

// Placeholder content components
const ApiKeys = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">API Keys Management</h2>
    <p>Manage your API keys, permissions and access control.</p>
  </div>
);

const ApiDocumentation = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">API Documentation</h2>
    <p>Access detailed API reference documentation and guides.</p>
  </div>
);

const Webhooks = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Webhooks</h2>
    <p>Configure webhook endpoints for real-time notifications.</p>
  </div>
);

// Define the tabs
const API_MANAGEMENT_TABS = [
  {
    id: 'keys',
    label: 'API Keys',
    icon: Key
  },
  {
    id: 'docs',
    label: 'Documentation',
    icon: BookOpen
  },
  {
    id: 'webhooks',
    label: 'Webhooks',
    icon: Webhook
  },
  {
    id: 'logs',
    label: 'API Logs',
    icon: Activity
  }
];

export default function ApiManagement() {
  const [activeTab, setActiveTab] = useState("keys");
  const [, navigate] = useLocation();

  // Function to handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/api/${value === 'keys' ? '' : value}`);
  };

  // Render the active tab content based on the currently selected tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'keys':
        return <ApiKeys />;
      case 'docs':
        return <ApiDocumentation />;
      case 'webhooks':
        return <Webhooks />;
      case 'logs':
        return <div className="p-4">API Logs content will be displayed here</div>;
      default:
        return <ApiKeys />;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Management</h1>
          <p className="text-muted-foreground">
            Manage API keys, documentation, and webhook integrations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            <span>Search APIs</span>
          </Button>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>New API Key</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="bg-background border-b w-full justify-start rounded-none gap-0 px-0 h-auto flex-wrap">
          {API_MANAGEMENT_TABS.map((tab) => (
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