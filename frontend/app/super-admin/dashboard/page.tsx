"use client";

import { useQuery } from "@tanstack/react-query";
import { Building2, GraduationCap, Users } from "lucide-react";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api, College } from "@/lib/api";

export default function SuperAdminDashboard() {
  const { data: colleges, isLoading } = useQuery({
    queryKey: ["colleges"],
    queryFn: () => api.get<College[]>("/api/v1/colleges"),
  });

  return (
    <AuthGuard allowedRoles={["super_admin"]}>
      <DashboardShell title="Platform Overview">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard icon={Building2} label="Total Colleges" value={colleges?.length ?? 0} loading={isLoading} />
          <StatCard icon={Users} label="Active Plans" value="—" loading={isLoading} />
          <StatCard icon={GraduationCap} label="Platform Status" value="Healthy" loading={false} />
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Colleges</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : colleges && colleges.length > 0 ? (
              <div className="divide-y">
                {colleges.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.subdomain}.campusos.com</p>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No colleges onboarded yet. Create your first college.</p>
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
  value: string | number;
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
