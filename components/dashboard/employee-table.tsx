"use client";
import React, { useEffect } from "react";
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
          <TableHead>Idle Hours</TableHead>
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
                {/* <TableCell></TableCell> */}
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
