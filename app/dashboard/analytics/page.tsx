"use client";

import { useEffect, useState } from "react";
import { BarChart, LineChart, PieChart } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  email: string;

  name: string;
}

export default function AnalyticsPage() {
  const [user, setUser] = useState<User | null>(null);

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed analytics about your team and projects
        </p>
      </div>

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Productivity Score
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <div className="mt-4 h-[120px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Productivity Chart
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Task Completion
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <div className="mt-4 h-[120px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Task Completion Chart
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Time Allocation
                </CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38 hrs/week</div>
                <div className="mt-4 h-[120px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Time Allocation Chart
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>
                Your performance metrics over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Performance Trend Line Chart
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Completion Rate</CardTitle>
              <CardDescription>Completion rate by project type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Project Completion Bar Chart
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Distribution</CardTitle>
                <CardDescription>By department and priority</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Project Distribution Pie Chart
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Time to Completion</CardTitle>
                <CardDescription>
                  Average days to complete by project type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Time to Completion Bar Chart
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Comparative performance across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Team Performance Radar Chart
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Efficiency</CardTitle>
                <CardDescription>
                  Efficiency metrics by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Department Efficiency Bar Chart
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Employee Turnover</CardTitle>
                <CardDescription>Turnover rate by quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                  Employee Turnover Line Chart
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
