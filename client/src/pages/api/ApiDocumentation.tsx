import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Copy, 
  Download, 
  ArrowRight, 
  FileText, 
  Terminal, 
  Code, 
  Database,
  ExternalLink
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// API endpoint method colors
const API_METHOD_COLORS: Record<string, string> = {
  GET: "bg-blue-100 text-blue-800 border-blue-200",
  POST: "bg-green-100 text-green-800 border-green-200",
  PUT: "bg-yellow-100 text-yellow-800 border-yellow-200",
  PATCH: "bg-orange-100 text-orange-800 border-orange-200",
  DELETE: "bg-red-100 text-red-800 border-red-200"
};

// API categories for filtering
const API_CATEGORIES = [
  { id: "all", name: "All APIs" },
  { id: "students", name: "Students" },
  { id: "applications", name: "Applications" },
  { id: "universities", name: "Universities" },
  { id: "programs", name: "Programs" },
  { id: "agents", name: "Agents" },
  { id: "payments", name: "Payments" },
  { id: "communication", name: "Communication" },
  { id: "documents", name: "Documents" },
  { id: "webhooks", name: "Webhooks" },
];

// Mock API endpoints data
const API_ENDPOINTS = [
  {
    id: 1,
    name: "List Students",
    endpoint: "/api/v1/students",
    method: "GET",
    category: "students",
    description: "Retrieves a list of all students with pagination and filtering options.",
    params: [
      { name: "page", type: "number", required: false, description: "Page number for pagination." },
      { name: "limit", type: "number", required: false, description: "Number of records per page." },
      { name: "status", type: "string", required: false, description: "Filter by student status." }
    ],
    responses: [
      { status: 200, description: "List of students returned successfully." },
      { status: 400, description: "Invalid parameters provided." },
      { status: 401, description: "Authentication required." }
    ],
    example: `// Request
GET /api/v1/students?page=1&limit=10&status=active

// Response (200 OK)
{
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@example.com",
      "status": "active",
      "createdAt": "2023-01-15T10:30:00Z"
    },
    // More student records...
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 145,
    "pages": 15
  }
}`
  },
  {
    id: 2,
    name: "Get Student",
    endpoint: "/api/v1/students/{id}",
    method: "GET",
    category: "students",
    description: "Retrieves detailed information about a specific student by ID.",
    params: [
      { name: "id", type: "number", required: true, description: "Student ID." }
    ],
    responses: [
      { status: 200, description: "Student details returned successfully." },
      { status: 404, description: "Student not found." },
      { status: 401, description: "Authentication required." }
    ],
    example: `// Request
GET /api/v1/students/123

// Response (200 OK)
{
  "id": 123,
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "1995-05-15",
  "nationality": "Canadian",
  "address": {
    "street": "123 Main St",
    "city": "Toronto",
    "state": "Ontario",
    "postalCode": "M5V 2N4",
    "country": "Canada"
  },
  "status": "active",
  "createdAt": "2022-10-20T14:30:00Z",
  "updatedAt": "2023-02-12T09:45:00Z"
}`
  },
  {
    id: 3,
    name: "Create Student",
    endpoint: "/api/v1/students",
    method: "POST",
    category: "students",
    description: "Creates a new student record with the provided information.",
    params: [
      { name: "firstName", type: "string", required: true, description: "Student's first name." },
      { name: "lastName", type: "string", required: true, description: "Student's last name." },
      { name: "email", type: "string", required: true, description: "Student's email address." },
      { name: "dateOfBirth", type: "string", required: true, description: "Student's date of birth in YYYY-MM-DD format." },
      { name: "nationality", type: "string", required: true, description: "Student's nationality." }
    ],
    responses: [
      { status: 201, description: "Student created successfully." },
      { status: 400, description: "Invalid data provided." },
      { status: 401, description: "Authentication required." },
      { status: 409, description: "Email already in use." }
    ],
    example: `// Request
POST /api/v1/students
{
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice.johnson@example.com",
  "dateOfBirth": "1998-08-25",
  "nationality": "American",
  "phone": "+1987654321",
  "address": {
    "street": "456 Oak Ave",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  }
}

// Response (201 Created)
{
  "id": 456,
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice.johnson@example.com",
  "status": "active",
  "createdAt": "2023-05-02T15:20:00Z"
}`
  },
  {
    id: 4,
    name: "List Applications",
    endpoint: "/api/v1/applications",
    method: "GET",
    category: "applications",
    description: "Retrieves a list of applications with pagination and filtering options.",
    params: [
      { name: "page", type: "number", required: false, description: "Page number for pagination." },
      { name: "limit", type: "number", required: false, description: "Number of records per page." },
      { name: "status", type: "string", required: false, description: "Filter by application status." },
      { name: "studentId", type: "number", required: false, description: "Filter by student ID." }
    ],
    responses: [
      { status: 200, description: "List of applications returned successfully." },
      { status: 400, description: "Invalid parameters provided." },
      { status: 401, description: "Authentication required." }
    ],
    example: `// Request
GET /api/v1/applications?page=1&limit=10&status=pending

// Response (200 OK)
{
  "data": [
    {
      "id": 789,
      "studentId": 123,
      "universityId": 45,
      "programId": 67,
      "status": "pending",
      "submittedAt": "2023-04-10T09:30:00Z"
    },
    // More application records...
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 87,
    "pages": 9
  }
}`
  },
  {
    id: 5,
    name: "Submit Application",
    endpoint: "/api/v1/applications",
    method: "POST",
    category: "applications",
    description: "Creates a new application for a student to a specific university program.",
    params: [
      { name: "studentId", type: "number", required: true, description: "Student ID." },
      { name: "universityId", type: "number", required: true, description: "University ID." },
      { name: "programId", type: "number", required: true, description: "Program ID." },
      { name: "startDate", type: "string", required: true, description: "Desired program start date." }
    ],
    responses: [
      { status: 201, description: "Application submitted successfully." },
      { status: 400, description: "Invalid data provided." },
      { status: 401, description: "Authentication required." },
      { status: 404, description: "Student, university, or program not found." },
      { status: 409, description: "Duplicate application exists." }
    ],
    example: `// Request
POST /api/v1/applications
{
  "studentId": 123,
  "universityId": 45,
  "programId": 67,
  "startDate": "2023-09-01",
  "notes": "Priority application for scholarship consideration"
}

// Response (201 Created)
{
  "id": 789,
  "studentId": 123,
  "universityId": 45,
  "programId": 67,
  "status": "pending",
  "submittedAt": "2023-05-02T16:40:00Z"
}`
  }
];

