import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleProgress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Entry = {
  timestamp: string;
  value: number;
};

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const { profile, entries, prediction } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>{profile.name}</CardTitle>
            <CardDescription className="flex flex-col">
              <CircleProgress value={prediction * 100} />
              <span>Prediction (%)</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Backlog</TableCell>
                  <TableCell>{profile.backlog}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Overtime</TableCell>
                  <TableCell>{profile.overtime}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Credits</TableCell>
                  <TableCell>{profile.credits}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Idle</TableCell>
                  <TableCell>{profile.idle}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry: Entry, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(entry.timestamp).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(entry.timestamp).toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>{entry.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
