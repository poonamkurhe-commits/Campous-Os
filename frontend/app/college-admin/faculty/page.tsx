"use client";

import { useQuery } from "@tanstack/react-query";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";

interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
}

export default function FacultyPage() {
  const { data: faculty, isLoading } = useQuery({
    queryKey: ["faculty"],
    queryFn: () => api.get<Faculty[]>("/api/v1/users/faculty"),
  });

  return (
    <AuthGuard allowedRoles={["college_admin"]}>
      <DashboardShell title="Faculty">
        <Card>
          <CardHeader>
            <CardTitle>All Faculty ({faculty?.length ?? 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : faculty && faculty.length > 0 ? (
              <div className="space-y-3">
                {faculty.map((f) => (
                  <div key={f.id} className="flex items-center justify-between rounded-xl border p-4">
                    <div>
                      <p className="font-medium">{f.name}</p>
                      <p className="text-sm text-muted-foreground">{f.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{f.department}</p>
                      <p className="text-xs text-muted-foreground">{f.subjects.join(", ")}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-muted-foreground">No faculty registered yet.</p>
            )}
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthGuard>
  );
}
