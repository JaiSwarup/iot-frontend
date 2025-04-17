"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "sonner";

type Employee = {
  // id: number;
  name: string;
  backlog: number;
  overtime: number;
  credits: number;
  idle: number;
};

type EmployeeStatus = {
  status: string;
};

export default function EmployeeTable() {
  const [employees, setEmployees] = React.useState<Record<string, Employee>>(
    {}
  );
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const wsRef = React.useRef<WebSocket | null>(null);
  const [employeeData, setEmployeeData] = useState<
    Record<string, EmployeeStatus>
  >({});
  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket(`wss://iot-backend-05i2.onrender.com/ws`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connection opened");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (!data || typeof data !== "object") {
            console.error("Invalid data received:", data);
            return;
          }
          console.log("Received data:", data);

          setEmployeeData((prevData) => {
            if (!prevData || Object.keys(prevData).length === 0) {
              Object.entries(data as Record<string, EmployeeStatus>).forEach(
                ([key, employee]) => {
                  toast.success(
                    `Employee ${key} added with status ${employee.status}`
                  );
                }
              );
              return data;
            }

            const updatedData = { ...prevData };

            Object.entries(data as Record<string, EmployeeStatus>).forEach(
              ([key, employee]) => {
                if (updatedData[key]) {
                  if (updatedData[key].status !== employee.status) {
                    toast.success(
                      `Employee ${key}'s status updated to ${employee.status}`
                    );
                    updatedData[key].status = employee.status;
                  }
                } else {
                  toast.success(
                    `Employee ${key} added with status ${employee.status}`
                  );
                  updatedData[key] = employee;
                }
              }
            );

            return updatedData;
          });
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onclose = () => {
        console.log(
          "WebSocket connection closed. Reconnecting in 5 seconds..."
        );
        setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
      };

      ws.onerror = (error) => {
        if (error instanceof Error) {
          console.error("WebSocket error:", error.message);
          toast.error("WebSocket connection error. Please try again later.");
        }
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        console.log("WebSocket connection closed from cleanup");
      }
    };
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Backlog</TableHead>
          <TableHead>Overtime Hours</TableHead>
          <TableHead>Idle Hours</TableHead>
          <TableHead>Status</TableHead>
          {/* <TableHead></TableHead> */}
          <TableHead className="text-right">Details</TableHead>
        </TableRow>
        {!employees ? (
          <TableRow>
            <TableHead colSpan={4} className="text-center">
              No employees found
            </TableHead>
          </TableRow>
        ) : (
          Object.entries(employees).map(
            ([key, employee]: [string, Employee]) => (
              <TableRow key={key}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.backlog}</TableCell>
                <TableCell>{employee.overtime}</TableCell>
                <TableCell>{employee.idle}</TableCell>
                <TableCell>
                  {employeeData[employee.name] &&
                  employeeData[employee.name].status ? (
                    <span
                      className={`${
                        employeeData[employee.name].status === "IN"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {employeeData[employee.name].status}
                    </span>
                  ) : (
                    <span className="text-gray-500">Unknown</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="link"
                    className="text-sm text-blue-500"
                    asChild
                  >
                    <Link href={`/dashboard/employees/${key}`}>Learn More</Link>
                  </Button>
                </TableCell>
              </TableRow>
            )
          )
        )}
      </TableHeader>
      <TableBody></TableBody>
    </Table>
  );
}
