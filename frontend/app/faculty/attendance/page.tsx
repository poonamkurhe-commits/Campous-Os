"use client";

import { AuthGuard } from "@/components/shared/AuthGuard";
import { DashboardShell } from "@/components/shared/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FacultyAttendancePage() {
  return (
    <AuthGuard allowedRoles={["faculty"]}>
      <DashboardShell title="Attendance Sessions">
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">QR attendance session management — Phase 2</p>
          </CardContent>
        </Card>
      </DashboardShell>
    </AuthGuard>
  );
}
