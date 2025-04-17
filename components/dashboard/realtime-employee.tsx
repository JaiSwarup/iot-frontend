"use client";
import { Activity } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type Employee = {
  //   name: string;
  status: string;
};

export default function RealtimeEmployee() {
  const wsRef = React.useRef<WebSocket | null>(null);
  const [employeeData, setEmployeeData] = useState<Record<string, Employee>>(
    {}
  );
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
              Object.entries(data as Record<string, Employee>).forEach(
                ([key, employee]) => {
                  toast.success(
                    `Employee ${key} added with status ${employee.status}`
                  );
                }
              );
              return data;
            }

            const updatedData = { ...prevData };

            Object.entries(data as Record<string, Employee>).forEach(
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {
            Object.entries(employeeData).filter(
              ([, employee]) => employee.status === "IN"
            ).length
          }
        </div>
        <p className="text-xs text-muted-foreground">
          {(Object.entries(employeeData).filter(
            ([, employee]) => employee.status === "IN"
          ).length /
            Object.entries(employeeData).length) *
            100}
          % of total employees
        </p>
      </CardContent>
    </Card>
  );
}
