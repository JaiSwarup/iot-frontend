"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import EmployeeTable from "@/components/dashboard/employee-table";

interface User {
  email: string;
  role: string;
  name: string;
}

export default function EmployeePage() {
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
  if (user.role !== "boss") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">
            {user.role === "boss"
              ? "Generate and view reports for your team and projects"
              : "View your personal reports and performance metrics"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <EmployeeTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