// Code example language options
const CODE_LANGUAGES = [
  { id: "curl", name: "cURL" },
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "php", name: "PHP" },
  { id: "java", name: "Java" },
];

// Function to copy code to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

// Documentation category card component
const DocCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => (
  <Card className="overflow-hidden">
    <CardHeader className="p-4 pb-0">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-primary/10 rounded-md">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <p className="text-sm text-muted-foreground">{description}</p>
      <Button variant="link" className="p-0 h-auto mt-2 text-sm">
        View Documentation <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

export default function ApiDocumentation() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [codeLanguage, setCodeLanguage] = useState<string>("curl");

  // Filter endpoints based on category and search query
  const filteredEndpoints = API_ENDPOINTS.filter((endpoint) => {
    const matchesCategory = activeCategory === "all" || endpoint.category === activeCategory;
    const matchesSearch = 
      endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search endpoints..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {API_CATEGORIES.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-gray-50 border rounded-md p-4 mb-4">
              <h2 className="text-lg font-medium mb-2">Getting Started</h2>
              <p className="mb-4">
                Welcome to the InterEd API documentation. Our REST API enables you to programmatically access and manage student records, applications, universities, and more.
              </p>
              
              <h3 className="text-md font-medium mt-4 mb-2">Base URL</h3>
              <div className="bg-gray-100 p-3 rounded-md font-mono text-sm mb-4 flex justify-between items-center">
                <code>https://api.intered.com/v1</code>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard("https://api.intered.com/v1")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <h3 className="text-md font-medium mt-4 mb-2">Authentication</h3>
              <p className="mb-2">
                All API requests require authentication using API keys. Include your API key in the
                request header:
              </p>
              <div className="bg-gray-100 p-3 rounded-md font-mono text-sm mb-4 flex justify-between items-center">
                <code>Authorization: Bearer YOUR_API_KEY</code>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard("Authorization: Bearer YOUR_API_KEY")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  <Download className="mr-2 h-4 w-4" />
                  Download OpenAPI Spec
                </Button>
                <Button>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Full Documentation
                </Button>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold">API Endpoints</h2>
            <Accordion type="single" collapsible className="w-full">
              {filteredEndpoints.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No endpoints found matching your criteria.
                </div>
              ) : (
                filteredEndpoints.map((endpoint) => (
                  <AccordionItem key={endpoint.id} value={`endpoint-${endpoint.id}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center space-x-2 text-left">
                        <Badge className={API_METHOD_COLORS[endpoint.method]}>
                          {endpoint.method}
                        </Badge>
                        <div>
                          <div className="font-medium">{endpoint.name}</div>
                          <div className="text-sm font-mono text-muted-foreground mt-0.5">
                            {endpoint.endpoint}
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-6 space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {endpoint.description}
                        </p>
                        
                        {endpoint.params.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Parameters</h4>
                            <div className="border rounded-md">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-2 text-xs font-medium text-left">Name</th>
                                    <th className="px-4 py-2 text-xs font-medium text-left">Type</th>
                                    <th className="px-4 py-2 text-xs font-medium text-left">Required</th>
                                    <th className="px-4 py-2 text-xs font-medium text-left">Description</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {endpoint.params.map((param, index) => (
                                    <tr key={index}>
                                      <td className="px-4 py-2 text-xs font-mono">{param.name}</td>
                                      <td className="px-4 py-2 text-xs">{param.type}</td>
                                      <td className="px-4 py-2 text-xs">
                                        {param.required ? 
                                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Yes</Badge> : 
                                          <Badge variant="outline" className="bg-gray-50">No</Badge>
                                        }
                                      </td>
                                      <td className="px-4 py-2 text-xs">{param.description}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Response Codes</h4>
                          <div className="border rounded-md">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-2 text-xs font-medium text-left">Status</th>
                                  <th className="px-4 py-2 text-xs font-medium text-left">Description</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {endpoint.responses.map((response, index) => (
                                  <tr key={index}>
                                    <td className="px-4 py-2 text-xs font-mono">
                                      <Badge variant="outline" className={
                                        response.status >= 200 && response.status < 300 ? "bg-green-50 text-green-700 border-green-200" :
                                        response.status >= 400 && response.status < 500 ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                        "bg-red-50 text-red-700 border-red-200"
                                      }>
                                        {response.status}
                                      </Badge>
                                    </td>
                                    <td className="px-4 py-2 text-xs">{response.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium">Example</h4>
                            <div className="flex items-center">
                              <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                                <SelectTrigger className="h-7 text-xs w-[120px]">
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                  {CODE_LANGUAGES.map((language) => (
                                    <SelectItem key={language.id} value={language.id}>
                                      {language.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(endpoint.example)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="bg-[#1e1e1e] text-white p-4 rounded-md overflow-x-auto">
                            <pre className="text-xs font-mono whitespace-pre">{endpoint.example}</pre>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DocCard 
          title="SDKs & Libraries"
          description="Official client libraries for various programming languages"
          icon={<Code className="h-5 w-5 text-primary" />}
        />
        <DocCard 
          title="Webhooks Guide"
          description="Learn how to receive real-time updates via webhooks"
          icon={<Terminal className="h-5 w-5 text-primary" />}
        />
        <DocCard 
          title="Data Models"
          description="Explore the database schema and entity relationships"
          icon={<Database className="h-5 w-5 text-primary" />}
        />
      </div>
    </div>
  );
}