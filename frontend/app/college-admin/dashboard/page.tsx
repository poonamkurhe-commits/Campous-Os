"use client";

import { useQuery } from "@tanstack/react-query";
import { Bell, BookOpen, Users } from "lucide-react";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api, DashboardStats, Notification } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export default function CollegeAdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.get<DashboardStats>("/api/v1/users/dashboard/stats"),
  });

  const { data: notifications, isLoading: notifLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => api.get<Notification[]>("/api/v1/notifications"),
  });

  return (
    <AuthGuard allowedRoles={["college_admin"]}>
      <DashboardShell title="College Dashboard">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard icon={Users} label="Students" value={stats?.total_students ?? 0} loading={statsLoading} />
          <StatCard icon={BookOpen} label="Faculty" value={stats?.total_faculty ?? 0} loading={statsLoading} />
          <StatCard icon={Bell} label="Unread Notices" value={stats?.unread_notifications ?? 0} loading={statsLoading} />
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {notifLoading ? (
              <Skeleton className="h-20 w-full" />
            ) : notifications && notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.slice(0, 5).map((n) => (
                  <div key={n.id} className="rounded-xl border p-4">
                    <div className="flex items-start justify-between">
                      <p className="font-medium">{n.title}</p>
                      {!n.is_read && <span className="h-2 w-2 rounded-full bg-tenant" />}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{formatDate(n.created_at)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No notifications yet.</p>
            )}
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthGuard>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  loading,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  loading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? <Skeleton className="h-8 w-16" /> : <p className="text-3xl font-bold">{value}</p>}
      </CardContent>
    </Card>
  );
}
