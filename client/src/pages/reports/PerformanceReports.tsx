import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
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
  LineChart, 
  PieChart, 
  TrendingUp, 
  FileText,
  CreditCard,
  User,
  Users,
  Calendar,
  Clock,
  Award,
  Target,
  Briefcase
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function PerformanceReports() {
  const [activeTab, setActiveTab] = useState("staff");
  const [timeFilter, setTimeFilter] = useState("last_30_days");
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Performance Reports</h1>
          <p className="text-muted-foreground">
            Staff, team, and organizational performance metrics
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
          title="Staff Productivity" 
          value="87.5%" 
          changeValue="+3.2%" 
          changeType="positive" 
          icon={<User className="h-6 w-6 text-blue-500" />} 
        />
        <MetricCard 
          title="Team Performance" 
          value="92.3%" 
          changeValue="+4.8%" 
          changeType="positive" 
          icon={<Users className="h-6 w-6 text-green-500" />} 
        />
        <MetricCard 
          title="Revenue per Staff" 
          value="$42,850" 
          changeValue="+7.5%" 
          changeType="positive" 
          icon={<CreditCard className="h-6 w-6 text-purple-500" />} 
        />
        <MetricCard 
          title="Goal Completion" 
          value="78.4%" 
          changeValue="+5.1%" 
          changeType="positive" 
          icon={<Target className="h-6 w-6 text-amber-500" />} 
        />
      </div>
      
      {/* Report Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background border-b w-full justify-start rounded-none gap-0 px-0">
          <TabsTrigger
            value="staff"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Staff Performance
          </TabsTrigger>
          <TabsTrigger
            value="teams"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Team Analytics
          </TabsTrigger>
          <TabsTrigger
            value="kpi"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            KPI Tracking
          </TabsTrigger>
          <TabsTrigger
            value="goals"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Goals & OKRs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="staff" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Staff Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <LineChart className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Performance trend chart</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-52 flex items-center justify-center bg-muted/20">
                    <PieChart className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted">Performance distribution chart</span>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <StageItem label="Exceptional" value={15} color="bg-green-500" />
                    <StageItem label="Above Average" value={32} color="bg-blue-500" />
                    <StageItem label="Average" value={42} color="bg-amber-500" />
                    <StageItem label="Below Average" value={11} color="bg-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Top Performing Staff</CardTitle>
                <div className="flex gap-2">
                  <Input className="w-[260px]" placeholder="Search staff..." />
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
                    <TableHead className="w-[300px]">Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Cases Handled</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead className="text-right">Performance Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>RS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>Rahul Sharma</div>
                          <div className="text-sm text-muted-foreground">rahul.s@intered.com</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Recruitment</TableCell>
                    <TableCell>182</TableCell>
                    <TableCell>58.4%</TableCell>
                    <TableCell>2h 14m</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-500">94.2</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>AM</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>Anjali Mehta</div>
                          <div className="text-sm text-muted-foreground">anjali.m@intered.com</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Admissions</TableCell>
                    <TableCell>156</TableCell>
                    <TableCell>52.8%</TableCell>
                    <TableCell>2h 42m</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-green-500">91.7</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>VP</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>Vikram Patel</div>
                          <div className="text-sm text-muted-foreground">vikram.p@intered.com</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Agent Relations</TableCell>
                    <TableCell>143</TableCell>
                    <TableCell>49.6%</TableCell>
                    <TableCell>3h 05m</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-blue-500">89.5</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>SG</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>Sanjay Gupta</div>
                          <div className="text-sm text-muted-foreground">sanjay.g@intered.com</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>University Relations</TableCell>
                    <TableCell>128</TableCell>
                    <TableCell>45.2%</TableCell>
                    <TableCell>3h 18m</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-blue-500">86.3</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>ND</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>Neha Desai</div>
                          <div className="text-sm text-muted-foreground">neha.d@intered.com</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Student Support</TableCell>
                    <TableCell>112</TableCell>
                    <TableCell>41.8%</TableCell>
                    <TableCell>3h 42m</TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-blue-500">83.7</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Team Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <BarChart2 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Team comparison chart</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Team Productivity Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <LineChart className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Productivity trend chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Team Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Team</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Cases Handled</TableHead>
                      <TableHead>Avg. Response Time</TableHead>
                      <TableHead>Resolution Rate</TableHead>
                      <TableHead className="text-right">Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Recruitment Team</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>1,243</TableCell>
                      <TableCell>2h 38m</TableCell>
                      <TableCell>92.7%</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <span className="font-medium text-green-600 mr-2">94.2</span>
                          <Progress value={94.2} className="h-2 w-16" />
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Admissions Team</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>986</TableCell>
                      <TableCell>3h 12m</TableCell>
                      <TableCell>88.5%</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <span className="font-medium text-green-600 mr-2">91.7</span>
                          <Progress value={91.7} className="h-2 w-16" />
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Agent Relations Team</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>752</TableCell>
                      <TableCell>3h 28m</TableCell>
                      <TableCell>85.2%</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <span className="font-medium text-blue-600 mr-2">87.3</span>
                          <Progress value={87.3} className="h-2 w-16" />
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">University Relations Team</TableCell>
                      <TableCell>7</TableCell>
                      <TableCell>684</TableCell>
                      <TableCell>3h 45m</TableCell>
                      <TableCell>82.1%</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <span className="font-medium text-blue-600 mr-2">84.5</span>
                          <Progress value={84.5} className="h-2 w-16" />
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Student Support Team</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>1,108</TableCell>
                      <TableCell>2h 52m</TableCell>
                      <TableCell>90.3%</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <span className="font-medium text-green-600 mr-2">89.8</span>
                          <Progress value={89.8} className="h-2 w-16" />
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">Top Performing Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Recruitment Team</div>
                      <div className="flex items-center mt-2 text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+4.2% from last period</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">Most Improved Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Student Support Team</div>
                      <div className="flex items-center mt-2 text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+7.8% from last period</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">Needs Improvement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">University Relations Team</div>
                      <div className="flex items-center mt-2 text-amber-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+1.2% from last period</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="kpi" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">KPI Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <LineChart className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">KPI trend chart</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">KPI Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Student Enrollment Growth</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Target: 15% YoY</span>
                    <span>Current: 11.7%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Agent Performance Score</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Target: 85%</span>
                    <span>Current: 78.2%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Application Conversion Rate</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Target: 40%</span>
                    <span>Current: 34%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Student Satisfaction</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Target: 90%</span>
                    <span>Current: 85.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Key Performance Indicators</CardTitle>
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
                    <TableHead className="w-[300px]">KPI</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Student Enrollment Growth</TableCell>
                    <TableCell>Recruitment</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>11.7%</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">In Progress</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <span className="mr-2">78%</span>
                        <Progress value={78} className="h-2 w-16" />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Agent Performance Score</TableCell>
                    <TableCell>Partnerships</TableCell>
                    <TableCell>85%</TableCell>
                    <TableCell>78.2%</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">In Progress</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <span className="mr-2">92%</span>
                        <Progress value={92} className="h-2 w-16" />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Application Conversion Rate</TableCell>
                    <TableCell>Processing</TableCell>
                    <TableCell>40%</TableCell>
                    <TableCell>34%</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">In Progress</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <span className="mr-2">85%</span>
                        <Progress value={85} className="h-2 w-16" />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Student Satisfaction</TableCell>
                    <TableCell>Support</TableCell>
                    <TableCell>90%</TableCell>
                    <TableCell>85.5%</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">On Track</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <span className="mr-2">95%</span>
                        <Progress value={95} className="h-2 w-16" />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Revenue Growth</TableCell>
                    <TableCell>Financial</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell>17.3%</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">In Progress</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <span className="mr-2">86%</span>
                        <Progress value={86} className="h-2 w-16" />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Goal Completion Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <PieChart className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Goal completion chart</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">OKR Progress by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <BarChart2 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">OKR progress chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Quarterly Goals & OKRs</CardTitle>
              <CardDescription>Q2 2025 (April - June)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Student Recruitment</h4>
                  <div className="space-y-3">
                    <GoalItem 
                      title="Increase application conversion rate by 8%" 
                      progress={65} 
                      status="In Progress" 
                      owner="Rahul Sharma" 
                    />
                    <GoalItem 
                      title="Expand into 3 new international markets" 
                      progress={40} 
                      status="In Progress" 
                      owner="Anjali Mehta" 
                    />
                    <GoalItem 
                      title="Reduce application processing time by 20%" 
                      progress={85} 
                      status="On Track" 
                      owner="Vikram Patel" 
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Agent Network</h4>
                  <div className="space-y-3">
                    <GoalItem 
                      title="Onboard 25 new platinum tier agents" 
                      progress={72} 
                      status="On Track" 
                      owner="Priya Singh" 
                    />
                    <GoalItem 
                      title="Increase agent-led enrollments by 15%" 
                      progress={58} 
                      status="In Progress" 
                      owner="Arun Kumar" 
                    />
                    <GoalItem 
                      title="Implement new agent training program" 
                      progress={92} 
                      status="On Track" 
                      owner="Deepa Verma" 
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">University Partnerships</h4>
                  <div className="space-y-3">
                    <GoalItem 
                      title="Add 5 new Tier 1 university partnerships" 
                      progress={60} 
                      status="In Progress" 
                      owner="Sanjay Gupta" 
                    />
                    <GoalItem 
                      title="Increase program diversity by 25%" 
                      progress={45} 
                      status="Needs Attention" 
                      owner="Neha Desai" 
                    />
                    <GoalItem 
                      title="Negotiate improved commission terms with top 10 partners" 
                      progress={78} 
                      status="On Track" 
                      owner="Rajiv Kapoor" 
                    />
                  </div>
                </div>
              </div>
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
          <Briefcase className="h-4 w-4" />
          <span>Performance Dashboard</span>
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

type GoalItemProps = {
  title: string;
  progress: number;
  status: 'Completed' | 'On Track' | 'In Progress' | 'Needs Attention' | 'At Risk';
  owner: string;
};

function GoalItem({ title, progress, status, owner }: GoalItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'On Track':
        return 'bg-blue-500';
      case 'In Progress':
        return 'bg-amber-500';
      case 'Needs Attention':
        return 'bg-orange-500';
      case 'At Risk':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="p-4 border rounded-md">
      <div className="flex justify-between mb-2">
        <h5 className="font-medium">{title}</h5>
        <Badge className={getStatusColor(status)}>{status}</Badge>
      </div>
      <div className="mb-3">
        <div className="flex justify-between mb-1 text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      <div className="text-sm text-muted-foreground flex items-center">
        <User className="h-3 w-3 mr-1" />
        <span>Owner: {owner}</span>
      </div>
    </div>
  );
}