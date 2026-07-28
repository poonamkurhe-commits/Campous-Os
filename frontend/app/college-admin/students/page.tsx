"use client";

import { useQuery } from "@tanstack/react-query";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";

interface Student {
  id: string;
  name: string;
  email: string;
  roll_no: string;
  department: string;
  year: number;
}

export default function StudentsPage() {
  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: () => api.get<Student[]>("/api/v1/users/students"),
  });

  return (
    <AuthGuard allowedRoles={["college_admin"]}>
      <DashboardShell title="Students">
        <Card>
          <CardHeader>
            <CardTitle>All Students ({students?.length ?? 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : students && students.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4">Roll No</th>
                      <th className="pb-3 pr-4">Name</th>
                      <th className="pb-3 pr-4">Department</th>
                      <th className="pb-3">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.id} className="border-b">
                        <td className="py-3 pr-4 font-mono">{s.roll_no}</td>
                        <td className="py-3 pr-4">{s.name}</td>
                        <td className="py-3 pr-4">{s.department}</td>
                        <td className="py-3">{s.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="py-8 text-center text-muted-foreground">No students registered yet.</p>
            )}
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthGuard>
  );
}
