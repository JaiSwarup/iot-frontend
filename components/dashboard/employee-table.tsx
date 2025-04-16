"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Employee = {
  // id: number;
  name: string;
  backlog: number;
  overtime: number;
  credits: number;
  idle: number;
};

export default function EmployeeTable() {
  const [employees, setEmployees] = React.useState<Record<string, Employee>>(
    {}
  );
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`);
      //   console.log(res);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      console.log(data);
      setEmployees(data);
    };
    fetchEmployees();
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Backlog</TableHead>
          <TableHead>Overtime Hours</TableHead>
          {/* <TableHead></TableHead> */}
          <TableHead className="text-right">Learn More</TableHead>
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
                <TableHead>{employee.name}</TableHead>
                <TableHead>{employee.backlog}</TableHead>
                <TableHead>{employee.overtime}</TableHead>
                {/* <TableHead></TableHead> */}
                <TableHead className="text-right">Learn More</TableHead>
              </TableRow>
            )
          )
        )}
      </TableHeader>
      <TableBody></TableBody>
    </Table>
  );
}
