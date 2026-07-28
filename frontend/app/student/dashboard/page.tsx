"use client";

import { useQuery } from "@tanstack/react-query";
import { Bell, Calendar, QrCode } from "lucide-react";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api, Notification } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { useAuthStore } from "@/lib/store/auth";

export default function StudentDashboard() {
  const user = useAuthStore((s) => s.user);
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => api.get<Notification[]>("/api/v1/notifications"),
  });

  return (
    <AuthGuard allowedRoles={["student"]}>
      <DashboardShell title={`Welcome, ${user?.name?.split(" ")[0] || "Student"}`}>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">—</p>
              <p className="text-xs text-muted-foreground">Phase 2 feature</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Assignments Due</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
              <p className="text-xs text-muted-foreground">No pending assignments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Notices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{notifications?.filter((n) => !n.is_read).length ?? 0}</p>
              <p className="text-xs text-muted-foreground">Unread</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Today&apos;s Timetable
              </CardTitle>
              <CardDescription>Coming in Phase 2</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your schedule will appear here once timetables are configured.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" /> Notices
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-16 w-full" />
              ) : notifications && notifications.length > 0 ? (
                <div className="space-y-2">
                  {notifications.slice(0, 3).map((n) => (
                    <div key={n.id} className="rounded-lg border p-3">
                      <p className="font-medium text-sm">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(n.created_at)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No notices yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </AuthGuard>
  );
}
