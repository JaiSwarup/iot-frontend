"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Home, LogOut, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

interface User {
  email: string;
  name: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/sign-in");
      return;
    }

    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
        <Sidebar>
          <SidebarHeader className="flex flex-row h-auto items-center border-b px-3">
            <span className="font-bold text-3xl">WorkFlow</span>
            <span className="ml-2 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              Manager
            </span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link
                    legacyBehavior
                    href="/dashboard"
                    className="flex gap-2 items-center py-3 px-2 flex-col"
                  >
                    <Home className="h-8 w-8 shrink-0" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/analytics"}
                >
                  <Link
                    legacyBehavior
                    href="/dashboard/analytics"
                    className="flex gap-2 items-center py-3 px-2 flex-col"
                  >
                    <BarChart3 className="h-6 w-6 shrink-0" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/reports"}
                >
                  <Link
                  legacyBehavior
                    href="/dashboard/reports"
                    className="flex gap-2 items-center py-3 px-2 flex-col"
                  >
                    <PieChart className="h-6 w-6 shrink-0" />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/employees"}
                >
                  <Link
                    legacyBehavior
                    href="/dashboard/employees"
                    className="flex gap-2 items-center py-3 px-2 flex-col"
                  >
                    <Users className="h-6 w-6 shrink-0" />
                    <span>Employees</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <div className="p-2">
              <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 truncate">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-2 w-full justify-start"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Toaster richColors />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
