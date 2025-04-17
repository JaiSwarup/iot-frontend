"use client";

import { useEffect, useState } from "react";
import { Download, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  email: string;

  name: string;
}

export default function ReportsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [reportType, setReportType] = useState("performance");
  const [timeFrame, setTimeFrame] = useState("month");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and view reports for your team and projects
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="w-full md:w-64">
          <CardHeader>
            <CardTitle>Report Filters</CardTitle>
            <CardDescription>Customize your report view</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="projects">Projects</SelectItem>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Frame</label>
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>
              {reportType === "performance" && "Performance Report"}
              {reportType === "projects" && "Projects Report"}
              {reportType === "team" && "Team Report"}
              {reportType === "financial" && "Financial Report"}
            </CardTitle>
            <CardDescription>
              {timeFrame === "week" && "Data for current week"}
              {timeFrame === "month" && "Data for current month"}
              {timeFrame === "quarter" && "Data for current quarter"}
              {timeFrame === "year" && "Data for current year"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reportType === "performance" && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Productivity</TableCell>
                    <TableCell>87%</TableCell>
                    <TableCell className="text-green-600">+5%</TableCell>
                    <TableCell>Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Task Completion
                    </TableCell>
                    <TableCell>92%</TableCell>
                    <TableCell className="text-green-600">+3%</TableCell>
                    <TableCell>Excellent</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Quality Score</TableCell>
                    <TableCell>4.2/5</TableCell>
                    <TableCell className="text-amber-600">-0.1</TableCell>
                    <TableCell>Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Timeliness</TableCell>
                    <TableCell>95%</TableCell>
                    <TableCell className="text-green-600">+7%</TableCell>
                    <TableCell>Excellent</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}

            {reportType === "projects" && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Website Redesign
                    </TableCell>
                    <TableCell>In Progress</TableCell>
                    <TableCell>75%</TableCell>
                    <TableCell>Jun 30, 2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Mobile App Development
                    </TableCell>
                    <TableCell>In Progress</TableCell>
                    <TableCell>45%</TableCell>
                    <TableCell>Aug 15, 2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      API Integration
                    </TableCell>
                    <TableCell>In Progress</TableCell>
                    <TableCell>90%</TableCell>
                    <TableCell>May 20, 2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Database Migration
                    </TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell>100%</TableCell>
                    <TableCell>Apr 10, 2025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}

            {reportType === "team" && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Headcount</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Development</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>92%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Design</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>88%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Marketing</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>85%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sales</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>90%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}

            {reportType === "financial" && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Project Revenue
                    </TableCell>
                    <TableCell>$125,000</TableCell>
                    <TableCell className="text-green-600">+12%</TableCell>
                    <TableCell>Good</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Operational Costs
                    </TableCell>
                    <TableCell>$78,500</TableCell>
                    <TableCell className="text-amber-600">+5%</TableCell>
                    <TableCell>Attention</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Team Budget</TableCell>
                    <TableCell>$45,000</TableCell>
                    <TableCell className="text-green-600">+0%</TableCell>
                    <TableCell>Stable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Net Profit</TableCell>
                    <TableCell>$46,500</TableCell>
                    <TableCell className="text-green-600">+18%</TableCell>
                    <TableCell>Excellent</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
