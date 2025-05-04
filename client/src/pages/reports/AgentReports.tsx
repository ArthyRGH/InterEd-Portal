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
  MapPin,
  Users, 
  TrendingUp, 
  FileText,
  Percent,
  DollarSign,
  Award,
  Star,
  Calendar
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function AgentReports() {
  const [activeTab, setActiveTab] = useState("performance");
  const [timeFilter, setTimeFilter] = useState("last_30_days");
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agent Reports</h1>
          <p className="text-muted-foreground">
            Performance metrics and analytics for recruitment agents
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
          title="Total Agents" 
          value="253" 
          changeValue="+15" 
          changeType="positive" 
          icon={<Users className="h-6 w-6 text-blue-500" />} 
        />
        <MetricCard 
          title="Active Agents" 
          value="187" 
          changeValue="+8" 
          changeType="positive" 
          icon={<Star className="h-6 w-6 text-green-500" />} 
        />
        <MetricCard 
          title="Total Commission" 
          value="$687,412" 
          changeValue="+12.4%" 
          changeType="positive" 
          icon={<DollarSign className="h-6 w-6 text-amber-500" />} 
        />
        <MetricCard 
          title="Conversion Rate" 
          value="34.8%" 
          changeValue="+2.3%" 
          changeType="positive" 
          icon={<Percent className="h-6 w-6 text-purple-500" />} 
        />
      </div>
      
      {/* Report Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background border-b w-full justify-start rounded-none gap-0 px-0">
          <TabsTrigger
            value="performance"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Performance Metrics
          </TabsTrigger>
          <TabsTrigger
            value="geographic"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Geographic Distribution
          </TabsTrigger>
          <TabsTrigger
            value="recruitment"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Recruitment Analysis
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none py-2 px-4 font-medium text-muted-foreground data-[state=active]:text-primary"
          >
            Financial Summary
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Agent Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <BarChart2 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Performance trend chart</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Conversion Rate by Agent Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-52 flex items-center justify-center bg-muted/20">
                    <PieChart className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted">Conversion rate chart</span>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <StageItem label="Platinum Agents" value={42} color="bg-blue-500" />
                    <StageItem label="Gold Agents" value={35} color="bg-amber-500" />
                    <StageItem label="Silver Agents" value={18} color="bg-slate-500" />
                    <StageItem label="Bronze Agents" value={5} color="bg-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Top Performing Agents</CardTitle>
                <div className="flex gap-2">
                  <Input className="w-[260px]" placeholder="Search agents..." />
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
                    <TableHead className="w-[250px]">Agent Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Students Recruited</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Revenue Generated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Global Education Partners</TableCell>
                    <TableCell>South Asia</TableCell>
                    <TableCell>187</TableCell>
                    <TableCell>48.3%</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">$142,850</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Study Abroad Experts</TableCell>
                    <TableCell>East Asia</TableCell>
                    <TableCell>152</TableCell>
                    <TableCell>42.7%</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">$128,500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Future Scholars Agency</TableCell>
                    <TableCell>Middle East</TableCell>
                    <TableCell>143</TableCell>
                    <TableCell>39.2%</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">$119,750</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ivy League Consultants</TableCell>
                    <TableCell>North America</TableCell>
                    <TableCell>128</TableCell>
                    <TableCell>37.8%</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">$108,200</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Global Pathways</TableCell>
                    <TableCell>Europe</TableCell>
                    <TableCell>112</TableCell>
                    <TableCell>35.1%</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <Star className="h-4 w-4 text-amber-500" />
                        <Star className="h-4 w-4 text-amber-500" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">$94,850</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="geographic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Agents by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <MapPin className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Geographic distribution map</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Performance by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <BarChart2 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Regional performance chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Agent Distribution and Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Agents by Region</h4>
                  <div className="space-y-2">
                    <ProgressItem label="South Asia" value={32} color="bg-blue-500" />
                    <ProgressItem label="East Asia" value={24} color="bg-green-500" />
                    <ProgressItem label="Middle East" value={18} color="bg-amber-500" />
                    <ProgressItem label="Europe" value={14} color="bg-purple-500" />
                    <ProgressItem label="North America" value={8} color="bg-red-500" />
                    <ProgressItem label="Africa" value={4} color="bg-orange-500" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Top Performing Countries</h4>
                  <div className="space-y-2">
                    <ProgressItem label="India" value={28} color="bg-blue-500" />
                    <ProgressItem label="China" value={22} color="bg-red-500" />
                    <ProgressItem label="UAE" value={15} color="bg-green-500" />
                    <ProgressItem label="Vietnam" value={12} color="bg-amber-500" />
                    <ProgressItem label="Nigeria" value={10} color="bg-purple-500" />
                    <ProgressItem label="Others" value={13} color="bg-gray-500" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Growth Markets</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Region</TableHead>
                        <TableHead className="text-right">Growth</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Africa</TableCell>
                        <TableCell className="text-right text-green-600">+48%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>South America</TableCell>
                        <TableCell className="text-right text-green-600">+32%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Southeast Asia</TableCell>
                        <TableCell className="text-right text-green-600">+28%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Eastern Europe</TableCell>
                        <TableCell className="text-right text-green-600">+18%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recruitment" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Recruitment by Program</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <BarChart2 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Program recruitment chart</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="h-52 flex items-center justify-center bg-muted/20">
                    <TrendingUp className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted">Conversion funnel chart</span>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <StageItem label="Leads" value={100} color="bg-blue-500" />
                    <StageItem label="Applications" value={68} color="bg-green-500" />
                    <StageItem label="Offers" value={42} color="bg-amber-500" />
                    <StageItem label="Enrollments" value={35} color="bg-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Agent Recruitment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Top Programs by Recruitment</h4>
                  <div className="space-y-2">
                    <ProgressItem label="MBA" value={28} color="bg-blue-500" />
                    <ProgressItem label="Computer Science" value={22} color="bg-green-500" />
                    <ProgressItem label="Engineering" value={18} color="bg-amber-500" />
                    <ProgressItem label="Business Analytics" value={12} color="bg-purple-500" />
                    <ProgressItem label="Medicine" value={10} color="bg-red-500" />
                    <ProgressItem label="Others" value={10} color="bg-gray-500" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Student Demographics</h4>
                  <div className="space-y-2">
                    <ProgressItem label="Undergraduate" value={45} color="bg-blue-500" />
                    <ProgressItem label="Graduate" value={38} color="bg-green-500" />
                    <ProgressItem label="Diploma" value={12} color="bg-amber-500" />
                    <ProgressItem label="Certificate" value={5} color="bg-purple-500" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Agent Performance Tiers</h4>
                  <div className="space-y-2">
                    <ProgressItem label="Platinum" value={8} color="bg-blue-500" />
                    <ProgressItem label="Gold" value={22} color="bg-amber-500" />
                    <ProgressItem label="Silver" value={42} color="bg-slate-500" />
                    <ProgressItem label="Bronze" value={28} color="bg-orange-500" />
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
                <CardTitle className="text-lg font-medium">Commission Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <TrendingUp className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Commission trend chart</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Revenue Generated by Agent Tier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted/20">
                  <PieChart className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted">Revenue distribution chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Financial Performance by Agent</CardTitle>
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
                    <TableHead className="w-[250px]">Agent</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Commission Rate</TableHead>
                    <TableHead>Revenue Generated</TableHead>
                    <TableHead>Commission Earned</TableHead>
                    <TableHead className="text-right">ROI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Global Education Partners</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500">Platinum</Badge>
                    </TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>$952,300</TableCell>
                    <TableCell>$142,845</TableCell>
                    <TableCell className="text-right text-green-600">4.2x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Study Abroad Experts</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">Gold</Badge>
                    </TableCell>
                    <TableCell>12%</TableCell>
                    <TableCell>$856,700</TableCell>
                    <TableCell>$102,804</TableCell>
                    <TableCell className="text-right text-green-600">3.8x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Future Scholars Agency</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">Gold</Badge>
                    </TableCell>
                    <TableCell>12%</TableCell>
                    <TableCell>$798,250</TableCell>
                    <TableCell>$95,790</TableCell>
                    <TableCell className="text-right text-green-600">3.7x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ivy League Consultants</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">Gold</Badge>
                    </TableCell>
                    <TableCell>12%</TableCell>
                    <TableCell>$724,800</TableCell>
                    <TableCell>$86,976</TableCell>
                    <TableCell className="text-right text-green-600">3.5x</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Global Pathways</TableCell>
                    <TableCell>
                      <Badge className="bg-slate-500">Silver</Badge>
                    </TableCell>
                    <TableCell>10%</TableCell>
                    <TableCell>$652,400</TableCell>
                    <TableCell>$65,240</TableCell>
                    <TableCell className="text-right text-green-600">3.2x</TableCell>
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
          <Calendar className="h-4 w-4" />
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