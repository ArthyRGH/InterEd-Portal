import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Download, 
  Filter, 
  BarChart2, 
  PieChart, 
  TrendingUp, 
  FileText,
  Users,
  UserCheck,
  BookOpen,
  GraduationCap,
  CreditCard
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function StudentReports() {
  const [activeTab, setActiveTab] = useState("enrollment");
  const [timeFilter, setTimeFilter] = useState("last_30_days");
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Student Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and insights on student data
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
              <SelectItem value="last_90_days">Last 90 Days</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
              <SelectItem value="all_time">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Students" 
          value="5,832" 
          changeValue="+12.3%" 
          changeType="positive" 
          icon={<Users className="h-6 w-6 text-blue-500" />} 
        />
        <MetricCard 
          title="Active Enrollments" 
          value="3,651" 
          changeValue="+8.7%" 
          changeType="positive" 
          icon={<UserCheck className="h-6 w-6 text-green-500" />} 
        />
        <MetricCard 
          title="Applications" 
          value="7,243" 
          changeValue="+15.2%" 
          changeType="positive" 
          icon={<BookOpen className="h-6 w-6 text-purple-500" />} 
        />
        <MetricCard 
          title="Graduation Rate" 
          value="94.8%" 
          changeValue="+2.1%" 
          changeType="positive" 
          icon={<GraduationCap className="h-6 w-6 text-amber-500" />} 
        />
      </div>
      
      {/* Report Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background border-b w-full justify-start rounded-none gap-0 px-0">
          <TabsTrigger
            value="enrollment"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Enrollment Trends
          </TabsTrigger>
          <TabsTrigger
            value="demographics"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Demographics
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Academic Performance
          </TabsTrigger>
          <TabsTrigger
            value="applications"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Application Analytics
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Financial Metrics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrollment" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Enrollment Trends by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <BarChart2 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Chart visualization would appear here</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Enrollment by Stage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-52 flex items-center justify-center bg-muted/20">
                    <PieChart className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted">Chart visualization</span>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <StageItem label="Inquiry" value={32} color="bg-blue-500" />
                    <StageItem label="Application" value={28} color="bg-green-500" />
                    <StageItem label="Offer" value={22} color="bg-amber-500" />
                    <StageItem label="Enrolled" value={18} color="bg-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Program Enrollment Breakdown</CardTitle>
                <div className="flex gap-2">
                  <Input className="w-[260px]" placeholder="Search programs..." />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Program Name</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Total Enrolled</TableHead>
                    <TableHead className="text-right">Year-over-Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Master of Business Administration</TableCell>
                    <TableCell>University of Chicago</TableCell>
                    <TableCell>427</TableCell>
                    <TableCell className="text-right text-green-600">+14.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bachelor of Computer Science</TableCell>
                    <TableCell>Stanford University</TableCell>
                    <TableCell>312</TableCell>
                    <TableCell className="text-right text-green-600">+23.8%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Masters in Data Science</TableCell>
                    <TableCell>MIT</TableCell>
                    <TableCell>298</TableCell>
                    <TableCell className="text-right text-green-600">+18.7%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bachelor of Engineering</TableCell>
                    <TableCell>University of Toronto</TableCell>
                    <TableCell>276</TableCell>
                    <TableCell className="text-right text-green-600">+7.9%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bachelor of Medicine</TableCell>
                    <TableCell>Harvard University</TableCell>
                    <TableCell>253</TableCell>
                    <TableCell className="text-right text-amber-600">+3.2%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Students by Country</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <BarChart2 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Geographic distribution chart</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <BarChart2 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Age histogram chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Demographic Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Gender Distribution</h4>
                  <div className="space-y-2">
                    <ProgressItem label="Male" value={58} color="bg-blue-500" />
                    <ProgressItem label="Female" value={41} color="bg-pink-500" />
                    <ProgressItem label="Non-binary" value={1} color="bg-purple-500" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Education Background</h4>
                  <div className="space-y-2">
                    <ProgressItem label="High School" value={32} color="bg-amber-500" />
                    <ProgressItem label="Bachelor's" value={45} color="bg-green-500" />
                    <ProgressItem label="Master's" value={20} color="bg-blue-500" />
                    <ProgressItem label="Doctorate" value={3} color="bg-purple-500" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Financial Aid Status</h4>
                  <div className="space-y-2">
                    <ProgressItem label="Scholarship" value={28} color="bg-emerald-500" />
                    <ProgressItem label="Student Loan" value={42} color="bg-blue-500" />
                    <ProgressItem label="Self-funded" value={30} color="bg-gray-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Academic Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <TrendingUp className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Performance trend chart</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">GPA Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-52 flex items-center justify-center bg-muted/20">
                    <BarChart2 className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted">GPA distribution chart</span>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <StageItem label="3.5 - 4.0" value={42} color="bg-green-500" />
                    <StageItem label="3.0 - 3.49" value={36} color="bg-blue-500" />
                    <StageItem label="2.5 - 2.99" value={15} color="bg-amber-500" />
                    <StageItem label="< 2.5" value={7} color="bg-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Top Performing Programs</CardTitle>
                <Button variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Program</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Average GPA</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Computer Science</TableCell>
                    <TableCell>Stanford University</TableCell>
                    <TableCell>3.78</TableCell>
                    <TableCell>92%</TableCell>
                    <TableCell className="text-right text-green-600">↑ 3.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Business Analytics</TableCell>
                    <TableCell>MIT</TableCell>
                    <TableCell>3.65</TableCell>
                    <TableCell>89%</TableCell>
                    <TableCell className="text-right text-green-600">↑ 2.8%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mechanical Engineering</TableCell>
                    <TableCell>UC Berkeley</TableCell>
                    <TableCell>3.52</TableCell>
                    <TableCell>87%</TableCell>
                    <TableCell className="text-right text-green-600">↑ 1.5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Economics</TableCell>
                    <TableCell>Harvard University</TableCell>
                    <TableCell>3.47</TableCell>
                    <TableCell>85%</TableCell>
                    <TableCell className="text-right text-amber-600">↑ 0.7%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Psychology</TableCell>
                    <TableCell>University of Toronto</TableCell>
                    <TableCell>3.41</TableCell>
                    <TableCell>83%</TableCell>
                    <TableCell className="text-right text-red-600">↓ 1.2%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Application Volume by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <BarChart2 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Application volume chart</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-52 flex items-center justify-center bg-muted/20">
                    <PieChart className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted">Status distribution chart</span>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <StageItem label="Submitted" value={38} color="bg-blue-500" />
                    <StageItem label="Under Review" value={24} color="bg-amber-500" />
                    <StageItem label="Accepted" value={32} color="bg-green-500" />
                    <StageItem label="Rejected" value={6} color="bg-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Conversion Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">By Source Channel</h4>
                  <div className="space-y-2">
                    <ProgressItem label="Agent Referral" value={42} color="bg-blue-500" />
                    <ProgressItem label="Website" value={28} color="bg-purple-500" />
                    <ProgressItem label="Events" value={18} color="bg-green-500" />
                    <ProgressItem label="Social Media" value={12} color="bg-pink-500" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">By Program Type</h4>
                  <div className="space-y-2">
                    <ProgressItem label="Undergraduate" value={45} color="bg-amber-500" />
                    <ProgressItem label="Graduate" value={38} color="bg-blue-500" />
                    <ProgressItem label="Diploma" value={12} color="bg-green-500" />
                    <ProgressItem label="Certificate" value={5} color="bg-purple-500" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">By University Tier</h4>
                  <div className="space-y-2">
                    <ProgressItem label="Tier 1" value={32} color="bg-blue-500" />
                    <ProgressItem label="Tier 2" value={48} color="bg-green-500" />
                    <ProgressItem label="Tier 3" value={20} color="bg-amber-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Revenue by Program</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <BarChart2 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Revenue by program chart</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Average Cost per Student</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <TrendingUp className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Cost per student trend chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Financial Metrics by Program</CardTitle>
                <Button variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Program</TableHead>
                    <TableHead>Avg. Tuition</TableHead>
                    <TableHead>Scholarship %</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Acquisition Cost</TableHead>
                    <TableHead className="text-right">ROI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">MBA</TableCell>
                    <TableCell>$45,000</TableCell>
                    <TableCell>22%</TableCell>
                    <TableCell>$3.2M</TableCell>
                    <TableCell>$2,850</TableCell>
                    <TableCell className="text-right text-green-600">3.7x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Computer Science</TableCell>
                    <TableCell>$38,500</TableCell>
                    <TableCell>18%</TableCell>
                    <TableCell>$2.8M</TableCell>
                    <TableCell>$2,100</TableCell>
                    <TableCell className="text-right text-green-600">4.2x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Engineering</TableCell>
                    <TableCell>$42,000</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>$2.4M</TableCell>
                    <TableCell>$2,450</TableCell>
                    <TableCell className="text-right text-green-600">3.9x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Medicine</TableCell>
                    <TableCell>$58,000</TableCell>
                    <TableCell>12%</TableCell>
                    <TableCell>$4.1M</TableCell>
                    <TableCell>$3,200</TableCell>
                    <TableCell className="text-right text-green-600">4.8x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Law</TableCell>
                    <TableCell>$52,000</TableCell>
                    <TableCell>14%</TableCell>
                    <TableCell>$3.7M</TableCell>
                    <TableCell>$2,900</TableCell>
                    <TableCell className="text-right text-green-600">4.1x</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between items-center border-t pt-4">
        <Button variant="outline" className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>Save Report</span>
        </Button>
        
        <Button variant="outline" className="flex items-center gap-1">
          <CreditCard className="h-4 w-4" />
          <span>Schedule Report</span>
        </Button>
      </div>
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: string;
  changeValue: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
};

function MetricCard({ title, value, changeValue, changeType, icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className={`text-sm mt-1 ${
              changeType === 'positive' ? 'text-green-600' : 
              changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {changeValue} from last period
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type ProgressItemProps = {
  label: string;
  value: number;
  color: string;
};

function ProgressItem({ label, value, color }: ProgressItemProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

function StageItem({ label, value, color }: ProgressItemProps) {
  return (
    <div className="flex items-center">
      <div className={`h-3 w-3 rounded-full ${color} mr-2`}></div>
      <div className="flex justify-between w-full">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
    </div>
  );
}